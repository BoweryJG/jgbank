import { KnowledgeCategory } from '../types';

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'artifact-hunting',
    title: 'Artifact Hunting',
    description: 'Discover hidden archaeological treasures and Native American artifacts across the Northeast',
    icon: 'Terrain',
    color: '#2e7d32',
    gradient: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    itemCount: 5,
    lastUpdated: '2025-06-03',
    difficulty: 'Intermediate',
    tags: ['archaeology', 'history', 'outdoors', 'research'],
    featured: true
  },
  {
    id: 'investment-research',
    title: 'Investment Research',
    description: 'Deep market analysis, financial trends, and investment opportunities',
    icon: 'TrendingUp',
    color: '#1976d2',
    gradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    itemCount: 12,
    lastUpdated: '2025-06-02',
    difficulty: 'Advanced',
    tags: ['finance', 'markets', 'analysis', 'strategy'],
    featured: true
  },
  {
    id: 'technology-insights',
    title: 'Technology Insights',
    description: 'Cutting-edge tech research, AI developments, and emerging platforms',
    icon: 'Computer',
    color: '#7b1fa2',
    gradient: 'linear-gradient(135deg, #7b1fa2 0%, #ab47bc 100%)',
    itemCount: 18,
    lastUpdated: '2025-06-01',
    difficulty: 'Expert',
    tags: ['ai', 'blockchain', 'development', 'innovation'],
    featured: true
  },
  {
    id: 'travel-exploration',
    title: 'Travel & Exploration',
    description: 'Hidden gems, cultural discoveries, and unique travel experiences worldwide',
    icon: 'Explore',
    color: '#f57c00',
    gradient: 'linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)',
    itemCount: 8,
    lastUpdated: '2025-05-30',
    difficulty: 'Beginner',
    tags: ['travel', 'culture', 'adventure', 'photography'],
    featured: false
  },
  {
    id: 'health-biohacking',
    title: 'Health & Biohacking',
    description: 'Optimization strategies, nutrition research, and wellness protocols',
    icon: 'FitnessCenter',
    color: '#c62828',
    gradient: 'linear-gradient(135deg, #c62828 0%, #ef5350 100%)',
    itemCount: 15,
    lastUpdated: '2025-05-28',
    difficulty: 'Intermediate',
    tags: ['health', 'nutrition', 'fitness', 'optimization'],
    featured: true
  },
  {
    id: 'creative-projects',
    title: 'Creative Projects',
    description: 'Art, design, writing, and creative endeavors with detailed documentation',
    icon: 'Palette',
    color: '#5e35b1',
    gradient: 'linear-gradient(135deg, #5e35b1 0%, #9575cd 100%)',
    itemCount: 6,
    lastUpdated: '2025-05-25',
    difficulty: 'Beginner',
    tags: ['art', 'design', 'creativity', 'inspiration'],
    featured: false
  },
  {
    id: 'business-insights',
    title: 'Business Intelligence',
    description: 'Market research, competitive analysis, and strategic business insights',
    icon: 'Business',
    color: '#00695c',
    gradient: 'linear-gradient(135deg, #00695c 0%, #26a69a 100%)',
    itemCount: 10,
    lastUpdated: '2025-05-22',
    difficulty: 'Advanced',
    tags: ['business', 'strategy', 'analysis', 'growth'],
    featured: true
  },
  {
    id: 'learning-research',
    title: 'Learning & Research',
    description: 'Educational resources, research methodologies, and knowledge frameworks',
    icon: 'School',
    color: '#6a1b9a',
    gradient: 'linear-gradient(135deg, #6a1b9a 0%, #ba68c8 100%)',
    itemCount: 14,
    lastUpdated: '2025-05-20',
    difficulty: 'Intermediate',
    tags: ['education', 'research', 'methodology', 'knowledge'],
    featured: false
  }
];