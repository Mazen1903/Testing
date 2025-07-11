export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  occasion: string;
  reference: string;
  repetitions?: number;
}

export interface ZikrSeries {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  duas: Dua[];
}

export interface ZikrCategory {
  id: string;
  name: string;
  icon: string;
} 