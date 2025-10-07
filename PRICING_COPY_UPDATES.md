# Pricing Section Copy Updates

**Date:** 2025-10-07  
**Status:** ✅ Complete  
**Build Status:** ✅ All changes compile successfully

---

## 📝 Summary of Changes

Updated pricing section with refined deliverables, clearer microcopy, and enhanced SLA details. All critical information is now visible without hover states, improving mobile UX and accessibility.

---

## 🆓 Free Sample Audit Updates

### **Subtitle Changed:**
**Old:**
> "We'll show you what your next 30 days of repurposed content could look like."
> 
> "Paste a webinar or long-form link. We'll spin up the content and book a 15-minute review."

**New:**
> "Paste a YouTube URL. We'll turn it into a mini content library and show you the numbers."

### **URL Helper Text:**
**Old:**
> "Paste a webinar URL, then pick a time to review your free audit."

**New:**
> "Paste a YouTube link. We'll auto-pull the transcript."

### **Deliverables (Accordion):**
**Old:**
- 6–8 social posts (drafts)
- 3 short clips (subtitled, square/vertical)
- 1 blog outline + intro (not full draft)
- 1 lead-magnet outline + cover mock (no full PDF)
- 1-page findings + repurpose map

**New:**
- 10 short clips
- 6–8 social posts
- 1 short blog (~600 words)
- 1 lead magnet

### **Notes Added:**
✅ **New note in accordion:**
> "**Note:** We deliver the lead magnet + copy. Hosting/landing page is an add-on."

✅ **Paid plan differentiator:**
> "Paid plans include scheduling, publishing, and per-post metrics."

---

## 💼 Paid Plan (Founding Partners) Updates

### **New Features Added:**
1. **Scheduling and publishing included**
   - Tooltip: "We handle scheduling so reporting just works. You approve everything before it goes live."

2. **Per-post and per-platform metrics in your portal**
   - Tooltip: "Per-platform & per-post metrics require connected accounts. We connect once and schedule posts from your workspace."

### **Removed:**
- ❌ Old analytics footnote: "📊 Analytics included: Per-post metrics including reach, impressions, clicks, and engagement rate."
- ❌ Duplicate SLA footnote: "¹SLA details: 72-hour turnaround on standard assets. Learn more"

### **SLA Link Simplified:**
**Old:**
> "72-hour turnaround on standard assets. SLA details¹"
> 
> "¹SLA details: 72-hour turnaround on standard assets. Learn more"

**New:**
> Simple underlined link: "Service Level Agreement"

### **CTA Reassurance Line:**
Added below "Get Started" button:
> "We handle scheduling so reporting just works. You approve everything before it goes live."

---

## 🔧 Add-ons Section Updates

### **Advanced Reporting Add-on:**
- ✅ Added tooltip on the title: "We tag every post with UTMs and track file_downloads in GA4 so you can see which channels drive subscribers."
- Description remains: "Adds UTM tracking, landing conversions, and leads-over-time dashboards"

### **Fair Use Note Added:**
Positioned below add-ons section:

> **Fair use:** "Up to 2 webinars/month" and "30+ assets" reflect typical scope for <120 minutes of total source content per month. Heavier volumes or extra videos use the "Extra source hours" add-on. **Advanced analytics add-on:** Includes UTMs, GA4 download tracking, and a monthly funnel report with social → landing page → download → subscriber KPIs.

---

## 📋 SLA Modal Enhancements

### **Response Times Section:**
**Old:**
- 48-hour first draft on core assets
- 72-hour revision cycles, Monday-Friday
- 24-hour response time for urgent questions

**New (with clarifications):**
- **First draft:** within 48 hours of receiving the source link and brief.
- **Revisions:** within 72 hours per cycle, Monday–Friday, 9am–6pm PT.
- **Urgent questions:** 24-hour reply during business hours.

**Added clarification:**
> *Response* = human acknowledgement with next step and owner; it is not the final delivery. *Resolution* = completed asset or agreed next draft.

### **Fair Use / Scope Section:**
**Old:**
> Free audits include up to one source video per audit. Paid plans cover two webinars per month unless otherwise noted in your agreement.

**New:**
- **Free audits:** up to 1 source video (≤ 60 minutes) per audit.
- **Paid plans:** up to 2 webinars per month (combined ≤ 120 minutes) unless your agreement states otherwise. (Longer footage can be split across months or covered via add-on.)

### **Service Credits Section:**
**Old:**
> If we miss a stated turnaround for reasons within our control, we issue a service credit on your next invoice equal to the delay period.

**New:**
> If we miss a stated turnaround for reasons within our control, we issue a service credit on your next invoice, proportional to the delay period. **Service credits are the sole remedy for SLA misses.**

### **NEW: When Clocks Run Section:**
> SLA clocks run Monday–Friday, 9am–6pm PT. Holidays pause the clock. Submissions after hours start next business day.

### **NEW: Channels Section:**
> Tracked channels for "response": portal comments, the request thread, or jovanny@gtmlabs.io. Replies on other channels don't start or stop clocks (we'll route them into the portal).

### **Modal Improvements:**
- ✅ Added scrollable container with `max-h-[70vh]` for longer content
- ✅ Email link (`jovanny@gtmlabs.io`) is now clickable
- ✅ Better typography hierarchy with bold labels

---

## 🎨 Visual & UX Improvements

### **Typography:**
- Better visual hierarchy in SLA modal (bold labels for each item)
- Italics for definition clarifications (*Response* vs *Resolution*)
- Consistent use of slate color palette

### **Layout:**
- Fair use note positioned logically after add-ons
- Reassurance line centered below CTA for better visual balance
- Modal content now scrollable for mobile devices

### **Interactions:**
- Advanced Reporting title now has InlineTooltip
- All critical info visible without hover (mobile-friendly)
- Email link in SLA modal is clickable

---

## 🧪 Testing Checklist

### **Free Audit Card:**
- [ ] Subtitle reads: "Paste a YouTube URL. We'll turn it into a mini content library..."
- [ ] URL helper: "Paste a YouTube link. We'll auto-pull the transcript."
- [ ] Accordion shows 4 items: 10 clips, 6-8 posts, blog, lead magnet
- [ ] Note about lead magnet delivery is visible when accordion is open

### **Paid Plan Card:**
- [ ] New feature: "Scheduling and publishing included" with tooltip
- [ ] New feature: "Per-post and per-platform metrics in your portal" with tooltip
- [ ] Reassurance line below "Get Started" button
- [ ] Simple "Service Level Agreement" link (not footnote)

### **Add-ons Section:**
- [ ] "Advanced Reporting" title has tooltip icon
- [ ] Hovering shows UTM/GA4 explanation
- [ ] Fair use note visible below add-ons

### **SLA Modal:**
- [ ] Opens when clicking "Service Level Agreement" link
- [ ] Shows 5 sections: Response Times, Fair Use, Service Credits, When Clocks Run, Channels
- [ ] Modal content is scrollable on small screens
- [ ] Email link (`jovanny@gtmlabs.io`) is clickable
- [ ] ESC key closes modal
- [ ] Clicking overlay closes modal

---

## 📊 Before & After Comparison

| Element | Before | After |
|---------|--------|-------|
| **Free audit subtitle** | Two-line explanation | Single clear value prop |
| **Free audit deliverables** | 5 items with "drafts" and "outlines" | 4 items with actual deliverables |
| **Paid plan features** | 9 items | 11 items (added scheduling & metrics) |
| **Analytics info** | Separate footnote | Integrated as feature with tooltip |
| **SLA access** | Footnote with superscript | Simple underlined link |
| **SLA content** | 3 sections | 5 comprehensive sections |
| **Fair use info** | Hidden in modal only | Visible in add-ons + detailed in modal |
| **Advanced analytics** | Basic description | Tooltip + fair use note |

---

## 🚀 Deployment Notes

### **Build Status:**
✅ All TypeScript types valid  
✅ No linting errors  
✅ Production build successful  
✅ No console warnings

### **Files Modified:**
- `homepage/components/ui/interactive-pricing.tsx`

### **Git Commit:**
- Commit message includes full changelog
- Pushed to main branch
- Ready for production deployment

---

## 💡 Key Improvements

1. **Clearer Free Audit Value Prop**
   - Simplified from two paragraphs to one clear statement
   - More concrete deliverables (removed "drafts" and "outlines" language)

2. **Better Paid Plan Differentiation**
   - Scheduling and metrics are now explicit features
   - Tooltips explain how they work
   - Reassurance line builds trust

3. **Comprehensive SLA**
   - Five detailed sections cover all bases
   - Clear definitions (Response vs Resolution)
   - Specific time zones and business hours
   - Communication channel expectations

4. **Transparent Fair Use**
   - Visible in multiple places (add-ons note + modal)
   - Specific minute limits clearly stated
   - Add-on path clearly explained

5. **Mobile-First UX**
   - No critical info in hover-only tooltips
   - Scrollable modal content
   - Touch-friendly interactions

---

## ✅ Completion Status

**All requested changes implemented:**
- ✅ Free audit deliverables updated
- ✅ URL helper text updated
- ✅ Lead magnet note added
- ✅ Paid plan features added (scheduling, metrics)
- ✅ Reassurance line under CTA
- ✅ Advanced analytics tooltip
- ✅ Fair use note added
- ✅ SLA modal expanded with 5 sections
- ✅ Removed old analytics footnote
- ✅ Removed redundant SLA footnote
- ✅ Build passes all checks

**Ready for:**
- User acceptance testing
- Production deployment
- Mobile device verification

---

**Questions or Issues?**
- Test locally with `npm run dev` in homepage directory
- Review git commit for detailed changes
- Check browser console for any runtime warnings (none expected)
