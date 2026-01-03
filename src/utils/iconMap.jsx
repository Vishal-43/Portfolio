import { 
  Briefcase, 
  Star, 
  Rocket,
  Code,
  Palette,
  Zap,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Box,
  Server,
  Wrench,
  User,
  TrendingUp,
  MapPin,
  Phone,
  ExternalLink,
  Brain,
  Cpu
} from 'lucide-react';

/**
 * Map icon names from JSON to Lucide React icon components
 */
export const iconMap = {
  'briefcase': Briefcase,
  'code': Code,
  'palette': Palette,
  'zap': Zap,
  'graduation-cap': GraduationCap,
  'star': Star,
  'rocket': Rocket,
  'mail': Mail,
  'github': Github,
  'linkedin': Linkedin,
  'twitter': Twitter,
  'cube': Box,
  'server': Server,
  'wrench': Wrench,
  'user': User,
  'trending-up': TrendingUp,
  'map-pin': MapPin,
  'phone': Phone,
  'external-link': ExternalLink,
  'brain': Brain,
  'cpu': Cpu,
};

/**
 * Get icon component by name
 * @param {string} iconName - Icon name from JSON
 * @param {Object} props - Props to pass to icon component (size, className, etc.)
 * @returns {JSX.Element|null} Icon component or null
 */
export const getIcon = (iconName, props = {}) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return null;
  }
  return <IconComponent {...props} />;
};

export default iconMap;
