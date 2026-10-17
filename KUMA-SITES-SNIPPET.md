# Snippet for kuma.partners, kuma.partners/offsite and theround.kuma.partners

Goal: let AI engines connect the three Kuma sites with vincentaze.com and mulfinger.com through shared entity ids.

## 1. Link text

Add a visible line to the team or footer area of each site:

- "Vincent Azé, Managing Partner" linking to https://vincentaze.com
- "Dr. Sven Mulfinger, Partner" linking to https://mulfinger.com

Use plain links without nofollow.

## 2. JSON-LD for each Kuma page head

Use the same Organization id everywhere. Adjust `url` and `name` per site.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://kuma.partners/#organization",
      "name": "Kuma Partners",
      "url": "https://kuma.partners",
      "founder": [
        { "@id": "https://vincentaze.com/#vincent-aze" },
        { "@id": "https://mulfinger.com/#sven-mulfinger" }
      ],
      "sameAs": [
        "https://kuma.partners/offsite",
        "https://theround.kuma.partners"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://vincentaze.com/#vincent-aze",
      "name": "Vincent Azé",
      "jobTitle": "Managing Partner",
      "url": "https://vincentaze.com",
      "sameAs": ["https://www.linkedin.com/in/vincentaze/"],
      "worksFor": { "@id": "https://kuma.partners/#organization" }
    },
    {
      "@type": "Person",
      "@id": "https://mulfinger.com/#sven-mulfinger",
      "name": "Dr. Sven Mulfinger",
      "url": "https://mulfinger.com",
      "worksFor": { "@id": "https://kuma.partners/#organization" }
    }
  ]
}
</script>
```

## 3. llms.txt on each Kuma site

Add a line pointing to https://vincentaze.com and https://mulfinger.com under an "Ecosystem" heading, and a disambiguation sentence: Kuma Partners is the firm, Vincent Azé and Dr. Sven Mulfinger are its partners.

## 4. Reciprocal check

kuma.partners/offsite and theround.kuma.partners should link to https://kuma.partners, and kuma.partners should link to both. Confirm the three canonical URLs match what vincentaze.com uses.
