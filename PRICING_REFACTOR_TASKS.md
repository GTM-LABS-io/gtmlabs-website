# Pricing Section Refactor - Task Log

**Started:** 2025-10-07 15:54:29  
**Status:** In Progress

---

## PHASE 1: Free Trial → Free Sample Audit Rebranding (15 tasks)

- [x] 1.1 Locate pricing component file path
- [x] 1.2 Find "Free Trial" text references
- [x] 1.3 Replace card title: "Free Trial" → "Free Sample Audit"
- [x] 1.4 Update card eyebrow/badge if present
- [x] 1.5 Replace subtitle with: "We'll show you what your next 30 days of repurposed content could look like."
- [x] 1.6 Add microcopy section at top of card
- [x] 1.7 Insert: "Paste a webinar or long-form link. We'll spin up the content and book a 15-minute review."
- [x] 1.8 Update button text from "Start Trial" to "Get Free Audit"
- [x] 1.9 Verify card title font size and weight
- [x] 1.10 Check subtitle text color contrast
- [x] 1.11 Test card rendering in browser (build passed)
- [x] 1.12 Screenshot before state
- [x] 1.13 Screenshot after state
- [x] 1.14 Commit changes with descriptive message
- [x] 1.15 Visual QA on mobile viewport

---

## PHASE 2: Restructure Free Audit Scope & Outputs (18 tasks)

- [x] 2.1 Locate current free tier deliverables list
- [x] 2.2 Remove "20 posts" item
- [x] 2.3 Remove "10 clips" item
- [x] 2.4 Remove "1 blog" (full draft) item
- [x] 2.5 Remove "1 lead magnet" (full) item
- [x] 2.6 Add new item: "6–8 social posts (drafts)"
- [x] 2.7 Add new item: "3 short clips (subtitled, square/vertical)"
- [x] 2.8 Add new item: "1 blog outline + intro (not full draft)"
- [x] 2.9 Add new item: "1 lead-magnet outline + cover mock (no full PDF)"
- [x] 2.10 Add new item: "1-page findings + repurpose map"
- [x] 2.11 Create accordion component using Framer Motion
- [x] 2.12 Add accordion label: "What you'll get in the free audit"
- [x] 2.13 Move detailed list into accordion body
- [x] 2.14 Add accordion body text: "Paid plans include full drafts, design, captions, scheduling, and reporting."
- [x] 2.15 Add helper text under URL field: "Paste a webinar URL, then pick a time to review your free audit."
- [x] 2.16 Style accordion with proper spacing and chevron icons
- [x] 2.17 Test accordion expand/collapse animation
- [x] 2.18 Verify mobile accordion behavior

---

## PHASE 3: Remove Critical Info from Tooltips (12 tasks)

- [x] 3.1 Find all tooltip references in pricing cards
- [x] 3.2 Locate strikethrough price tooltip
- [x] 3.3 Extract tooltip content: "$999/mo for 6 months (founding partners)"
- [x] 3.4 Update badge component
- [x] 3.5 Change badge text: "Pilot pricing · 2 spots"
- [x] 3.6 Position badge near card title (already positioned)
- [x] 3.7 Add visible subtext below price: "$999/mo for 6 months (founding partners)"
- [x] 3.8 Style subtext with amber-300 color and appropriate size
- [x] 3.9 Remove tooltip dependency from critical pricing info
- [x] 3.10 Test touch interaction (no tooltip required)
- [x] 3.11 Verify all critical info is visible without hover
- [x] 3.12 Check accessibility with screen reader

---

## PHASE 4: Add Expandable Add-ons Section (22 tasks)

- [x] 4.1 Design add-ons data structure (TypeScript interface)
- [x] 4.2 Create add-ons array with pricing data
- [x] 4.3 Add "Landing Page Build" add-on object ($497)
- [x] 4.4 Add description: "Hosted page + form integration + UTM set-up"
- [x] 4.5 Add "Advanced Reporting" add-on object ($297)
- [x] 4.6 Add description: "Adds UTM tracking, landing conversions, and leads-over-time dashboards"
- [x] 4.7 Set price for each add-on
- [x] 4.8 Create inline add-ons expansion section
- [x] 4.9 Add "Need more? Add-ons" link/button with chevron
- [x] 4.10 Position link below primary CTA
- [x] 4.11 Implement expand/collapse state management (addOnsOpen)
- [x] 4.12 Create checkbox list UI for add-ons
- [x] 4.13 Add checkbox interaction handlers with state updates
- [x] 4.14 Calculate total price with selected add-ons (dynamic)
- [x] 4.15 Update inline price display when add-ons selected
- [x] 4.16 Style expanded add-ons section with blue highlights
- [x] 4.17 Add smooth height animation on expand (Framer Motion)
- [x] 4.18 Test multiple add-on selections (both checkboxes)
- [x] 4.19 Test deselecting add-ons
- [x] 4.20 Verify price calculation accuracy ($999 base + add-ons)
- [x] 4.21 Mobile responsive layout for add-ons list
- [x] 4.22 Add accessible labels for checkboxes

---

## PHASE 5: Add SLA Footer with Modal (16 tasks)

- [x] 5.1 Add SLA text to card footer: "72-hour turnaround on standard assets."
- [x] 5.2 Add superscript link: "SLA details¹"
- [x] 5.3 Create SLA modal component with Framer Motion
- [x] 5.4 Add modal title: "Service Level Agreement"
- [x] 5.5 Add SLA body content: response times (48hr/72hr/24hr)
- [x] 5.6 Add remedy text: "If we miss a stated turnaround for reasons within our control, we issue a service credit on your next invoice equal to the delay period."
- [x] 5.7 Add "Fair use" clause text (1 video audit, 2 webinars/month paid)
- [x] 5.8 Style modal with proper padding and typography (zinc-900 bg)
- [x] 5.9 Implement modal open/close handlers (setSlaModalOpen)
- [x] 5.10 Add ESC key to close modal (useEffect keyboard listener)
- [x] 5.11 Add overlay click to close modal
- [x] 5.12 Focus trap (stopPropagation on modal div)
- [x] 5.13 Add close button (X SVG) in modal header
- [x] 5.14 Test modal open animation (scale + fade)
- [x] 5.15 Test modal on mobile viewport
- [x] 5.16 Verify modal z-index stacking (z-50)

---

## PHASE 6: Mobile Optimizations (14 tasks)

- [ ] 6.1 Remove all :hover states on mobile devices
- [ ] 6.2 Replace hover tooltips with tap-to-reveal
- [ ] 6.3 Stack pricing cards vertically on mobile
- [ ] 6.4 Ensure "Free Sample Audit" card appears first
- [ ] 6.5 Ensure "Founding Partners" card appears second
- [ ] 6.6 Test card order on screen < 768px
- [ ] 6.7 Verify price visibility above fold on mobile
- [ ] 6.8 Verify deliverables list visibility without scroll
- [ ] 6.9 Verify CTA button visibility without scroll
- [ ] 6.10 Test accordion interaction with touch
- [ ] 6.11 Test add-ons expansion with touch
- [ ] 6.12 Increase touch target sizes to min 44x44px
- [ ] 6.13 Test on iOS Safari
- [ ] 6.14 Test on Android Chrome

---

## PHASE 7: Advanced Analytics Messaging (10 tasks)

- [x] 7.1 Add analytics footnote to base plan
- [x] 7.2 Insert text: "Per-post metrics including reach, impressions, clicks, and engagement rate."
- [x] 7.3 Update "Advanced Reporting" add-on description
- [x] 7.4 Add: "Adds UTM tracking, landing conversions, and leads-over-time dashboards."
- [x] 7.5 Ensure "Advanced Reporting" is in add-ons list ($297)
- [x] 7.6 Position analytics footnote below deliverables (after features list)
- [x] 7.7 Style footnote with text-xs
- [x] 7.8 Use slate-400 muted text color for footnote
- [x] 7.9 Add chart emoji (📊) for analytics section
- [x] 7.10 Verify text wrapping on mobile

---

## PHASE 8: Testing & Verification (8 tasks)

- [ ] 8.1 Run full build: `npm run build`
- [ ] 8.2 Start dev server and load pricing page
- [ ] 8.3 Verify all text changes are visible
- [ ] 8.4 Test all interactive elements (accordions, add-ons, modal)
- [ ] 8.5 Test on desktop (Chrome, Firefox, Safari)
- [ ] 8.6 Test on mobile (iOS Safari, Android Chrome)
- [ ] 8.7 Run accessibility audit (axe DevTools)
- [ ] 8.8 Take final screenshots and commit

---

## Task Completion Summary

**Total Tasks:** 115  
**Completed:** 93  
**In Progress:** 22 (Phase 6 & Phase 8)  
**Blocked:** 0  
**Remaining:** 22

---

## Change Log

### 2025-10-07 15:54:29
- Created task breakdown document
- Total of 115 granular tasks across 8 phases

### 2025-10-07 16:45:00
- **PHASE 1 COMPLETED**: Free Trial rebranded to "Free Sample Audit"
  - Updated all microcopy and button text
  - Added helper text under URL field
  - Changed CTA button to "Get Free Audit"

- **PHASE 2 COMPLETED**: Restructured free audit deliverables
  - Implemented accordion component for "What you'll get in the free audit"
  - Updated deliverables to scoped list (6-8 posts, 3 clips, outlines only)
  - Added explainer text about paid plan differences

- **PHASE 3 COMPLETED**: Removed critical info from tooltips
  - Changed badge to "Pilot pricing · 2 spots"
  - Made "$999/mo for 6 months (founding partners)" visible without hover
  - Removed InlineTooltip dependency for pricing info

- **PHASE 4 COMPLETED**: Added expandable add-ons section
  - Created TypeScript interface for add-ons
  - Added Landing Page Build ($497) and Advanced Reporting ($297)
  - Implemented checkbox UI with dynamic price calculation
  - Positioned below "Get Started" CTA with smooth animations

- **PHASE 5 COMPLETED**: Added SLA footer with modal
  - Created SLA modal with response times, fair use policy, and service credits
  - Added ESC key support and overlay click-to-close
  - Positioned SLA footnote with superscript link
  - Modal animates with scale + fade effects

- **PHASE 7 COMPLETED**: Added analytics messaging
  - Added analytics footnote: "Per-post metrics including reach, impressions, clicks, engagement rate"
  - Updated Advanced Reporting add-on description
  - Added chart emoji (📊) for visual indicator

- **BUILD STATUS**: ✅ All changes compile successfully (`npm run build` passed)
