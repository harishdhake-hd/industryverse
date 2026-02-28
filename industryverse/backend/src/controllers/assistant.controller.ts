import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/error.middleware';

const prisma = new PrismaClient();

export const chat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, context, sessionId } = req.body;
    const userId = (req as any).userId;

    if (!message) throw new AppError('Message is required', 400);

    // Build context-aware system prompt
    const systemPrompt = buildSystemPrompt(context);

    // Get or build conversation history
    let log = sessionId
      ? await prisma.assistantLog.findFirst({ where: { id: sessionId, userId } })
      : null;

    const messages = log ? (log.messages as any[]) : [];
    messages.push({ role: 'user', content: message, timestamp: new Date() });

    // Set up SSE for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Call LLM API (OpenAI/Anthropic compatible)
    const llmResponse = await callLLM(systemPrompt, messages, res);

    messages.push({ role: 'assistant', content: llmResponse, timestamp: new Date() });

    // Save conversation
    if (log) {
      await prisma.assistantLog.update({
        where: { id: log.id },
        data: { messages, updatedAt: new Date() },
      });
    } else {
      log = await prisma.assistantLog.create({
        data: { userId, context, messages },
      });
    }

    res.write(`data: ${JSON.stringify({ type: 'done', sessionId: log.id })}\n\n`);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    const logs = await prisma.assistantLog.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: 20,
      select: { id: true, context: true, updatedAt: true, messages: true },
    });
    res.json({ success: true, logs });
  } catch (err) {
    next(err);
  }
};

export const clearSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const userId = (req as any).userId;
    await prisma.assistantLog.deleteMany({ where: { id: sessionId, userId } });
    res.json({ success: true, message: 'Session cleared' });
  } catch (err) {
    next(err);
  }
};

function buildSystemPrompt(context?: string): string {
  const base = `You are IndustryVerse AI, a professional corporate learning assistant. 
You help students understand industries, professional roles, and complete real-world corporate simulation projects.
Be precise, professional, and educational. Use concrete examples from real industry practice.
Format responses with clear structure when explaining complex topics.`;

  if (context) {
    return `${base}\n\nCurrent context: The user is learning about ${context}. 
Tailor your responses specifically to this domain and role.`;
  }
  return base;
}

async function callLLM(systemPrompt: string, messages: any[], res: Response): Promise<string> {
  // This is where you integrate with OpenAI, Anthropic, or any LLM
  // Example: OpenAI streaming
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Fallback mock for development
    const mockResponse = `This is a simulated AI response. Configure your LLM API key to enable real responses. 
    
Your question has been received and in production this would connect to OpenAI GPT-4 or Anthropic Claude to provide expert industry guidance.`;
    
    // Simulate streaming
    const words = mockResponse.split(' ');
    for (const word of words) {
      res.write(`data: ${JSON.stringify({ type: 'chunk', content: word + ' ' })}\n\n`);
      await new Promise(r => setTimeout(r, 30));
    }
    return mockResponse;
  }

  // Real OpenAI streaming implementation
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  let fullContent = '';
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

    for (const line of lines) {
      const data = line.replace('data: ', '');
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices[0]?.delta?.content || '';
        if (content) {
          fullContent += content;
          res.write(`data: ${JSON.stringify({ type: 'chunk', content })}\n\n`);
        }
      } catch {}
    }
  }

  return fullContent;
}
