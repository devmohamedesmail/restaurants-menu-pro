export interface Settings {
  id: number;

  title_en: string;
  title_ar: string;

  description_en: string;
  description_ar: string;

  keywords_en?: string;
  keywords_ar?: string;

  logo?: string;
  favicon?: string;

  currency?: string;
  language?: 'en' | 'ar';

  created_at?: string;
  updated_at?: string;
}
