#!/bin/bash

# ============================================================================
# DUMMY IMAGE SETUP SCRIPT
# Downloads placeholder images from Unsplash for development/demo purposes
# ============================================================================

echo "🖼️  Setting up dummy images for KUNO Lapidary..."

# Create public/images directory if it doesn't exist
mkdir -p public/images/{hero,blog,lapidarys,gallery,og}

echo "📥 Downloading placeholder images from Unsplash..."

# Hero Images (2400x1200)
curl -L "https://source.unsplash.com/2400x1200/?gemstone,workshop" -o public/images/hero/home-hero.jpg
curl -L "https://source.unsplash.com/2400x1200/?craftsman,jewelry-making" -o public/images/hero/workshop-hero.jpg

# Blog Cover Images (1600x900)
curl -L "https://source.unsplash.com/1600x900/?emerald,gemstone" -o public/images/blog/emerald-cutting.jpg
curl -L "https://source.unsplash.com/1600x900/?sapphire,blue-gem" -o public/images/blog/sapphire-guide.jpg
curl -L "https://source.unsplash.com/1600x900/?ruby,red-gemstone" -o public/images/blog/ruby-clarity.jpg
curl -L "https://source.unsplash.com/1600x900/?jewelry-workshop,artisan" -o public/images/blog/workshop-tour.jpg
curl -L "https://source.unsplash.com/1600x900/?diamond,precious-stone" -o public/images/blog/custom-commission.jpg

# Lapidary Portraits (800x1000)
curl -L "https://source.unsplash.com/800x1000/?portrait,professional,asian" -o public/images/lapidarys/zhang-wei.jpg
curl -L "https://source.unsplash.com/800x1000/?portrait,professional,woman" -o public/images/lapidarys/sarah-mitchell.jpg
curl -L "https://source.unsplash.com/800x1000/?portrait,professional,man" -o public/images/lapidarys/roberto-silva.jpg
curl -L "https://source.unsplash.com/800x1000/?portrait,professional,japanese" -o public/images/lapidarys/yuki-tanaka.jpg

# Gallery Images (1200x1200)
curl -L "https://source.unsplash.com/1200x1200/?emerald,green-gem" -o public/images/gallery/emerald-1.jpg
curl -L "https://source.unsplash.com/1200x1200/?ruby,red-gemstone" -o public/images/gallery/ruby-1.jpg
curl -L "https://source.unsplash.com/1200x1200/?sapphire,blue-stone" -o public/images/gallery/sapphire-1.jpg
curl -L "https://source.unsplash.com/1200x1200/?diamond,clear-gem" -o public/images/gallery/diamond-1.jpg
curl -L "https://source.unsplash.com/1200x1200/?amethyst,purple-gem" -o public/images/gallery/amethyst-1.jpg
curl -L "https://source.unsplash.com/1200x1200/?opal,multicolor-gem" -o public/images/gallery/opal-1.jpg
curl -L "https://source.unsplash.com/1200x1200/?topaz,yellow-gem" -o public/images/gallery/topaz-1.jpg
curl -L "https://source.unsplash.com/1200x1200/?aquamarine,blue-crystal" -o public/images/gallery/aquamarine-1.jpg

# OG Image (1200x630)
curl -L "https://source.unsplash.com/1200x630/?luxury,gemstone" -o public/images/og/default-og.jpg

# Placeholder fallbacks
curl -L "https://via.placeholder.com/1600x900/183059/ead5af?text=Blog+Post" -o public/placeholder-blog.jpg
curl -L "https://via.placeholder.com/800x1000/183059/ead5af?text=Portrait" -o public/placeholder-portrait.jpg
curl -L "https://via.placeholder.com/1200x1200/183059/ead5af?text=Gallery" -o public/placeholder-gallery.jpg

echo "✅ Image download complete!"
echo ""
echo "📁 Images saved to:"
echo "   - public/images/hero/ (2 images)"
echo "   - public/images/blog/ (5 images)"
echo "   - public/images/lapidarys/ (4 images)"
echo "   - public/images/gallery/ (8 images)"
echo "   - public/images/og/ (1 image)"
echo "   - public/placeholder-*.jpg (3 fallback images)"
echo ""
echo "🎨 Total: 23 placeholder images ready for use!"
echo ""
echo "Note: Images are sourced from Unsplash and Placeholder.com"
echo "For production, replace with actual professional photographs."
