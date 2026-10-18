export interface Product {
  id: string;
  name: string;
  tagline: string;
  affiliateUrl: string;
  rating: number;
  reviewsCount: number;
  category: 'Apparel' | 'Toys' | 'Gear' | 'Treats';
  description: string;
  badge?: string;
  badgeColor?: string;
  accentColor: string;
  sizes?: string[];
  imageUrl: string;
  details: string[];
  inStock?: boolean;
}

export interface SocialLink {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'YouTube' | 'TikTok' | 'X' | 'Other';
  title: string;
  url: string;
  description: string;
  buttonText: string;
  badgeText?: string;
  accentColor: string;
  iconName?: string;
  enabled: boolean;
}

export interface ParkRadar {
  id: string;
  name: string;
  neighborhood: string;
  vibeScore: number;
  vibeStatus: string;
  activeDogsCount: number;
  currentActivity: string;
  lastUpdated: string;
  tags: string[];
}

export interface FanBark {
  id: string;
  author: string;
  dogName: string;
  breed: string;
  message: string;
  timestamp: string;
  sticker: string;
  likes: number;
}

export interface VlogItem {
  id: string;
  title: string;
  platform: 'Instagram' | 'Facebook' | 'YouTube' | 'TikTok';
  views: string;
  duration: string;
  thumbnail: string;
  description: string;
  date: string;
  tags: string[];
  commentsCount: number;
}


