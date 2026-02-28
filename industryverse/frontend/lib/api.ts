const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('industryverse_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth
  auth = {
    register: (data: { email: string; name: string; password: string }) =>
      this.request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      this.request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    me: () => this.request('/auth/me'),
    updateProfile: (data: any) =>
      this.request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
  };

  // Domains
  domains = {
    list: () => this.request('/domains'),
    get: (slug: string) => this.request(`/domains/${slug}`),
  };

  // Roles
  roles = {
    list: (params?: { domain?: string; search?: string }) => {
      const query = params ? `?${new URLSearchParams(params as any)}` : '';
      return this.request(`/roles${query}`);
    },
    get: (slug: string) => this.request(`/roles/${slug}`),
  };

  // Projects
  projects = {
    list: () => this.request('/projects'),
    get: (id: string) => this.request(`/projects/${id}`),
    updateProgress: (id: string, progress: number) =>
      this.request(`/projects/${id}/progress`, { method: 'PUT', body: JSON.stringify({ progress }) }),
    submit: (id: string, notes?: string) =>
      this.request(`/projects/${id}/submit`, { method: 'POST', body: JSON.stringify({ notes }) }),
  };

  // Dashboard
  dashboard = {
    get: () => this.request('/users/dashboard'),
  };

  // Admin
  admin = {
    analytics: () => this.request('/admin/analytics'),
    users: () => this.request('/admin/users'),
    submissions: () => this.request('/admin/submissions'),
    reviewSubmission: (id: string, data: { status: string; feedback?: string }) =>
      this.request(`/admin/submissions/${id}/review`, { method: 'PUT', body: JSON.stringify(data) }),
  };

  // Assistant (streaming)
  assistant = {
    chat: async (
      message: string,
      context: string | undefined,
      sessionId: string | undefined,
      onChunk: (chunk: string) => void,
      onDone: (sessionId: string) => void
    ) => {
      const token = this.getToken();
      const response = await fetch(`${this.baseUrl}/assistant/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ message, context, sessionId }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.startsWith('data: '));
        for (const line of lines) {
          try {
            const data = JSON.parse(line.replace('data: ', ''));
            if (data.type === 'chunk') onChunk(data.content);
            if (data.type === 'done') onDone(data.sessionId);
          } catch {}
        }
      }
    },
    history: () => this.request('/assistant/history'),
  };
}

export const api = new ApiClient(API_URL);
