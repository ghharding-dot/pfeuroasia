# Spain Property News

The rotating news section is rendered by `app/components/SpainPropertyNews.tsx` on `/spain-gateway#spain-property-news`, immediately after the property/development carousels. Editorial content lives in `app/data/spain-property-news.json`.

## Editorial refresh

Review every 14 days, beginning 9 November 2026. Select 3–5 consequential, verified stories from the preceding 14 days, prioritising Marbella, Benahavís, La Zagaleta, El Madroñal, Golden Mile, Sierra Blanca and Estepona, plus material Spain–Asia connections. Prefer primary announcements, official legal/planning documents and established financial reporting.

Write original English summaries of roughly 40–60 words. Include the event/report date, accurate figure and label, current status, publisher and direct HTTPS source URL. Clearly distinguish asking prices from completed sales, negotiations from closings, proposed rules from enacted law, and target openings from completed delivery. Do not reproduce full articles, publisher screenshots, logos or unlicensed images. Do not disclose private client information or internal business recommendations.

If there is little consequential news, retain only still-relevant stories after rechecking and keep their original dates. Do not re-date old news. Set `updatedAt` to the actual review date and `nextReviewAt` to 14 days later. Never claim a successful refresh or publication without verifying it.

## Publication

Repository: `ghharding-dot/pfeuroasia`. Production Vercel project: `prj_9AEfR5LtA37TAws2W6m8R4j31G8L`, team: `team_iLNOB7j16f4iWfcV4HEKcbBu` (`pfeuroasia`).

Before each edit, inspect the current production deployment and Git revision; the live revision may be ahead of `main`. Base a separate update branch on the current live revision to preserve other published changes, and inspect any concurrent work before release. Keep the content change limited to the JSON unless an actual component defect needs repair. Validate JSON, unique IDs, dates, non-empty fields and HTTPS source links; run TypeScript/build checks as appropriate. Publish the checked Git revision through the existing Vercel project and verify READY status plus the visible section at `https://www.pfeuroasia.com/spain-gateway#spain-property-news`.

The carousel advances every 15 seconds, pauses on hover/focus, offers previous/next/pause and direct selection, supports touch swiping, and disables automatic rotation for reduced-motion preferences. Future data refreshes do not require component changes or a new scheduler.
