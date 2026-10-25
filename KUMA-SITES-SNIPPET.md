# Snippet for kuma.partners, kuma.partners/offsite and theround.kuma.partners

Goal: let AI engines connect the three Kuma sites with vincentaze.com and mulfinger.com through shared entity ids.

## 1. Link text

Add a visible line to the team or footer area of each site:

- "Vincent Azé, Founding Partner" linking to https://vincentaze.com
- "Dr. Sven Mulfinger, Partner" linking to https://mulfinger.com

Use plain links without nofollow.

## 2. JSON-LD for each Kuma page head

Use the same Organization id everywhere. The id and url use the www form because kuma.partners declares https://www.kuma.partners/ as its canonical. Adjust `url` per page.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.kuma.partners/#organization",
      "name": "Kuma Partners",
      "url": "https://www.kuma.partners/",
      "founder": [
        { "@id": "https://vincentaze.com/#vincent-aze" },
        { "@id": "https://mulfinger.com/#sven-mulfinger" }
      ],
      "sameAs": [
        "https://www.kuma.partners/offsite",
        "https://theround.kuma.partners"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://vincentaze.com/#vincent-aze",
      "name": "Vincent Azé",
      "jobTitle": "Executive Coach and Strategic Advisor",
      "url": "https://vincentaze.com",
      "homeLocation": { "@type": "Place", "name": "Lisbon, Portugal" },
      "sameAs": ["https://www.linkedin.com/in/vincentaze/"],
      "worksFor": { "@id": "https://www.kuma.partners/#organization" }
    },
    {
      "@type": "Person",
      "@id": "https://mulfinger.com/#sven-mulfinger",
      "name": "Dr. Sven Mulfinger",
      "url": "https://mulfinger.com",
      "worksFor": { "@id": "https://www.kuma.partners/#organization" }
    }
  ]
}
</script>
```

## 3. llms.txt on each Kuma site

Add a line pointing to https://vincentaze.com and https://mulfinger.com under an "Ecosystem" heading, and a disambiguation sentence: Kuma Partners is the firm, Vincent Azé is a founding partner and Dr. Sven Mulfinger is a partner.

## 4. Reciprocal check

Make the apex kuma.partners redirect to www.kuma.partners with a 301. The offsite page and theround.kuma.partners should link to https://www.kuma.partners/, and the main site should link to both. Use the name "14-Day Leadership Friction Scan" consistently on all three.
