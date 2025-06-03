export interface KnowledgeCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  itemCount: number;
  lastUpdated: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  tags: string[];
  featured: boolean;
}

export interface KnowledgeItem {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  content: any;
  tags: string[];
  difficulty: number;
  rating: number;
  views: number;
  lastUpdated: string;
  author: string;
  featured: boolean;
}

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  rating?: number;
}