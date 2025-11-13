# UI/UX Components - Quick Start Guide

## 🚀 Quick Setup

### 1. Install Placeholder Images

```bash
# Run the setup script
bash scripts/setup-dummy-images.sh
```

This will download 23 placeholder images for:
- Hero sections (2 images)
- Blog posts (5 images)
- Lapidary portraits (4 images)
- Gallery (8 images)
- Social/OG images (1 image)
- General placeholders (3 images)

### 2. View Component Demos

Visit the demo page to see all components in action:

```
http://localhost:4321/demo-components
```

---

## 📦 Available Components

### 1. TrustSignals Component

**Purpose:** Display stats/numbers to build credibility

**Usage:**
```astro
import TrustSignals from '@/components/TrustSignals.astro';

<TrustSignals />
```

**Custom Stats:**
```astro
<TrustSignals stats={[
  { value: '25', label: 'Years Experience', suffix: '+' },
  { value: '10,000', label: 'Stones Cut', suffix: '+' },
]} />
```

**Where to Use:**
- Homepage (after hero)
- About page
- Landing pages

---

### 2. TestimonialCard Component

**Purpose:** Display customer testimonials with ratings

**Usage:**
```astro
import TestimonialCard from '@/components/TestimonialCard.astro';

<TestimonialCard
  name="John Doe"
  role="CEO, Company Name"
  text="Amazing work and exceptional service!"
  rating={5}
  project="Custom Emerald Cut"
  image="/images/testimonial.jpg"
/>
```

**Props:**
- `name` (required): Customer name
- `role` (required): Title/company
- `text` (required): Testimonial text
- `rating` (optional): 1-5 stars, default: 5
- `project` (optional): Project type
- `image` (optional): Profile photo

**Where to Use:**
- Homepage testimonials section
- About page
- Service pages

---

### 3. ProcessTimeline Component

**Purpose:** Visualize multi-step processes

**Usage:**
```astro
import ProcessTimeline from '@/components/ProcessTimeline.astro';

<ProcessTimeline />
```

**Custom Steps:**
```astro
const customSteps = [
  {
    number: 1,
    title: 'Step Title',
    description: 'Step description...',
    icon: '💎' // emoji or leave blank for number
  }
];

<ProcessTimeline steps={customSteps} />
```

**Where to Use:**
- How It Works page
- Service process explanation
- Commission workflow

---

### 4. ImageGallery Component

**Purpose:** Interactive image gallery with lightbox

**Usage:**
```astro
import ImageGallery from '@/components/ImageGallery.astro';

const images = [
  {
    src: '/images/gallery/image1.jpg',
    alt: 'Description of image',
    caption: 'Optional caption'
  },
  // ... more images
];

<ImageGallery images={images} columns={3} />
```

**Props:**
- `images` (required): Array of image objects
- `columns` (optional): 2, 3, or 4 columns, default: 3

**Features:**
- Click to open lightbox
- Keyboard navigation (arrows, ESC)
- Touch gestures on mobile
- Auto-zoom on hover

**Where to Use:**
- Portfolio/work showcase
- Lapidary gallery pages
- Blog post galleries

---

### 5. FAQItem Component

**Purpose:** Collapsible FAQ accordion

**Usage:**
```astro
import FAQItem from '@/components/FAQItem.astro';

<div class="space-y-0">
  <FAQItem
    id="pricing"
    question="How much does custom cutting cost?"
    answer="Pricing starts at $200 and varies based on..."
  />
  <FAQItem
    id="timeline"
    question="How long does it take?"
    answer="Most projects take 2-4 weeks..."
  />
</div>
```

**Props:**
- `id` (required): Unique identifier
- `question` (required): Question text
- `answer` (required): Answer text

**Features:**
- One item open at a time
- Smooth animations
- Accessibility-friendly

**Where to Use:**
- FAQ page
- Service pages
- Footer sections

---

### 6. NewsletterSignup Component

**Purpose:** Email newsletter subscription form

**Usage:**
```astro
import NewsletterSignup from '@/components/NewsletterSignup.astro';

<!-- Default variant -->
<NewsletterSignup />

<!-- Minimal variant (no title/description) -->
<NewsletterSignup variant="minimal" />

<!-- Custom text -->
<NewsletterSignup
  title="Stay Connected"
  description="Get updates on new techniques and gemstone insights"
/>
```

**Props:**
- `variant` (optional): 'default' or 'minimal'
- `title` (optional): Custom title
- `description` (optional): Custom description

**Features:**
- Form validation
- Loading states
- Success/error messages
- Mobile-friendly

**Integration Note:**
The form currently shows a success message. To connect to a real newsletter service:

1. **Mailchimp:**
```javascript
// In NewsletterSignup.astro <script>
const response = await fetch('/api/newsletter', {
  method: 'POST',
  body: JSON.stringify({ email })
});
```

2. **ConvertKit/Buttondown:**
Similar API endpoint integration

**Where to Use:**
- Footer (always visible)
- Blog sidebar
- Landing pages
- Popup modals

---

## 🎨 Component Styling

All components use Tailwind CSS and respect the brand color palette:

- **Primary (Blue):** `brand-blue` (#183059)
- **Accent (Tan):** `brand-tan` (#ead5af)
- **Secondary (Brown/Gold):** `brand-brown` (#9e7d49)

### Customizing Colors

To change component colors, update `tailwind.config.mjs`:

```javascript
colors: {
  brand: {
    blue: '#YOUR_COLOR',
    tan: '#YOUR_COLOR',
    brown: '#YOUR_COLOR',
  }
}
```

---

## 📱 Responsive Behavior

All components are mobile-first and responsive:

- **Mobile:** Stack vertically, larger touch targets
- **Tablet:** 2-column layouts where appropriate
- **Desktop:** Full multi-column layouts

Test responsive behavior:
```bash
npm run dev
# Visit: http://localhost:4321
# Use browser DevTools to test different screen sizes
```

---

## 🔧 Common Use Cases

### Homepage Example

```astro
---
import TrustSignals from '@/components/TrustSignals.astro';
import TestimonialCard from '@/components/TestimonialCard.astro';
import NewsletterSignup from '@/components/NewsletterSignup.astro';
import Section from '@/components/Section.astro';
---

<!-- Trust Signals -->
<Section variant="light">
  <TrustSignals />
</Section>

<!-- Testimonials -->
<Section>
  <h2 class="text-3xl font-serif text-center mb-12">
    What Our Clients Say
  </h2>
  <div class="grid md:grid-cols-3 gap-8">
    {testimonials.map((t) => <TestimonialCard {...t} />)}
  </div>
</Section>

<!-- Newsletter -->
<Section variant="tan">
  <NewsletterSignup />
</Section>
```

### Service Page Example

```astro
---
import ProcessTimeline from '@/components/ProcessTimeline.astro';
import FAQItem from '@/components/FAQItem.astro';
import Section from '@/components/Section.astro';
---

<!-- Process -->
<Section>
  <h2>Our Process</h2>
  <ProcessTimeline />
</Section>

<!-- FAQ -->
<Section variant="light">
  <h2>Frequently Asked Questions</h2>
  {faqs.map((faq) => <FAQItem {...faq} />)}
</Section>
```

---

## 🖼️ Working with Images

### Using Placeholder Images

The setup script downloads images to:
```
public/
  images/
    hero/
    blog/
    lapidarys/
    gallery/
    og/
  placeholder-*.jpg
```

### Using Unsplash for More Placeholders

```astro
<!-- Dynamic Unsplash placeholder -->
<img src="https://source.unsplash.com/800x600/?gemstone,ruby" alt="Ruby" />

<!-- Specific dimensions -->
<img src="https://source.unsplash.com/1200x800/?sapphire,blue" alt="Sapphire" />
```

### Image Best Practices

1. **Always use alt text**
2. **Optimize before upload** (use ImageOptim, TinyPNG)
3. **Use WebP format** when possible
4. **Implement lazy loading** for below-fold images

---

## ⚡ Performance Tips

### 1. Lazy Load Images

```astro
<img src="/image.jpg" alt="..." loading="lazy" />
```

### 2. Optimize Component Imports

```astro
---
// Only import what you need
import { TestimonialCard } from '@/components/TestimonialCard.astro';

// Not the entire component library
---
```

### 3. Use Astro Islands

For interactive components with JavaScript:
```astro
<ImageGallery client:visible images={images} />
```

---

## 🎯 Next Steps

### Phase 1: Basic Implementation
- [ ] Add TrustSignals to homepage
- [ ] Add 3 testimonials to homepage
- [ ] Add newsletter to footer
- [ ] Set up FAQ page with 10+ questions

### Phase 2: Enhanced Content
- [ ] Create process timeline for "How It Works" page
- [ ] Build gallery pages for each lapidary
- [ ] Add testimonials to service pages

### Phase 3: Integration
- [ ] Connect newsletter to Mailchimp/ConvertKit
- [ ] Set up Google Analytics events
- [ ] Implement A/B testing

---

## 📚 Resources

- **Component demos:** `/demo-components`
- **Full documentation:** `/UIUX_IMPROVEMENTS.md`
- **Tailwind docs:** https://tailwindcss.com
- **Astro docs:** https://docs.astro.build

---

## 🐛 Troubleshooting

### Images not loading
```bash
# Check if images exist
ls public/images/hero/

# Re-run setup script
bash scripts/setup-dummy-images.sh
```

### Component not rendering
```astro
---
// Check import path (use @ alias)
import Component from '@/components/Component.astro';

// NOT relative paths
// import Component from '../components/Component.astro';
---
```

### Styles not applying
```bash
# Restart dev server
npm run dev
```

---

## 💡 Tips & Tricks

1. **Use Section component** for consistent spacing
2. **Test mobile first** - 60% of traffic is mobile
3. **Limit testimonials** to 3-4 on a page
4. **Use FAQs for SEO** - great for featured snippets
5. **A/B test CTAs** - try different newsletter copy

---

**Need help?** Check the demo page or review UIUX_IMPROVEMENTS.md for detailed guidance.
