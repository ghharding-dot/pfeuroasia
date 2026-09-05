# Madroñal Villas — first design draft

Static website prototype based on the visual direction of Property Facilitators EuroAsia.

## Open the preview

Open `index.html` in a browser. All pages are static and require no installation.

## Included

- Home page
- Villa Candela page
- Villa Lámpara page
- Guest services page
- El Madroñal location page
- Structured enquiry page
- Responsive mobile navigation
- Initial image optimisation to WebP

## Must be confirmed before publication

- Correct assignment of every photograph to Candela or Lámpara
- Final bedroom, bed, bathroom and permitted guest capacities
- Candela renovation and reopening position
- Seasonal rates and minimum stays
- Included housekeeping and staffing
- Event capacities, restrictions and deposits
- Contact telephone and email
- Company, tourist licence, privacy, cookie and legal information
- Genuine guest testimonials and permission to publish
- Accurate journey times
- Secure form delivery and spam protection

This prototype is not connected to the live domain and does not change the current WordPress website.


## GitHub and Vercel deployment

This project is designed to live in the `madronal-villas/` directory of the existing PF EuroAsia repository. Create a separate Vercel project from the same repository and set **Root Directory** to `madronal-villas`. No build command is required for this static version.

## Replacing image placeholders

The current SVG files are intentional placeholders. Replace them in `assets/images/` while preserving these filenames, or update the page references:

- `hero.svg` — homepage hero
- `candela.svg` — Villa Candela images
- `lampara.svg` — Villa Lámpara images
- `interior.svg` — interior galleries
- `services.svg` — chef and guest-service imagery
- `location.svg` — El Madroñal and Marbella setting

Before launch, we will replace the shared placeholders with individual optimized WebP photographs and verify which villa each photograph belongs to.
