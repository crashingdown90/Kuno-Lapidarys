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

// Fetch functions with proper typing
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getPage(slug: string): Promise<Page | null> {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      ...,
      "slug": slug.current
    }`,
    { slug }
  );
}

export async function getAllPosts(limit = 10, offset = 0): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) [$offset...$limit]{
      ...,
      "slug": slug.current,
      categories[]->,
      tags[]->,
      author->
    }`,
    { limit: offset + limit, offset }
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      categories[]->,
      tags[]->,
      author->
    }`,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
      ...,
      "slug": slug.current,
      categories[]->,
      tags[]->
    }`,
    { categorySlug }
  );
}

export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post" && $tagSlug in tags[]->slug.current] | order(publishedAt desc){
      ...,
      "slug": slug.current,
      categories[]->,
      tags[]->
    }`,
    { tagSlug }
  );
}

export async function getRelatedPosts(postId: string, limit = 3): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post" && _id != $postId && count(categories[@._ref in *[_id == $postId].categories[]._ref]) > 0] | order(publishedAt desc) [0...$limit]{
      ...,
      "slug": slug.current,
      categories[]->,
      tags[]->
    }`,
    { postId, limit }
  );
}

export async function getAllCategories(): Promise<Category[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(title asc){
      ...,
      "slug": slug.current,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`
  );
}

export async function getAllTags(): Promise<Tag[]> {
  return sanityClient.fetch(
    `*[_type == "tag"] | order(title asc){
      ...,
      "slug": slug.current,
      "postCount": count(*[_type == "post" && references(^._id)])
    }`
  );
}

export async function getAllLapidarys(): Promise<Lapidary[]> {
  return sanityClient.fetch(
    `*[_type == "lapidary"] | order(name asc){
      ...,
      "slug": slug.current
    }`
  );
}

export async function getFeaturedLapidarys(): Promise<Lapidary[]> {
  return sanityClient.fetch(
    `*[_type == "lapidary" && featured == true] | order(name asc)[0...4]{
      ...,
      "slug": slug.current
    }`
  );
}

export async function getLapidaryBySlug(slug: string): Promise<Lapidary | null> {
  return sanityClient.fetch(
    `*[_type == "lapidary" && slug.current == $slug][0]{
      ...,
      "slug": slug.current
    }`,
    { slug }
  );
}

export async function getAllPartnerships(): Promise<Partnership[]> {
  return sanityClient.fetch(
    `*[_type == "partnership"] | order(title asc){
      ...
    }`
  );
}

export async function getFeaturedPartnerships(): Promise<Partnership[]> {
  return sanityClient.fetch(
    `*[_type == "partnership" && featured == true] | order(title asc)[0...6]{
      ...
    }`
  );
}

// Helper to get post count for pagination
export async function getPostCount(): Promise<number> {
  return sanityClient.fetch(`count(*[_type == "post" && publishedAt <= now()])`);
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
