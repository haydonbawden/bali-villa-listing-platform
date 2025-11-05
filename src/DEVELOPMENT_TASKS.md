# BaliVillas Platform - Development Task List

## Current Status
The application has a solid foundation with:
- ✅ Complete UI component library (shadcn/ui)
- ✅ Responsive layouts (Header, Footer, Landing, Listings, Property Detail)
- ✅ Comprehensive PropertyData schema
- ✅ Reusable common components (5 components created)
- ✅ Image gallery modal with keyboard navigation
- ✅ Currency switcher (USD/IDR/AUD)
- ✅ Language toggle (EN/ID)
- ✅ Mobile-responsive design framework

## Priority Levels
- 🔴 **P0 - Critical** - Must have for MVP/deployment
- 🟠 **P1 - High** - Important for user experience
- 🟡 **P2 - Medium** - Nice to have, improves functionality
- 🟢 **P3 - Low** - Future enhancements

---

## 🔴 P0 - Critical Tasks (MVP Required)

### 1. Search & Filtering System
**Status:** Not implemented  
**Impact:** Core functionality - users cannot find properties

- [ ] **1.1** Implement search state management in App.tsx
  - Create SearchContext or use useState for search filters
  - Store: location, propertyType, priceRange, bedrooms, bathrooms, parking, features
  
- [ ] **1.2** Connect SearchBar to search state
  - Wire up location input with autocomplete/dropdown
  - Connect property type selector
  - Connect price range selector
  - Implement search button action
  
- [ ] **1.3** Connect FilterSidebar to search state
  - Make all checkboxes and sliders functional
  - Implement "Apply filters" button
  - Implement "Clear all" functionality
  - Add filter count badge

- [ ] **1.4** Implement property filtering logic
  - Create `filterProperties()` utility function in `/utils/propertyFilters.ts`
  - Apply filters to properties array
  - Update displayed results count
  
- [ ] **1.5** Implement sorting functionality
  - Wire up sort dropdown to state
  - Create sort functions (newest, price-low, price-high, bedrooms)
  - Apply sorting to filtered results

- [ ] **1.6** Add URL query parameters
  - Sync search state with URL (e.g., `?location=seminyak&bedrooms=3`)
  - Enable deep linking to searches
  - Implement browser back/forward navigation

**Files to modify:** `App.tsx`, `SearchBar.tsx`, `FilterSidebar.tsx`  
**New files:** `/utils/propertyFilters.ts`, `/contexts/SearchContext.tsx` (optional)

---

### 2. Currency Display Consistency
**Status:** Header has currency switcher but PropertyCard doesn't use it  
**Impact:** Confusing UX - prices don't update when currency is changed

- [ ] **2.1** Pass currency prop to PropertyCard components
  - Update PropertyCard to accept currency prop
  - Implement price conversion display logic
  - Format prices correctly for each currency (USD: $X,XXX / IDR: Rp XX.XXX.XXX / AUD: A$X,XXX)

- [ ] **2.2** Update all property price displays
  - PropertyCard price display
  - LandingPage featured properties
  - Similar properties section
  
- [ ] **2.3** Create currency formatting utility
  - Create `/utils/formatCurrency.ts`
  - Handle all three currencies with proper formatting

**Files to modify:** `PropertyCard.tsx`, `LandingPage.tsx`, `App.tsx`  
**New files:** `/utils/formatCurrency.ts`

---

### 3. Pagination Implementation
**Status:** UI exists but not functional  
**Impact:** Cannot navigate beyond first page of results

- [ ] **3.1** Implement pagination state
  - Add currentPage and itemsPerPage to App.tsx state
  - Calculate totalPages based on filtered results
  
- [ ] **3.2** Create pagination component
  - Make existing pagination buttons functional
  - Add page number display
  - Implement Previous/Next logic
  - Disable buttons appropriately
  
- [ ] **3.3** Slice results based on current page
  - Show only properties for current page
  - Scroll to top on page change

**Files to modify:** `App.tsx`  
**New files:** `/components/Pagination.tsx` (optional - extract from App.tsx)

---

### 4. Mobile Navigation Menu
**Status:** Hamburger icon exists but doesn't open menu  
**Impact:** Mobile users can't access navigation links

- [ ] **4.1** Implement mobile menu drawer/sheet
  - Use Sheet component from shadcn/ui
  - Add navigation links (Buy, Rent, Sold, New Homes, Agents)
  - Add language selector
  - Add currency selector
  - Add "List property" button
  
- [ ] **4.2** Add mobile menu state management
  - Toggle menu open/close
  - Close menu on link click
  - Close menu on outside click

**Files to modify:** `Header.tsx`

---

### 5. Real Property Data
**Status:** Only 1-2 mock properties exist  
**Impact:** Platform looks empty and unprofessional

- [ ] **5.1** Create comprehensive mock dataset
  - Add minimum 50-100 property listings
  - Ensure variety in:
    - Locations (all major Bali areas)
    - Property types (villas, houses, apartments, land)
    - Price ranges ($200k - $10M+)
    - Features and amenities
  
- [ ] **5.2** Use consistent, high-quality images
  - Source appropriate Bali villa images from Unsplash
  - Ensure 5-8 gallery images per property
  - Use relevant images for property features
  
- [ ] **5.3** Write realistic property descriptions
  - Create templates for different property types
  - Include local Bali references and landmarks
  - Use professional real estate language

**Files to modify:** `/data/properties.ts`

---

### 6. Contact & Enquiry System
**Status:** Contact buttons exist but don't function  
**Impact:** Users cannot contact agents/owners - no lead generation

- [ ] **6.1** Create contact modal/form component
  - Include: Name, Email, Phone, Message fields
  - Add property reference info
  - Implement form validation (react-hook-form + zod)
  
- [ ] **6.2** Wire up contact actions in PropertyDetail
  - "Contact Agent" button opens modal
  - Phone/Email/WhatsApp buttons open appropriate apps
  - Pre-fill WhatsApp message with property details
  
- [ ] **6.3** Add toast notifications
  - Success message on form submission
  - Error handling for failed submissions
  - Use Sonner toast component

**Files to modify:** `PropertyDetail.tsx`  
**New files:** `/components/ContactAgentModal.tsx`

---

## 🟠 P1 - High Priority Tasks

### 7. Save/Favorite Properties
**Status:** Heart icon exists but not functional  
**Impact:** Users cannot save properties for later viewing

- [ ] **7.1** Implement favorites state management
  - Use localStorage to persist favorites
  - Create favorites context/state
  
- [ ] **7.2** Make heart icons functional
  - Toggle favorite status on click
  - Update heart icon styling (filled/unfilled)
  - Show toast notification
  
- [ ] **7.3** Create saved properties page
  - Add "Saved" link to header navigation
  - Display all favorited properties
  - Allow removal from favorites

**Files to modify:** `PropertyCard.tsx`, `PropertyDetail.tsx`, `Header.tsx`  
**New files:** `/contexts/FavoritesContext.tsx`, `/components/SavedPropertiesPage.tsx`

---

### 8. Share Functionality
**Status:** Share button exists but doesn't work  
**Impact:** Reduced viral potential and user engagement

- [ ] **8.1** Implement native share API
  - Use Web Share API where supported
  - Fallback to copy link + toast notification
  
- [ ] **8.2** Add share modal with options
  - Copy link
  - Email
  - WhatsApp
  - Facebook
  - Twitter/X
  
- [ ] **8.3** Generate shareable URLs
  - Include property ID in URL
  - Add meta tags for social media previews

**Files to modify:** `PropertyDetail.tsx`  
**New files:** `/components/ShareModal.tsx`

---

### 9. Loading States & Error Handling
**Status:** No loading or error states  
**Impact:** Poor UX during data fetching and errors

- [ ] **9.1** Add loading skeletons
  - PropertyCard skeleton component
  - Property detail skeleton
  - Search results skeleton
  
- [ ] **9.2** Add error states
  - No results found message
  - Error loading data message
  - 404 page for invalid property IDs
  
- [ ] **9.3** Add loading indicators
  - Search button loading state
  - Filter apply loading state
  - Image loading placeholders

**New files:** `/components/PropertyCardSkeleton.tsx`, `/components/ErrorState.tsx`, `/components/NoResults.tsx`

---

### 10. Image Optimization
**Status:** Using direct Unsplash URLs without optimization  
**Impact:** Slow page loads, poor performance

- [ ] **10.1** Implement lazy loading for images
  - Add IntersectionObserver to ImageWithFallback
  - Load images as they enter viewport
  
- [ ] **10.2** Add blur-up placeholders
  - Low-quality image placeholders (LQIP)
  - Smooth transition to full image
  
- [ ] **10.3** Optimize image sizes
  - Use appropriate image dimensions
  - Implement responsive images (srcset)
  - Compress images

**Files to modify:** `ImageWithFallback.tsx`

---

### 11. Property Comparison Feature
**Status:** Not implemented  
**Impact:** Users cannot easily compare properties

- [ ] **11.1** Add "Compare" checkbox to PropertyCard
  - Allow selection of 2-4 properties
  - Show comparison bar at bottom of screen
  
- [ ] **11.2** Create comparison view/modal
  - Side-by-side property comparison
  - Compare: price, size, features, location
  - Highlight differences
  
- [ ] **11.3** Persist comparison selection
  - Use sessionStorage
  - Clear on session end

**New files:** `/components/PropertyComparison.tsx`, `/components/ComparisonBar.tsx`

---

## 🟡 P2 - Medium Priority Tasks

### 12. Map View Integration
**Status:** Map button exists but not implemented  
**Impact:** Cannot view properties on map

- [ ] **12.1** Integrate map library (Leaflet or Mapbox)
  - Add map component
  - Plot properties on map with pins
  
- [ ] **12.2** Implement map interactions
  - Click pin to view property card
  - Cluster markers when zoomed out
  - Filter properties by map bounds
  
- [ ] **12.3** Add map/list toggle
  - Switch between map and list view
  - Show map in property detail page

**New files:** `/components/MapView.tsx`, `/utils/mapHelpers.ts`

---

### 13. Advanced Search Features
**Status:** Basic search exists  
**Impact:** Limited search capabilities

- [ ] **13.1** Add location autocomplete
  - Suggest Bali locations as user types
  - Include suburbs, districts, regencies
  
- [ ] **13.2** Add keyword search
  - Search in property titles and descriptions
  - Implement fuzzy search
  
- [ ] **13.3** Add "Recently Viewed" properties
  - Track viewed properties in localStorage
  - Show in sidebar or separate section
  
- [ ] **13.4** Add saved searches
  - Allow users to save search criteria
  - Email alerts for new matching properties (future)

**New files:** `/components/LocationAutocomplete.tsx`, `/utils/searchUtils.ts`

---

### 14. List View Implementation
**Status:** List button exists but shows same grid layout  
**Impact:** No alternative viewing option

- [ ] **14.1** Create list view layout
  - Horizontal property card layout
  - More compact information display
  - Better for detailed comparison
  
- [ ] **14.2** Implement view toggle logic
  - Switch between grid and list
  - Persist preference in localStorage

**New files:** `/components/PropertyListCard.tsx`

---

### 15. Agent/Agency Profiles
**Status:** Agent info displayed but no profile pages  
**Impact:** Cannot view all properties from same agent

- [ ] **15.1** Create agent profile page
  - Agent photo, bio, contact info
  - List of all agent's properties
  - Reviews/ratings (future)
  
- [ ] **15.2** Make agent names clickable
  - Link from property detail to agent profile
  - Add agent listings count

**New files:** `/components/AgentProfile.tsx`, `/components/AgentCard.tsx`

---

### 16. Similar Properties Enhancement
**Status:** Basic implementation exists but limited logic  
**Impact:** Not showing best matches

- [ ] **16.1** Improve similar property algorithm
  - Match by: location proximity, price range, property type, size, features
  - Weight factors appropriately
  - Show 4-6 most relevant properties
  
- [ ] **16.2** Add carousel for similar properties
  - Use carousel component
  - Better mobile experience

**Files to modify:** `PropertyDetail.tsx`

---

### 17. Print Functionality
**Status:** Print button exists but not implemented  
**Impact:** Cannot print property details

- [ ] **17.1** Create print-friendly styles
  - Add @media print styles
  - Hide navigation, footer, unnecessary elements
  - Optimize layout for printing
  
- [ ] **17.2** Implement print action
  - Trigger browser print dialog
  - Include property images and key details

**Files to modify:** `PropertyDetail.tsx`, `styles/globals.css`

---

## 🟢 P3 - Low Priority / Future Enhancements

### 18. User Authentication & Accounts
- [ ] Implement user registration/login
- [ ] User dashboard with saved properties, searches, alerts
- [ ] Property viewing history
- [ ] User profile management

---

### 19. Multi-language Support (Full i18n)
**Status:** Toggle exists but only changes flag, not content  
**Impact:** Indonesian users see English content

- [ ] Implement full i18n with react-i18next
- [ ] Translate all UI text (EN/ID)
- [ ] Translate property descriptions
- [ ] Add language-specific formatting (dates, numbers)

**New files:** `/locales/en.json`, `/locales/id.json`

---

### 20. Property Listing Submission
**Status:** "List property" button doesn't work  
**Impact:** Platform cannot accept new listings

- [ ] Create multi-step property listing form
- [ ] Image upload functionality
- [ ] Form validation and preview
- [ ] Submit for approval workflow

**New files:** `/components/ListPropertyWizard.tsx`, `/components/ImageUploader.tsx`

---

### 21. Reviews & Ratings
- [ ] Add property reviews system
- [ ] Agent ratings and reviews
- [ ] Verified buyer/renter badges
- [ ] Review moderation

---

### 22. Virtual Tours / 360° Views
- [ ] Integrate 360° image viewer
- [ ] Add virtual tour support
- [ ] Video walkthroughs

---

### 23. Mortgage Calculator
- [ ] Add mortgage/financing calculator
- [ ] Show monthly payment estimates
- [ ] Different loan scenarios

**New files:** `/components/MortgageCalculator.tsx`

---

### 24. Email Notifications & Alerts
- [ ] Property price drop alerts
- [ ] New listings matching saved searches
- [ ] Newsletter subscription
- [ ] Email integration (SendGrid/Resend)

---

### 25. Analytics & SEO
- [ ] Add Google Analytics / Plausible
- [ ] Meta tags for SEO
- [ ] Open Graph tags for social sharing
- [ ] Structured data (Schema.org) for properties
- [ ] XML sitemap generation
- [ ] robots.txt

**Files to modify:** Add `<head>` meta tags  
**New files:** `/public/robots.txt`, `/public/sitemap.xml`

---

### 26. Performance Optimization
- [ ] Code splitting and lazy loading
- [ ] Image optimization (WebP, AVIF)
- [ ] Bundle size optimization
- [ ] Lighthouse score improvement (>90)
- [ ] Caching strategy

---

### 27. Accessibility (a11y)
- [ ] Keyboard navigation improvements
- [ ] Screen reader optimization
- [ ] ARIA labels and roles
- [ ] Color contrast compliance (WCAG AA)
- [ ] Focus management

---

### 28. Legal & Compliance
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie consent banner
- [ ] GDPR compliance (if targeting EU users)
- [ ] Contact page with business details

**New files:** `/components/PrivacyPolicy.tsx`, `/components/TermsOfService.tsx`, `/components/CookieConsent.tsx`

---

### 29. Blog / Content Section
- [ ] Property guides and articles
- [ ] Bali area guides
- [ ] Market insights and trends
- [ ] Investment tips

---

### 30. Admin Panel (CMS)
- [ ] Admin dashboard for property management
- [ ] Approve/reject new listings
- [ ] Edit property details
- [ ] User management
- [ ] Analytics dashboard

---

## Database & Backend Integration (Future)

When ready to move from mock data to real backend:

- [ ] Choose backend solution (Supabase, Firebase, or custom API)
- [ ] Design database schema
- [ ] Set up API endpoints
- [ ] Implement authentication backend
- [ ] Set up image storage (S3, Cloudinary)
- [ ] Implement search with database (Elasticsearch/Algolia)
- [ ] Set up email service
- [ ] Deploy backend infrastructure

---

## Testing Strategy

- [ ] Unit tests for utility functions
- [ ] Component tests with React Testing Library
- [ ] E2E tests with Playwright/Cypress
- [ ] Visual regression testing
- [ ] Mobile device testing (iOS/Android)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)

---

## Deployment Checklist

Before going live:

- [ ] ✅ Complete all P0 tasks
- [ ] ✅ Complete majority of P1 tasks
- [ ] Test on multiple devices and browsers
- [ ] Optimize performance (Lighthouse score >90)
- [ ] Set up domain and hosting
- [ ] Configure SSL certificate
- [ ] Set up CDN for static assets
- [ ] Add error tracking (Sentry)
- [ ] Configure analytics
- [ ] Test contact forms and email delivery
- [ ] Add legal pages (Privacy, Terms)
- [ ] Create backup strategy
- [ ] Set up monitoring and alerts

---

## Recommended Implementation Order (For Fastest MVP)

1. **Week 1:** P0 Tasks 1-3 (Search/Filter, Currency, Pagination)
2. **Week 2:** P0 Tasks 4-5 (Mobile Menu, Real Data)
3. **Week 3:** P0 Task 6 + P1 Tasks 7-9 (Contact, Favorites, Loading/Errors)
4. **Week 4:** P1 Task 10 + P2 Tasks (Image Optimization + Selected Medium Priority)
5. **Week 5:** Testing, Bug Fixes, Performance Optimization
6. **Week 6:** Deployment Preparation & Launch

---

## Notes

- This task list assumes frontend-only development with mock data
- Backend integration will require significant additional work
- Prioritize based on your specific business goals and user needs
- Some tasks can be parallelized by multiple developers
- Consider using feature flags for gradual rollout of new features

---

**Last Updated:** 2025-01-02  
**Total Tasks:** 30 major features with 100+ subtasks
