import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatINR(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

export function formatTonnes(n: number) {
  return `${n.toFixed(1)} t`
}
