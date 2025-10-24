# KUNO & Co. Lapidary Works - Company Website

Production-ready Astro website for KUNO & Co. Lapidary Works with Sanity CMS integration, built for performance, SEO, and scalability.

## 🚀 Features

- **Modern Tech Stack**: Astro 4 + TypeScript + Tailwind CSS
- **Headless CMS**: Sanity integration for content management
- **Performance**: Optimized for 95+ Lighthouse scores
- **SEO Ready**: Sitemap, robots.txt, OpenGraph, schema.org
- **Contact System**: Form handling with anti-spam protection
- **Responsive Design**: Mobile-first, artisan premium aesthetic
- **Analytics**: Google Analytics 4 integration

## 📁 Project Structure

```
kuno-lapidary/
├── public/              # Static assets
├── sanity/             # Sanity CMS configuration
│   ├── schemas/        # Content schemas
│   └── lib/            # Sanity utilities
├── src/
│   ├── components/     # Astro components
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utilities & Sanity client
│   ├── pages/          # Routes & API endpoints
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Sanity account (free at sanity.io)
- Vercel account for deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Sanity CMS

1. Create a Sanity project:
```bash
npm create sanity@latest -- --project-id <your-project-id> --dataset production
```

2. Deploy Sanity Studio:
```bash
cd sanity
npx sanity deploy
```

3. Add CORS origins in Sanity dashboard:
   - `http://localhost:4321` (development)
   - `https://kunolapidary.com` (production)

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN=optional_read_token

# Google Analytics
PUBLIC_GA4_ID=G-XXXXXXXXXX

# Email Configuration (Choose one provider)
EMAIL_API_KEY=your_api_key
EMAIL_FROM=info@kunolapidary.com
EMAIL_TO=info@kunolapidary.com

# Site Configuration
PUBLIC_SITE_URL=https://kunolapidary.com
```

### 4. Email Service Setup

Choose one email provider and configure:

#### Option A: Resend
```bash
npm install resend
```
Then uncomment the Resend code in `/src/pages/api/contact.ts`

#### Option B: SendGrid
```bash
npm install @sendgrid/mail
```
Configure with your SendGrid API key

### 5. Development

```bash
npm run dev
```

Visit `http://localhost:4321`

### 6. Build & Preview

```bash
npm run build
npm run preview
```

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Import project in Vercel dashboard
2. Configure environment variables
3. Deploy

### 3. Domain Configuration

#### In Hostinger:
1. Login to Hostinger dashboard
2. Go to DNS Zone Editor
3. Add Vercel's nameservers OR create records:
   - A record: `@` → Vercel IP
   - CNAME: `www` → `cname.vercel-dns.com`

#### For Shopify Subdomain:
1. Create CNAME record: `shop` → `shops.myshopify.com`
2. Configure in Shopify admin panel

## 📸 Image Requirements

Place these placeholder images in `/public/`:

| Image | Size | Aspect Ratio | Filename |
|-------|------|--------------|----------|
| Hero | 2400×1200 | 2:1 | hero-home.jpg |
| Workshop | 1600×900 | 16:9 | workshop-hero.jpg |
| Blog Cover | 1600×900 | 16:9 | placeholder-blog.jpg |
| Portrait | 800×1000 | 4:5 | placeholder-portrait.jpg |
| Gallery | 1200×1200 | 1:1 | placeholder-gallery.jpg |
| OG Image | 1200×630 | 1.91:1 | og-image.jpg |
| Logo | 300×100 | 3:1 | logo.png |

## 🎨 Brand Colors

- **Blue**: `#183059`
- **Tan**: `#ead5af`
- **Brown**: `#9e7d49`
- **White**: `#ffffff`

## 📝 Content Seeding

Create initial content in Sanity Studio:

### 1. Site Settings
```javascript
{
  title: "KUNO & Co. Lapidary Works",
  tagline: "Born from Earth. Perfected by Hands.",
  contactEmail: "info@kunolapidary.com",
  ga4Id: "G-XXXXXXXXXX"
}
```

### 2. Sample Blog Posts
- Create 5 posts with categories and tags
- Add featured images
- Set publish dates

### 3. Lapidary Profiles
- Add 4-6 artisan profiles
- Include portraits and work galleries
- Mark 4 as featured for homepage

## 🧪 Testing Checklist

- [ ] All pages load correctly
- [ ] Contact form sends emails
- [ ] Mobile responsive on all devices
- [ ] SEO meta tags present
- [ ] Analytics tracking working
- [ ] External shop link works
- [ ] Images optimized and loading
- [ ] 404 page displays correctly

## 📊 Performance Targets

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 100
- Lighthouse Best Practices: 95+

## 🔧 Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Check for security issues: `npm audit`
- Clear Sanity CDN cache after major content updates
- Monitor form submissions and spam

### Backup
- Regular Sanity dataset exports
- GitHub repository backups
- Environment variable backup

## 📚 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Support

For technical support or questions:
- Email: info@kunolapidary.com
- Create an issue in the GitHub repository

---

Built with ❤️ for KUNO & Co. Lapidary Works
