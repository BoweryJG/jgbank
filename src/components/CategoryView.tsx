import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Chip,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Fab,
  useTheme,
  alpha,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ArrowBack,
  Home,
  Search,
  ViewList,
  ViewModule,
  Sort,
  FilterList,
  Add,
  Star,
  TrendingUp,
  Computer,
  Terrain,
  Explore,
  FitnessCenter,
  Palette,
  Business,
  School,
} from '@mui/icons-material';
import { knowledgeCategories } from '../data/categories';
import ArtifactHunting from './ArtifactHunting';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Computer,
  Terrain,
  Explore,
  FitnessCenter,
  Palette,
  Business,
  School,
};

interface CategoryViewProps {
  categoryId: string;
  onBack: () => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ categoryId, onBack }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const category = knowledgeCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4">Category not found</Typography>
        <IconButton onClick={onBack} sx={{ mt: 2 }}>
          <ArrowBack />
        </IconButton>
      </Box>
    );
  }

  const IconComponent = iconMap[category.icon];

  const renderCategoryContent = () => {
    switch (categoryId) {
      case 'artifact-hunting':
        return <ArtifactHunting />;
      case 'investment-research':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Investment Research</Typography>
            <Typography variant="body1" color="text.secondary">
              Coming soon - Deep market analysis, financial trends, and investment opportunities
            </Typography>
          </Box>
        );
      case 'technology-insights':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Technology Insights</Typography>
            <Typography variant="body1" color="text.secondary">
              Coming soon - Cutting-edge tech research, AI developments, and emerging platforms
            </Typography>
          </Box>
        );
      case 'travel-exploration':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Travel & Exploration</Typography>
            <Typography variant="body1" color="text.secondary">
              Coming soon - Hidden gems, cultural discoveries, and unique travel experiences
            </Typography>
          </Box>
        );
      case 'health-biohacking':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Health & Biohacking</Typography>
            <Typography variant="body1" color="text.secondary">
              Coming soon - Optimization strategies, nutrition research, and wellness protocols
            </Typography>
          </Box>
        );
      case 'creative-projects':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Creative Projects</Typography>
            <Typography variant="body1" color="text.secondary">
              Coming soon - Art, design, writing, and creative endeavors with detailed documentation
            </Typography>
          </Box>
        );
      case 'business-insights':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Business Intelligence</Typography>
            <Typography variant="body1" color="text.secondary">
              Coming soon - Market research, competitive analysis, and strategic business insights
            </Typography>
          </Box>
        );
      case 'learning-research':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Learning & Research</Typography>
            <Typography variant="body1" color="text.secondary">
              Coming soon - Educational resources, research methodologies, and knowledge frameworks
            </Typography>
          </Box>
        );
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4">Content in development</Typography>
            <Typography variant="body1" color="text.secondary">
              This category is being actively developed with curated content.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          background: category.gradient,
          color: 'white',
          p: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={onBack} sx={{ color: 'white', mr: 2 }}>
              <ArrowBack />
            </IconButton>
            
            <Breadcrumbs
              sx={{
                '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.7)' },
              }}
            >
              <Link
                color="inherit"
                onClick={onBack}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  cursor: 'pointer',
                  opacity: 0.8,
                  '&:hover': { opacity: 1 },
                }}
                underline="hover"
              >
                <Home fontSize="small" />
                Dashboard
              </Link>
              <Typography color="inherit" fontWeight={600}>
                {category.title}
              </Typography>
            </Breadcrumbs>
          </Box>

          {/* Category Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 80,
                height: 80,
                mr: 3,
              }}
            >
              <IconComponent sx={{ fontSize: 40 }} />
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" fontWeight={800} gutterBottom>
                {category.title}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2, lineHeight: 1.4 }}>
                {category.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {category.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h4" fontWeight={700}>
                {category.itemCount}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Items
              </Typography>
              <Chip
                label={category.difficulty}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontWeight: 600,
                  mt: 1,
                }}
              />
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Content Area */}
      <Box sx={{ p: 0 }}>
        {/* Toolbar */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: 4,
            py: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
              <Tab label="Overview" />
              <Tab label="Content" />
              <Tab label="Analytics" />
            </Tabs>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 250 }}
              />
              
              <IconButton 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
              >
                {viewMode === 'grid' ? <ViewModule /> : <ViewList />}
              </IconButton>
              
              <IconButton>
                <Sort />
              </IconButton>
              
              <IconButton>
                <FilterList />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {renderCategoryContent()}
        </motion.div>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: category.gradient,
          '&:hover': {
            opacity: 0.9,
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default CategoryView;