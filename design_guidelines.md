# Bible Reader Application - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Utility-Focused)
**Primary Reference:** Apple HIG + Kindle/Reading Apps
**Justification:** This is a content-focused reading application where text legibility, comfortable long-form reading, and minimal distraction are paramount. Drawing from reading-optimized interfaces like Kindle, Apple Books, and Bible Gateway.

**Core Principles:**
- Reading comfort over visual flair
- Predictable, consistent interactions
- Accessible contrast and typography
- Minimal cognitive load

---

## Typography System

### Hierarchy
- **Verse Text:** Primary reading content - size 16-18px (desktop), 15-17px (mobile)
- **Book/Chapter Headers:** Bold, size 24-28px
- **Navigation Labels:** Medium weight, size 14-15px  
- **Verse Numbers:** Smaller, muted, size 13-14px, positioned as superscript or inline prefix
- **UI Labels:** Regular weight, size 13-14px

### Font Families
- **Primary (Body):** Inter or Source Serif Pro for verse text (serif improves reading comfort)
- **UI/Navigation:** Inter or System UI font
- **Limit:** 2 font families maximum

### Reading Optimization
- Line height: 1.7-1.8 for verse text
- Paragraph spacing: Generous (1.5-2rem between verses)
- Max width for verse content: 680-720px for optimal readability

---

## Layout System

### Spacing Primitives
**Tailwind Units:** 2, 4, 6, 8, 12, 16, 20
- Micro spacing (icons, buttons): 2, 4
- Component padding: 4, 6, 8
- Section spacing: 12, 16, 20
- Major layout gaps: 16, 20

### Grid Structure
- **Sidebar:** Fixed 280px (desktop), full overlay (mobile)
- **Content Area:** Fluid with max-width constraint
- **Chapter Carousel:** Horizontal scroll with snap points
- **Verse Layout:** Single column, left-aligned with hanging verse numbers

---

## Component Library

### Navigation Components
**Top Bar:**
- Logo/title left-aligned
- Search, bookmarks, share, theme toggle right-aligned
- Height: 64px
- Sticky position
- Subtle bottom border separator

**Sidebar:**
- Collapsible on mobile (overlay)
- Testament tabs at top
- Collapsible book categories (accordion pattern)
- Chapter grid/list under selected book
- Smooth transitions (200-300ms)

**Chapter Carousel:**
- Horizontal scrollable strip
- Chapter numbers as pills/chips
- Active chapter: filled background
- Inactive: outlined or ghost style
- Smooth scroll to active on load

### Content Components
**Verse Display:**
- Each verse as discrete block
- Verse number: superscript or inline prefix, muted
- Clickable interaction area
- Hover state: subtle background change
- Active/selected: persistent highlight

**Verse Context Menu:**
- Compact popover triggered on verse click
- Actions: Bookmark, Share, Play Audio
- Position: Smart positioning (flip above/below based on viewport)
- Icons with labels for clarity
- Dismissible on outside click

**Share Menu:**
- Secondary popover from context menu
- Options: Facebook, Twitter, WhatsApp, Copy
- Icons for each platform
- Success feedback for copy action (checkmark)

**Bookmarks Panel:**
- Slide-in panel from right (desktop) or bottom (mobile)
- List format with book name, chapter, verse number, preview text
- Timestamp for context
- Quick navigation on click
- Delete action per bookmark

### Form Elements
**Search Bar:**
- Prominent placement in header
- Icon prefix (magnifying glass)
- Placeholder: "Buscar en la Biblia..."
- Live search with debounce
- Clear button when active

### Interactive Elements
**Buttons:**
- Primary: For main actions (solid fill)
- Secondary: For auxiliary actions (outlined)
- Ghost: For menu items
- Icon buttons: Circular, 40px touch target minimum
- All states: Default, hover (subtle scale/brightness), active (slight press effect)

**Toggle Switches:**
- Theme switcher: Sun/Moon icons
- Smooth transition between states

---

## Dark/Light Mode Implementation

**Mode Toggle:** Prominent sun/moon icon button in header

**Dark Mode (Default):**
- Ensure WCAG AA contrast for all text
- Subtle borders to define sections
- Muted highlights to reduce eye strain

**Light Mode:**
- Higher contrast for readability in bright environments
- Warm tones for comfortable reading

**Consistent Elements Across Modes:**
- Same spacing, sizing, and layout
- Icons adapt to theme
- Smooth fade transition (200ms) on mode switch

---

## Interactions & Micro-animations

**Minimize Animations:**
- Sidebar slide: 250ms ease-out
- Popovers: 150ms fade + slight translate
- Chapter scroll: Smooth native scroll behavior
- No decorative animations for verse text
- Focus indicators: Instant, no animation

**Audio Playback:**
- Play/Pause icon toggle
- Subtle pulse animation on active verse during playback
- Duration: Match audio length or timeout after 5 seconds

---

## Accessibility

- Keyboard navigation: Tab through all interactive elements
- Focus indicators: Clear 2px outline
- ARIA labels for icon-only buttons
- Screen reader announcements for context menu actions
- Touch targets: Minimum 44x44px
- Color is not the only indicator (use icons + text)

---

## Responsive Breakpoints

- **Mobile:** < 768px - Overlay sidebar, vertical chapter list, single-column verse layout
- **Tablet:** 768px - 1024px - Collapsible sidebar, horizontal chapter carousel
- **Desktop:** > 1024px - Persistent sidebar, full layout

---

## Images

**No hero images required** - This is a utility application focused on text content.

**Icons Only:**
- Use Lucide React (already in code) for all UI icons
- Consistent 20-24px sizing
- Stroke width: 2px

---

**Summary:** A clean, distraction-free Bible reading experience optimized for long-form content consumption with thoughtful organization, intuitive navigation, and comfort-focused typography. Every design decision prioritizes readability and ease of use.