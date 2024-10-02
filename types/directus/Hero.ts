import type { Locale } from '../Locale'
import type { DirectusMediaFile } from './Media';


export interface DirectusHeroTextContent {
  id: string;
  languages_code: Locale;
  ally_hero_name: string;
  title?: string;
  description?: string;
}

export interface DirectusHero {
  name: string;
  image: DirectusMediaFile;
  translations: DirectusHeroTextContent;
}