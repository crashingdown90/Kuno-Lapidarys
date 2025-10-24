// sanity/seed-data.js
// Run this script to populate Sanity with sample data
// Usage: node sanity/seed-data.js

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // Needs write token
  useCdn: false,
});

const sampleData = {
  siteSettings: {
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'KUNO & Co. Lapidary Works',
    tagline: 'Born from Earth. Perfected by Hands.',
    contactEmail: 'info@kunolapidary.com',
    copyrightText: '© 2024 KUNO & Co. Lapidary Works. All rights reserved.',
    socialLinks: {
      instagram: 'https://instagram.com/kunolapidary',
      tiktok: 'https://tiktok.com/@kunolapidary',
      youtube: 'https://youtube.com/@kunolapidary',
    },
  },

  categories: [
    { _type: 'category', title: 'Craftsmanship', slug: { current: 'craftsmanship' } },
    { _type: 'category', title: 'Gemstones', slug: { current: 'gemstones' } },
    { _type: 'category', title: 'Process', slug: { current: 'process' } },
    { _type: 'category', title: 'News', slug: { current: 'news' } },
  ],

  tags: [
    { _type: 'tag', title: 'Emerald', slug: { current: 'emerald' } },
    { _type: 'tag', title: 'Ruby', slug: { current: 'ruby' } },
    { _type: 'tag', title: 'Sapphire', slug: { current: 'sapphire' } },
    { _type: 'tag', title: 'Cutting', slug: { current: 'cutting' } },
    { _type: 'tag', title: 'Polishing', slug: { current: 'polishing' } },
    { _type: 'tag', title: 'Custom Work', slug: { current: 'custom-work' } },
  ],

  lapidarys: [
    {
      _type: 'lapidary',
      name: 'Master Zhang Wei',
      slug: { current: 'zhang-wei' },
      role: 'Master Lapidary',
      skills: ['Precision Cutting', 'Cabochon', 'Faceting'],
      techniques: ['Traditional Chinese', 'Modern CAD'],
      featured: true,
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'With over 20 years of experience, Master Zhang specializes in traditional Chinese stone cutting techniques combined with modern precision tools.',
            },
          ],
        },
      ],
    },
    {
      _type: 'lapidary',
      name: 'Sarah Mitchell',
      slug: { current: 'sarah-mitchell' },
      role: 'Senior Gem Cutter',
      skills: ['Emerald Cutting', 'Diamond Work', 'Repair'],
      techniques: ['Laser Cutting', 'Hand Polish'],
      featured: true,
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Sarah brings 15 years of expertise in precious stone cutting, with a particular focus on emeralds and rare gemstones.',
            },
          ],
        },
      ],
    },
    {
      _type: 'lapidary',
      name: 'Roberto Silva',
      slug: { current: 'roberto-silva' },
      role: 'Stone Carver',
      skills: ['Sculpture', 'Inlay Work', 'Restoration'],
      techniques: ['Hand Carving', 'Water Jet'],
      featured: true,
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Roberto is our master of three-dimensional stone work, creating intricate sculptures and decorative pieces.',
            },
          ],
        },
      ],
    },
    {
      _type: 'lapidary',
      name: 'Yuki Tanaka',
      slug: { current: 'yuki-tanaka' },
      role: 'Polishing Specialist',
      skills: ['Mirror Finish', 'Texture Work', 'Surface Treatment'],
      techniques: ['Japanese Polishing', 'Chemical Treatment'],
      featured: true,
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Yuki perfected her craft in Kyoto, bringing traditional Japanese polishing techniques to achieve unparalleled brilliance.',
            },
          ],
        },
      ],
    },
  ],

  posts: [
    {
      _type: 'post',
      title: 'The Art of Emerald Cutting: A Master Class',
      slug: { current: 'art-of-emerald-cutting' },
      excerpt: 'Explore the intricate process of cutting emeralds, from selecting raw stones to achieving the perfect facets.',
      publishedAt: new Date('2024-01-15').toISOString(),
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Emerald cutting is one of the most challenging aspects of lapidary work. The stone\'s natural inclusions and brittleness require exceptional skill and patience.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Our master craftsmen use a combination of traditional techniques passed down through generations and modern precision tools to achieve the perfect cut.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'Sustainability in Modern Lapidary Practice',
      slug: { current: 'sustainable-lapidary-practice' },
      excerpt: 'How we\'re implementing eco-friendly practices in our workshop while maintaining the highest quality standards.',
      publishedAt: new Date('2024-02-01').toISOString(),
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'At KUNO & Co., we believe in responsible sourcing and sustainable practices. Every stone we work with is ethically sourced and fully traceable.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'Understanding Gemstone Clarity: A Buyer\'s Guide',
      slug: { current: 'understanding-gemstone-clarity' },
      excerpt: 'Learn how to evaluate gemstone clarity and what to look for when selecting stones for your collection.',
      publishedAt: new Date('2024-02-15').toISOString(),
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Clarity is one of the four Cs that determine a gemstone\'s value. Understanding how to evaluate clarity can help you make informed decisions.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'The History of Indonesian Lapidary Arts',
      slug: { current: 'indonesian-lapidary-history' },
      excerpt: 'Discover the rich tradition of stone working in Indonesia and how it influences our work today.',
      publishedAt: new Date('2024-03-01').toISOString(),
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Indonesia has a centuries-old tradition of lapidary arts, from the temples of Borobudur to modern jewelry making.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'Custom Commissions: From Concept to Creation',
      slug: { current: 'custom-commissions-process' },
      excerpt: 'Take a behind-the-scenes look at how we bring custom lapidary projects to life.',
      publishedAt: new Date('2024-03-15').toISOString(),
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Every custom commission begins with a conversation. We work closely with clients to understand their vision and bring it to reality.',
            },
          ],
        },
      ],
    },
  ],

  partnerships: [
    {
      _type: 'partnership',
      title: 'Luxury Gallery Bangkok',
      partnerType: 'gallery',
      description: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Premier gallery partner in Southeast Asia showcasing our exclusive collections.',
            },
          ],
        },
      ],
      featured: true,
    },
    {
      _type: 'partnership',
      title: 'Atelier Milano',
      partnerType: 'designer',
      description: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Collaborative partnership with Italian jewelry designers for bespoke creations.',
            },
          ],
        },
      ],
      featured: true,
    },
  ],
};

async function seedData() {
  try {
    console.log('🌱 Starting data seeding...');

    // Create site settings
    await client.createOrReplace(sampleData.siteSettings);
    console.log('✅ Site settings created');

    // Create categories
    for (const category of sampleData.categories) {
      await client.create(category);
    }
    console.log('✅ Categories created');

    // Create tags
    for (const tag of sampleData.tags) {
      await client.create(tag);
    }
    console.log('✅ Tags created');

    // Create lapidarys
    for (const lapidary of sampleData.lapidarys) {
      await client.create(lapidary);
    }
    console.log('✅ Lapidarys created');

    // Create posts
    for (const post of sampleData.posts) {
      await client.create(post);
    }
    console.log('✅ Blog posts created');

    // Create partnerships
    for (const partnership of sampleData.partnerships) {
      await client.create(partnership);
    }
    console.log('✅ Partnerships created');

    console.log('🎉 Data seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
