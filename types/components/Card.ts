import type { Locale } from '../Locale'
export interface CardProps {
  title?: string
  description?: string
  categories?: string[]
  url?: string
  color?: 'primary' | 'secondary'
  image?: string
  locale?: Locale
  slug?: string
}

export interface GlassCardProps {
  title?: string
  description?: string
  categories?: string[]
  url?: string
}


export interface RequirementCardProps {
  locale: Locale
  minHrs: number;
  maxHrs: number;
  cost: string;
  effort: string;
  involvement: string;
}