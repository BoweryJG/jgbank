import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Avatar,
  Divider,
  Alert,
  Stack,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Terrain as TerrainIcon,
  Star as StarIcon,
  Warning as WarningIcon,
  Lightbulb as TipsIcon,
} from '@mui/icons-material';

interface HuntingLocation {
  id: number;
  name: string;
  location: string;
  distance: string;
  difficulty: number;
  historicalSignificance: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
  description: string;
  nativeTribes: string[];
  bestSeasons: string[];
  tips: string[];
  coordinates: string;
  geologicalFeatures: string[];
  accessibility: string;
  permits: string;
  historicalFinds: string[];
}

const huntingLocations: HuntingLocation[] = [
  {
    id: 1,
    name: "Garoga Creek Valley",
    location: "Montgomery County, NY",
    distance: "~3 hours from NYC",
    difficulty: 3,
    historicalSignificance: 5,
    crowdLevel: "Low",
    description: "The Wagners Hollow site on Garoga Creek has yielded exceptional bone implements and numerous arrowheads. This Mohawk Valley location near the prehistoric Garoga fort site is rich in Native American history but remains relatively unknown to casual hunters.",
    nativeTribes: ["Mohawk", "Iroquois Confederacy"],
    bestSeasons: ["Early Spring", "Late Fall", "After Heavy Rains"],
    tips: [
      "Focus on elevated terraces near creek bends",
      "Look for areas with natural stone outcroppings",
      "Check exposed banks after spring floods",
      "Search near old ford crossing points"
    ],
    coordinates: "42.9634° N, 74.3701° W",
    geologicalFeatures: ["Limestone outcrops", "Chert deposits", "Creek terraces"],
    accessibility: "Moderate hiking required, some private land",
    permits: "Permission needed for private property",
    historicalFinds: ["Bone implements", "Stone points", "Scrapers", "Pottery shards"]
  },
  {
    id: 2,
    name: "Schoharie Creek System", 
    location: "Schoharie County, NY",
    distance: "~2.5 hours from NYC",
    difficulty: 2,
    historicalSignificance: 4,
    crowdLevel: "Low",
    description: "This 93-mile creek flows from the Catskills through the Schoharie Valley to the Mohawk River. The valley served as a major Native American travel corridor with multiple camp sites along creek banks, especially near confluence points.",
    nativeTribes: ["Mohawk", "Schoharie Indians"],
    bestSeasons: ["Spring", "Early Summer", "Post-Storm"],
    tips: [
      "Target confluence points with tributary streams",
      "Search gravel bars and exposed banks",
      "Focus on south-facing slopes for winter camps",
      "Look for flat terraces above flood level"
    ],
    coordinates: "42.5834° N, 74.3187° W",
    geologicalFeatures: ["Catskill sandstone", "Creek gravels", "Alluvial deposits"],
    accessibility: "Good road access, mix of public and private land",
    permits: "Some areas require landowner permission",
    historicalFinds: ["Projectile points", "Celts", "Net sinkers", "Trade beads"]
  },
  {
    id: 3,
    name: "O'Day Creek Area",
    location: "Central NY",
    distance: "~3 hours from NYC", 
    difficulty: 2,
    historicalSignificance: 3,
    crowdLevel: "Low",
    description: "Native American artifacts have been documented along O'Day Creek. This location appears in specialized artifact hunting resources but remains under the radar compared to more famous sites.",
    nativeTribes: ["Oneida", "Onondaga"],
    bestSeasons: ["Late Spring", "Early Fall"],
    tips: [
      "Check shallow riffles and gravel beds",
      "Look for camping spots on high ground",
      "Search near natural rock shelters",
      "Focus on areas with fresh water springs"
    ],
    coordinates: "43.0123° N, 75.8456° W",
    geologicalFeatures: ["Glacial deposits", "Natural springs", "Bedrock exposures"],
    accessibility: "Easy access via hiking trails",
    permits: "Public land, no permits required",
    historicalFinds: ["Small points", "Fishing implements", "Stone tools"]
  },
  {
    id: 4,
    name: "Upper Susquehanna Tributaries",
    location: "Southern NY/Northern PA Border",
    distance: "~3.5 hours from NYC",
    difficulty: 4,
    historicalSignificance: 5,
    crowdLevel: "Low",
    description: "The Pennsylvania-New York border region along smaller tributaries of the Susquehanna system. Historical records show significant Native American presence, particularly around creek confluences and elevated terraces.",
    nativeTribes: ["Susquehannock", "Iroquois", "Delaware"],
    bestSeasons: ["Spring", "Fall", "After Flooding"],
    tips: [
      "Focus on tributary confluences",
      "Search elevated terraces for village sites", 
      "Look for quarry sites with tool-making debris",
      "Check areas near natural fords"
    ],
    coordinates: "42.0000° N, 75.5000° W",
    geologicalFeatures: ["Devonian shale", "Chert nodules", "River terraces"],
    accessibility: "Remote areas, 4WD recommended",
    permits: "Mixed public/private, check local regulations",
    historicalFinds: ["Large points", "Knives", "Drills", "Preforms"]
  },
  {
    id: 5,
    name: "Finger Lakes Secondary Creeks",
    location: "Central NY",
    distance: "~4 hours from NYC",
    difficulty: 3,
    historicalSignificance: 4,
    crowdLevel: "Medium",
    description: "Focus on smaller tributaries feeding into Seneca and Cayuga Lakes rather than the main lake shores. Look for elevated terraces and creek bends where temporary camps would have been established.",
    nativeTribes: ["Seneca", "Cayuga", "Iroquois"],
    bestSeasons: ["Spring Thaw", "Late Summer"],
    tips: [
      "Avoid main tourist areas",
      "Target smaller feeder creeks",
      "Look for natural camping terraces",
      "Search near freshwater springs"
    ],
    coordinates: "42.7000° N, 76.8000° W",
    geologicalFeatures: ["Glacial moraines", "Limestone bedrock", "Shale outcrops"],
    accessibility: "Good road access to most areas",
    permits: "Mostly public land, some state park fees",
    historicalFinds: ["Woodland period points", "Pottery", "Stone axes", "Gorgets"]
  }
];

const ArtifactHunting: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | false>(false);

  const handleCardExpand = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCard(isExpanded ? panel : false);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'success';
    if (difficulty <= 3) return 'warning';
    return 'error';
  };

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h2" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <TerrainIcon sx={{ mr: 2, fontSize: '2rem' }} />
          Artifact Hunting Locations
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Curated lesser-known arrowhead hunting locations within 4 hours of NYC, focusing on sites with 
          rich Native American history but minimal crowds.
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Legal Notice:</strong> Always obtain proper permissions for private land. Check local and state 
          regulations regarding artifact collection. Respect archaeological sites and report significant finds to authorities.
        </Alert>
      </Box>

      <Stack spacing={3}>
        {huntingLocations.map((location) => (
          <Card key={location.id} elevation={2} sx={{ '&:hover': { elevation: 4 } }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {location.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      {location.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      {location.distance}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                    <Chip 
                      label={`Crowd Level: ${location.crowdLevel}`} 
                      color={getCrowdLevelColor(location.crowdLevel) as any}
                      size="small"
                    />
                    <Chip 
                      label={`Difficulty: ${location.difficulty}/5`} 
                      color={getDifficultyColor(location.difficulty) as any}
                      size="small"
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Historical Significance:</strong>
                  </Typography>
                  <Rating value={location.historicalSignificance} readOnly size="small" />
                </Box>

                <Typography variant="body1" paragraph>
                  {location.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Native Tribes:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {location.nativeTribes.map((tribe, index) => (
                      <Chip key={index} label={tribe} variant="outlined" size="small" />
                    ))}
                  </Box>
                </Box>

                <Accordion 
                  expanded={expandedCard === location.id} 
                  onChange={handleCardExpand(location.id)}
                  elevation={0}
                  sx={{ '&:before': { display: 'none' } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      Detailed Information & Tips
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <TipsIcon sx={{ mr: 1 }} />
                          Hunting Tips
                        </Typography>
                        <List dense>
                          {location.tips.map((tip, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <StarIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={tip} />
                            </ListItem>
                          ))}
                        </List>

                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                          Best Seasons
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {location.bestSeasons.map((season, index) => (
                            <Chip key={index} label={season} color="primary" variant="outlined" size="small" />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          Location Details
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="Coordinates" 
                              secondary={location.coordinates} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Accessibility" 
                              secondary={location.accessibility} 
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Permits Required" 
                              secondary={location.permits} 
                            />
                          </ListItem>
                        </List>

                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                          Geological Features
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {location.geologicalFeatures.map((feature, index) => (
                            <Chip key={index} label={feature} variant="outlined" size="small" />
                          ))}
                        </Box>

                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                          Historical Finds
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {location.historicalFinds.map((find, index) => (
                            <Chip key={index} label={find} color="secondary" variant="outlined" size="small" />
                          ))}
                        </Box>
                      </Box>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Hunting Guidelines
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <WarningIcon color="warning" />
            </ListItemIcon>
            <ListItemText 
              primary="Always get permission for private land access"
              secondary="Respect landowner rights and leave areas as you found them"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TerrainIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Focus on elevated terraces near water sources"
              secondary="Native Americans preferred high ground near water for camps and villages"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationIcon color="secondary" />
            </ListItemIcon>
            <ListItemText 
              primary="Check confluences and creek bends"
              secondary="These areas provided natural travel routes and resource concentrations"
            />
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default ArtifactHunting;