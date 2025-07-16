export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  occasion: string;
  reference: string;
  fullReference?: string;
  repetitions?: number;
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string;
}

export interface ZikrSeries {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  subCategory?: string;
  duas: Dua[];
}

export interface ZikrCategory {
  id: string;
  name: string;
  icon: string;
  subCategories?: SubCategory[];
} 