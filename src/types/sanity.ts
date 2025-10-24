export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings';
  title: string;
  tagline: string;
  logo?: SanityImage;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
  };
  ga4Id?: string;
  contactEmail: string;
  copyrightText?: string;
}

export interface Page extends SanityDocument {
  _type: 'page';
  title: string;
  slug: { current: string };
  heroImage?: SanityImage;
  seo?: SEOFields;
  content?: ContentBlock[];
}

export interface Post extends SanityDocument {
  _type: 'post';
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  categories?: Category[];
  tags?: Tag[];
  body?: any; // Portable Text
  author?: Lapidary;
}

export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: { current: string };
  description?: string;
}

export interface Tag extends SanityDocument {
  _type: 'tag';
  title: string;
  slug: { current: string };
}

export interface Lapidary extends SanityDocument {
  _type: 'lapidary';
  name: string;
  slug: { current: string };
  role?: string;
  portrait?: SanityImage;
  bio?: any; // Portable Text
  skills?: string[];
  techniques?: string[];
  gallery?: SanityImage[];
  featured?: boolean;
}

export interface Partnership extends SanityDocument {
  _type: 'partnership';
  title: string;
  description?: any; // Portable Text
  partnerType: 'gallery' | 'designer' | 'wholesale' | 'export' | 'other';
  logo?: SanityImage;
  image?: SanityImage;
  link?: string;
  cta?: string;
  featured?: boolean;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export interface ContentBlock {
  _type: string;
  _key: string;
  [key: string]: any;
}

// Helper type for slugs
export type Slug = { current: string };
