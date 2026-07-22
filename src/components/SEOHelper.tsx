import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  pageType?: "MedicalWebPage" | "FAQPage" | "Article" | "Organization";
  schemaData?: any;
}

export default function SEOHelper({
  title,
  description,
  keywords,
  canonicalUrl,
  pageType = "MedicalWebPage",
  schemaData
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Manage Standard Metas
    const updateMeta = (name: string, value: string, isProperty = false) => {
      let element = isProperty 
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    
    // Open Graph
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", canonicalUrl, true);
    updateMeta("og:type", pageType === "Article" ? "article" : "website", true);
    updateMeta("og:image", "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600", true);
    
    // Twitter Cards
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);

    // 3. Manage Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 4. Manage Schema.org structured data JSON-LD
    const existingScript = document.getElementById("structured-schema-jsonld");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "structured-schema-jsonld";
    script.type = "application/ld+json";

    // Default Organization & General Schema
    const defaultSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://globalhopeforall.org/#organization",
          "name": "Global Hope For All",
          "url": canonicalUrl,
          "logo": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=150",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-662-470-9606",
            "contactType": "customer support",
            "email": "globalanxietyslolutioncenter@gmail.com"
          }
        },
        {
          "@type": pageType,
          "name": title,
          "description": description,
          "url": canonicalUrl,
          ...schemaData
        }
      ]
    };

    script.text = JSON.stringify(defaultSchema);
    document.head.appendChild(script);

    return () => {
      // Clean up script on unmount
      const scriptToRemove = document.getElementById("structured-schema-jsonld");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, pageType, schemaData]);

  return null;
}
