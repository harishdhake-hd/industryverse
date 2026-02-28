import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelative(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return formatDate(date);
}

export const DOMAIN_COLORS: Record<string, string> = {
  technology: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  business: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  finance: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
  'corporate-skills': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-400/10',
  Intermediate: 'text-yellow-400 bg-yellow-400/10',
  Advanced: 'text-red-400 bg-red-400/10',
};
