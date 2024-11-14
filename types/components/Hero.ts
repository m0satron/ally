export interface HeroProps {
  title: string;
  description: string;
  media?: string;
  dense?: boolean;
  categories?: string[];
  primary_action?: {
    label: string;
    url: string;
  };
  secondary_action?: {
    label: string;
    url: string;
  };
}
