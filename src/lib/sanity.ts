import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type {
  SiteSettings,
  Page,
  Post,
  Category,
  Tag,
  Lapidary,
  Partnership,
  SanityImage,
} from '@/types/sanity';

// Initialize Sanity client
export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: import.meta.env.SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
  token: import.meta.env.SANITY_READ_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

// Fetch functions with proper typing and error handling
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "page" && slug.current == $slug][0]{
        ...,
        "slug": slug.current
      }`,
      { slug }
    );
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error);
    return null;
  }
}

export async function getAllPosts(
  limit = 10,
  offset = 0,
  filters?: { category?: string; tag?: string }
): Promise<Post[]> {
  try {
    let filterQuery = '_type == "post" && publishedAt <= now()';

    if (filters?.category) {
      filterQuery += ` && $categorySlug in categories[]->slug.current`;
    }

    if (filters?.tag) {
      filterQuery += ` && $tagSlug in tags[]->slug.current`;
    }

    return await sanityClient.fetch(
      `*[${filterQuery}] | order(publishedAt desc) [$offset...$limit]{
        ...,
        "slug": slug.current,
        categories[]->,
        tags[]->,
        author->
      }`,
      {
        limit: offset + limit,
        offset,
        categorySlug: filters?.category,
        tagSlug: filters?.tag
      }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        ...,
        "slug": slug.current,
        categories[]->,
        tags[]->,
        author->
      }`,
      { slug }
    );
  } catch (error) {
    console.error(`Error fetching post "${slug}":`, error);
    return null;
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
        ...,
        "slug": slug.current,
        categories[]->,
        tags[]->
      }`,
      { categorySlug }
    );
  } catch (error) {
    console.error(`Error fetching posts by category "${categorySlug}":`, error);
    return [];
  }
}

export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && $tagSlug in tags[]->slug.current] | order(publishedAt desc){
        ...,
        "slug": slug.current,
        categories[]->,
        tags[]->
      }`,
      { tagSlug }
    );
  } catch (error) {
    console.error(`Error fetching posts by tag "${tagSlug}":`, error);
    return [];
  }
}

export async function getRelatedPosts(postId: string, limit = 3): Promise<Post[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && _id != $postId && count(categories[@._ref in *[_id == $postId].categories[]._ref]) > 0] | order(publishedAt desc) [0...$limit]{
        ...,
        "slug": slug.current,
        categories[]->,
        tags[]->
      }`,
      { postId, limit }
    );
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "category"] | order(title asc){
        ...,
        "slug": slug.current,
        "postCount": count(*[_type == "post" && references(^._id)])
      }`
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "tag"] | order(title asc){
        ...,
        "slug": slug.current,
        "postCount": count(*[_type == "post" && references(^._id)])
      }`
    );
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getAllLapidarys(): Promise<Lapidary[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "lapidary"] | order(name asc){
        ...,
        "slug": slug.current
      }`
    );
  } catch (error) {
    console.error('Error fetching lapidarys:', error);
    return [];
  }
}

export async function getFeaturedLapidarys(): Promise<Lapidary[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "lapidary" && featured == true] | order(name asc)[0...4]{
        ...,
        "slug": slug.current
      }`
    );
  } catch (error) {
    console.error('Error fetching featured lapidarys:', error);
    return [];
  }
}

export async function getLapidaryBySlug(slug: string): Promise<Lapidary | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "lapidary" && slug.current == $slug][0]{
        ...,
        "slug": slug.current
      }`,
      { slug }
    );
  } catch (error) {
    console.error(`Error fetching lapidary "${slug}":`, error);
    return null;
  }
}

export async function getAllPartnerships(): Promise<Partnership[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "partnership"] | order(title asc){
        ...
      }`
    );
  } catch (error) {
    console.error('Error fetching partnerships:', error);
    return [];
  }
}

export async function getFeaturedPartnerships(): Promise<Partnership[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "partnership" && featured == true] | order(title asc)[0...6]{
        ...
      }`
    );
  } catch (error) {
    console.error('Error fetching featured partnerships:', error);
    return [];
  }
}

// Helper to get post count for pagination
export async function getPostCount(filters?: { category?: string; tag?: string }): Promise<number> {
  try {
    let filterQuery = '_type == "post" && publishedAt <= now()';

    if (filters?.category) {
      filterQuery += ` && $categorySlug in categories[]->slug.current`;
    }

    if (filters?.tag) {
      filterQuery += ` && $tagSlug in tags[]->slug.current`;
    }

    return await sanityClient.fetch(
      `count(*[${filterQuery}])`,
      {
        categorySlug: filters?.category,
        tagSlug: filters?.tag
      }
    );
  } catch (error) {
    console.error('Error fetching post count:', error);
    return 0;
  }
}

// Helper to format dates
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper to generate excerpt from portable text
export function generateExcerpt(body: any, length = 160): string {
  if (!body || !Array.isArray(body)) return '';
  
  const text = body
    .filter((block) => block._type === 'block')
    .map((block) => block.children?.map((child: any) => child.text).join(''))
    .join(' ');
  
  return text.length > length ? text.substring(0, length) + '...' : text;
}
