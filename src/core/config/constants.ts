export const CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
} as const;

export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;