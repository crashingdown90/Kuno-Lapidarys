#!/bin/bash

# ============================================================================
# ALTERNATIVE DUMMY IMAGE SETUP
# Creates placeholder images using ImageMagick for development/demo
# ============================================================================

echo "🖼️  Creating placeholder images for KUNO Lapidary..."
echo ""

# Check if ImageMagick is available
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Creating simple placeholders..."

    # Create directories
    mkdir -p public/images/{hero,blog,lapidarys,gallery,og}

    # Create simple HTML placeholder files with embedded SVG
    create_placeholder() {
        local width=$1
        local height=$2
        local output=$3
        local text=$4

        cat > "$output" << EOF
<svg width="$width" height="$height" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#183059"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#ead5af" text-anchor="middle" dy=".3em">$text</text>
  <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="#9e7d49" text-anchor="middle" dy=".3em">${width}×${height}</text>
</svg>
EOF
    }

    echo "📁 Creating placeholder SVG files..."

    # Hero Images
    create_placeholder 2400 1200 "public/images/hero/home-hero.svg" "KUNO Lapidary - Home Hero"
    create_placeholder 2400 1200 "public/images/hero/workshop-hero.svg" "Workshop Hero"

    # Blog Images
    create_placeholder 1600 900 "public/images/blog/emerald-cutting.svg" "Emerald Cutting"
    create_placeholder 1600 900 "public/images/blog/sapphire-guide.svg" "Sapphire Guide"
    create_placeholder 1600 900 "public/images/blog/ruby-clarity.svg" "Ruby Clarity"
    create_placeholder 1600 900 "public/images/blog/workshop-tour.svg" "Workshop Tour"
    create_placeholder 1600 900 "public/images/blog/custom-commission.svg" "Custom Commission"

    # Lapidary Portraits
    create_placeholder 800 1000 "public/images/lapidarys/zhang-wei.svg" "Master Zhang Wei"
    create_placeholder 800 1000 "public/images/lapidarys/sarah-mitchell.svg" "Sarah Mitchell"
    create_placeholder 800 1000 "public/images/lapidarys/roberto-silva.svg" "Roberto Silva"
    create_placeholder 800 1000 "public/images/lapidarys/yuki-tanaka.svg" "Yuki Tanaka"

    # Gallery Images
    create_placeholder 1200 1200 "public/images/gallery/emerald-1.svg" "Emerald"
    create_placeholder 1200 1200 "public/images/gallery/ruby-1.svg" "Ruby"
    create_placeholder 1200 1200 "public/images/gallery/sapphire-1.svg" "Sapphire"
    create_placeholder 1200 1200 "public/images/gallery/diamond-1.svg" "Diamond"
    create_placeholder 1200 1200 "public/images/gallery/amethyst-1.svg" "Amethyst"
    create_placeholder 1200 1200 "public/images/gallery/opal-1.svg" "Opal"
    create_placeholder 1200 1200 "public/images/gallery/topaz-1.svg" "Topaz"
    create_placeholder 1200 1200 "public/images/gallery/aquamarine-1.svg" "Aquamarine"

    # OG Image
    create_placeholder 1200 630 "public/images/og/default-og.svg" "KUNO Lapidary"

    # General placeholders
    create_placeholder 1600 900 "public/placeholder-blog.svg" "Blog Post Placeholder"
    create_placeholder 800 1000 "public/placeholder-portrait.svg" "Portrait Placeholder"
    create_placeholder 1200 1200 "public/placeholder-gallery.svg" "Gallery Placeholder"

    echo "✅ SVG placeholder creation complete!"

else
    echo "✅ ImageMagick found! Creating high-quality placeholders..."

    # Create directories
    mkdir -p public/images/{hero,blog,lapidarys,gallery,og}

    # Create placeholders with ImageMagick
    create_im_placeholder() {
        local width=$1
        local height=$2
        local output=$3
        local text=$4
        local bg_color=$5

        convert -size ${width}x${height} \
                -background "$bg_color" \
                -fill "#ead5af" \
                -gravity center \
                -pointsize 48 \
                -font Arial \
                label:"$text" \
                "$output"
    }

    # Hero Images (blue background)
    create_im_placeholder 2400 1200 "public/images/hero/home-hero.jpg" "KUNO Lapidary" "#183059"
    create_im_placeholder 2400 1200 "public/images/hero/workshop-hero.jpg" "Workshop" "#183059"

    # Blog Images (gradient blue)
    create_im_placeholder 1600 900 "public/images/blog/emerald-cutting.jpg" "Emerald Cutting" "#183059"
    create_im_placeholder 1600 900 "public/images/blog/sapphire-guide.jpg" "Sapphire" "#183059"
    create_im_placeholder 1600 900 "public/images/blog/ruby-clarity.jpg" "Ruby" "#183059"
    create_im_placeholder 1600 900 "public/images/blog/workshop-tour.jpg" "Workshop" "#183059"
    create_im_placeholder 1600 900 "public/images/blog/custom-commission.jpg" "Commission" "#183059"

    # Lapidary Portraits (tan background)
    create_im_placeholder 800 1000 "public/images/lapidarys/zhang-wei.jpg" "Zhang Wei" "#9e7d49"
    create_im_placeholder 800 1000 "public/images/lapidarys/sarah-mitchell.jpg" "Sarah Mitchell" "#9e7d49"
    create_im_placeholder 800 1000 "public/images/lapidarys/roberto-silva.jpg" "Roberto Silva" "#9e7d49"
    create_im_placeholder 800 1000 "public/images/lapidarys/yuki-tanaka.jpg" "Yuki Tanaka" "#9e7d49"

    # Gallery Images (various colors)
    create_im_placeholder 1200 1200 "public/images/gallery/emerald-1.jpg" "Emerald" "#50C878"
    create_im_placeholder 1200 1200 "public/images/gallery/ruby-1.jpg" "Ruby" "#E0115F"
    create_im_placeholder 1200 1200 "public/images/gallery/sapphire-1.jpg" "Sapphire" "#0F52BA"
    create_im_placeholder 1200 1200 "public/images/gallery/diamond-1.jpg" "Diamond" "#B9F2FF"
    create_im_placeholder 1200 1200 "public/images/gallery/amethyst-1.jpg" "Amethyst" "#9966CC"
    create_im_placeholder 1200 1200 "public/images/gallery/opal-1.jpg" "Opal" "#A8C3BC"
    create_im_placeholder 1200 1200 "public/images/gallery/topaz-1.jpg" "Topaz" "#FFD700"
    create_im_placeholder 1200 1200 "public/images/gallery/aquamarine-1.jpg" "Aquamarine" "#7FFFD4"

    # OG Image
    create_im_placeholder 1200 630 "public/images/og/default-og.jpg" "KUNO & Co." "#183059"

    # General placeholders
    create_im_placeholder 1600 900 "public/placeholder-blog.jpg" "Blog" "#183059"
    create_im_placeholder 800 1000 "public/placeholder-portrait.jpg" "Portrait" "#9e7d49"
    create_im_placeholder 1200 1200 "public/placeholder-gallery.jpg" "Gallery" "#183059"

    echo "✅ ImageMagick placeholder creation complete!"
fi

echo ""
echo "📁 Placeholder images created in:"
echo "   - public/images/hero/ (2 images)"
echo "   - public/images/blog/ (5 images)"
echo "   - public/images/lapidarys/ (4 images)"
echo "   - public/images/gallery/ (8 images)"
echo "   - public/images/og/ (1 image)"
echo "   - public/*.{svg,jpg} (3 fallback images)"
echo ""
echo "🎨 Total: 23 placeholder images ready for use!"
echo ""
echo "💡 Tips:"
echo "   - For production, replace with professional photographs"
echo "   - Optimize images with TinyPNG or ImageOptim"
echo "   - Consider using WebP format for better performance"
echo ""
echo "📸 Free stock photo sources:"
echo "   - Unsplash.com (gemstone, jewelry)"
echo "   - Pexels.com (workshop, craftsman)"
echo "   - Pixabay.com (precious stones)"
