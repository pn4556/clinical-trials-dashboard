import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num)
}

export function formatPercentage(num: number): string {
  return num.toFixed(1) + '%'
}

export function getSignalColor(signal: 'bull' | 'bear' | 'neutral'): string {
  switch (signal) {
    case 'bull':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    case 'bear':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'neutral':
      return 'text-slate-600 bg-slate-50 border-slate-200'
  }
}

export function getPhaseColor(phase: string): string {
  switch (phase.toLowerCase()) {
    case 'phase 1':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'phase 2':
      return 'bg-indigo-100 text-indigo-700 border-indigo-200'
    case 'phase 3':
      return 'bg-violet-100 text-violet-700 border-violet-200'
    case 'phase 4':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 'approved':
      return 'bg-green-100 text-green-700 border-green-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}
