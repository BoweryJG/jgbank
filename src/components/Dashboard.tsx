import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  LinearProgress,
  Fade,
  Zoom,
  Fab,
  useTheme,
  alpha,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp,
  Computer,
  Terrain,
  Explore,
  FitnessCenter,
  Palette,
  Business,
  School,
  Star,
  Visibility,
  Add as AddIcon,
  FilterList,
} from '@mui/icons-material';
import { knowledgeCategories } from '../data/categories';
import { KnowledgeCategory } from '../types';

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

interface DashboardProps {
  onCategorySelect: (categoryId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onCategorySelect }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredCategories = knowledgeCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredCategories = filteredCategories.filter(cat => cat.featured);
  const otherCategories = filteredCategories.filter(cat => !cat.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      case 'Expert': return '#9c27b0';
      default: return '#757575';
    }
  };

  const CategoryCard: React.FC<{ category: KnowledgeCategory; index: number }> = ({ category, index }) => {
    const IconComponent = iconMap[category.icon];
    
    return (
      <Box key={category.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ y: -8, scale: 1.02 }}
          onHoverStart={() => setHoveredCard(category.id)}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              borderRadius: 3,
              background: hoveredCard === category.id 
                ? category.gradient 
                : `linear-gradient(135deg, ${alpha(category.color, 0.1)} 0%, ${alpha(category.color, 0.05)} 100%)`,
              border: `2px solid ${alpha(category.color, 0.2)}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: `0 20px 40px ${alpha(category.color, 0.3)}`,
                border: `2px solid ${category.color}`,
              },
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={() => onCategorySelect(category.id)}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(category.color, 0.1)} 0%, transparent 70%)`,
              }}
            />
            
            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: category.color,
                    width: 56,
                    height: 56,
                    mr: 2,
                    boxShadow: `0 8px 16px ${alpha(category.color, 0.3)}`,
                  }}
                >
                  <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight={700}
                    sx={{ 
                      color: hoveredCard === category.id ? 'white' : 'text.primary',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Chip
                    label={category.difficulty}
                    size="small"
                    sx={{
                      bgcolor: getDifficultyColor(category.difficulty),
                      color: 'white',
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  />
                </Box>
              </Box>

              <Typography 
                variant="body1" 
                color={hoveredCard === category.id ? 'rgba(255,255,255,0.9)' : 'text.secondary'}
                sx={{ 
                  mb: 3, 
                  flex: 1,
                  transition: 'color 0.3s ease',
                  lineHeight: 1.6,
                }}
              >
                {category.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {category.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Chip
                      key={tagIndex}
                      label={tag}
                      size="small"
                      variant={hoveredCard === category.id ? "filled" : "outlined"}
                      sx={{
                        fontSize: '0.7rem',
                        height: 24,
                        bgcolor: hoveredCard === category.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                        color: hoveredCard === category.id ? 'white' : category.color,
                        borderColor: hoveredCard === category.id ? 'rgba(255,255,255,0.3)' : category.color,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                  {category.tags.length > 3 && (
                    <Chip
                      label={`+${category.tags.length - 3}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.7rem',
                        height: 24,
                        color: hoveredCard === category.id ? 'white' : 'text.secondary',
                        borderColor: hoveredCard === category.id ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                      }}
                    />
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ fontSize: 16, color: '#ffd700' }} />
                  <Typography 
                    variant="body2" 
                    color={hoveredCard === category.id ? 'rgba(255,255,255,0.8)' : 'text.secondary'}
                    fontWeight={600}
                  >
                    {category.itemCount} items
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  color={hoveredCard === category.id ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
                >
                  Updated {new Date(category.lastUpdated).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight={800}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 2,
            }}
          >
            Knowledge Universe
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.4 }}
          >
            Explore curated research, insights, and discoveries across diverse fields of knowledge
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search categories, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <FilterList />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  bgcolor: 'background.paper',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="primary">
                {knowledgeCategories.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categories
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="secondary">
                {knowledgeCategories.reduce((acc, cat) => acc + cat.itemCount, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Items
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="success.main">
                {featuredCategories.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Featured
              </Typography>
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Typography 
            variant="h4" 
            fontWeight={700} 
            sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Star sx={{ color: '#ffd700' }} />
            Featured Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 6 }}>
            {featuredCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </Box>
        </motion.div>
      )}

      {/* All Categories */}
      {otherCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            All Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {otherCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index + featuredCategories.length} />
            ))}
          </Box>
        </motion.div>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #1CA5F3 90%)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Dashboard;