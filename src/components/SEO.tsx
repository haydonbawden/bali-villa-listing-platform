import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'BaliVillas - Luxury Property Listings in Bali, Indonesia',
  description = 'Discover exclusive luxury villas, houses, and properties for sale or rent in Bali. Browse our collection of premium properties in Seminyak, Canggu, Ubud, and more.',
  keywords = 'bali villas, bali properties, bali real estate, seminyak villas, canggu properties, ubud homes, luxury villas bali, bali property for sale, bali property for rent',
  image = '/og-image.jpg',
  url = 'https://balivillas.com',
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      
      // Open Graph / Facebook
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: 'BaliVillas' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Additional SEO tags
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'English' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'author', content: 'BaliVillas' }
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const value = name || property;
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value!);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Add JSON-LD structured data for real estate
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': 'BaliVillas',
      'description': description,
      'url': url,
      'logo': '/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'ID',
        'addressRegion': 'Bali'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': -8.409518,
        'longitude': 115.188919
      },
      'areaServed': {
        '@type': 'GeoCircle',
        'geoMidpoint': {
          '@type': 'GeoCoordinates',
          'latitude': -8.409518,
          'longitude': 115.188919
        },
        'geoRadius': '50000'
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type]);

  return null;
}

// Helper function to generate property-specific SEO
export function getPropertySEO(property: any) {
  return {
    title: `${property.title} - ${property.suburb}, Bali | BaliVillas`,
    description: `${property.bedrooms} bed, ${property.bathrooms} bath ${property.ownershipType || 'property'} in ${property.suburb}. ${property.description?.slice(0, 150)}...`,
    keywords: `${property.suburb} property, ${property.suburb} villa, bali ${property.bedrooms} bedroom, ${property.ownershipType}, ${property.price}`,
    image: property.image,
    url: `https://balivillas.com/property/${property.id}`,
    type: 'product'
  };
}
