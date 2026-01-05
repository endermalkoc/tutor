# Photography & Imagery Guidelines

**Version**: 1.0
**Last Updated**: 2026-01-04

---

## Overview

Photography in our tutoring management platform should feel **authentic**, **diverse**, and **warm**—reflecting real educational moments without being overly staged or stock-photo generic.

**Goal**: Build trust and connection through imagery that represents our users and their experiences.

---

## Photography Style

### Core Principles

1. **Natural & Authentic**
   - Real moments over posed shots
   - Natural lighting preferred
   - Candid expressions
   - Genuine interactions

2. **Diverse & Inclusive**
   - Represent various ethnicities, ages, abilities
   - Mix of genders and family structures
   - Different learning environments
   - Inclusive of all learners

3. **Warm & Welcoming**
   - Slightly warm color temperature (+5 to +10)
   - Soft, approachable feel
   - Inviting, not intimidating
   - Comfortable, not clinical

4. **Educational Context**
   - Learning environments (homes, libraries, classrooms)
   - Books, materials, technology
   - One-on-one tutoring sessions
   - Family involvement

---

## Photo Characteristics

### Lighting

✅ **Preferred**:
- Natural window light
- Soft diffused lighting
- Warm, even illumination
- Avoids harsh shadows

❌ **Avoid**:
- Harsh direct sunlight
- Heavy artificial lighting
- Dramatic shadows
- Overly dark or bright

### Composition

✅ **Preferred**:
- Subject in focus, background slightly blurred
- Rule of thirds
- Negative space for text overlay
- Eye-level or slightly above

❌ **Avoid**:
- Cluttered backgrounds
- Distracting elements
- Awkward cropping
- Extreme angles

### Subject Matter

✅ **Preferred**:
- Students engaged in learning
- Tutors teaching with focus
- Families involved in education
- Learning materials and technology
- Comfortable, natural environments

❌ **Avoid**:
- Overly posed "stock photo" expressions
- Distracting backgrounds
- Overly sterile/clinical settings
- Cheesy "thumbs up" poses

---

## Photo Processing

### Color Adjustments

```
Saturation: -10 to -20 (slightly desaturated)
Temperature: +5 to +10 (warm)
Contrast: Moderate (not harsh)
Brightness: Adjust for subject clarity
```

**Why desaturated?**
- More professional, less "stock photo"
- Maintains focus on content, not vibrant colors
- Consistent with minimalist design philosophy

**Why warm?**
- Inviting and approachable
- Aligns with "family trust" brand principle
- Creates comfort and connection

### Editing Guidelines

✅ **DO**:
- Adjust exposure for clarity
- Correct white balance
- Remove distracting elements
- Crop to improve composition
- Sharpen moderately

❌ **DON'T**:
- Apply heavy filters
- Over-saturate colors
- Add artificial effects (vignettes, light leaks)
- Over-sharpen
- Heavily manipulate reality

---

## Image Formats & Sizes

### Aspect Ratios

| Use Case | Aspect Ratio | Example Size |
|----------|--------------|--------------|
| **Hero Images** | 16:9 | 1920×1080px |
| **Card Images** | 4:3 | 800×600px |
| **Avatars** | 1:1 | 256×256px |
| **Portrait Cards** | 3:4 | 600×800px |
| **Wide Cards** | 3:2 | 900×600px |

### File Specifications

**Format**: JPEG (photos), PNG (with transparency needs)

**Quality**: 80-90% (balance quality & file size)

**Optimization**: Always compress for web

**Naming**: `photo-{context}-{description}.jpg`
- Example: `photo-hero-student-tutoring.jpg`
- Example: `photo-card-family-learning.jpg`

---

## Avatar Standards

### Requirements

1. **Aspect Ratio**: 1:1 (square)
2. **Composition**:
   - Centered face
   - Shoulders and up
   - Neutral or slightly blurred background
3. **Lighting**: Good, even lighting on face
4. **Expression**: Friendly, approachable
5. **Size**: 256×256px minimum (scale down as needed)

### Avatar Sizes

```css
/* Avatar size scale */
--avatar-xs: 32px;   /* Table rows, inline mentions */
--avatar-sm: 48px;   /* Small cards, list items */
--avatar-md: 64px;   /* Default cards */
--avatar-lg: 96px;   /* Profile headers */
--avatar-xl: 128px;  /* Profile pages, modals */
```

### Avatar Styling

```css
.avatar {
  width: var(--avatar-md);
  height: var(--avatar-md);
  border-radius: 50%; /* Circular */
  border: 2px solid #e2e8f0; /* Optional subtle border */
  object-fit: cover;
}

.avatar:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}
```

### Placeholder Avatars

When no photo available:

```html
<div class="avatar-placeholder">
  <svg width="64" height="64" viewBox="0 0 64 64">
    <!-- User icon (from icon-system.md) -->
    <circle cx="32" cy="24" r="10" stroke="#94a3b8" stroke-width="2" fill="none"/>
    <path d="M16 56C16 48 22 44 32 44C42 44 48 48 48 56" stroke="#94a3b8" stroke-width="2" fill="none"/>
  </svg>
</div>
```

```css
.avatar-placeholder {
  width: var(--avatar-md);
  height: var(--avatar-md);
  border-radius: 50%;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## Image Treatment

### Border Radius

All images should use consistent border radius:

```css
/* Standard images (cards, thumbnails) */
.image {
  border-radius: 12px;
}

/* Avatars */
.avatar {
  border-radius: 50%; /* Circular */
}

/* Hero images */
.hero-image {
  border-radius: 16px; /* Larger elements */
}
```

### Shadows

```css
/* Default image shadow */
.image {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Hover state */
.image:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s;
}
```

### Overlay for Text

When placing text over images:

```css
.image-with-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%);
  border-radius: 12px;
}

.image-text {
  position: relative;
  z-index: 1;
  color: white;
}
```

---

## Accessibility

### Alt Text

**Always provide meaningful alt text**:

```html
<!-- Good -->
<img
  src="photo-tutor-student.jpg"
  alt="Tutor working one-on-one with student at a desk with learning materials"
>

<!-- Bad -->
<img src="photo-tutor-student.jpg" alt="Image">
<img src="photo-tutor-student.jpg" alt="">
```

**Alt text guidelines**:
- Describe what's happening, not just what's visible
- Include relevant context
- Keep concise (< 150 characters)
- Don't start with "Image of..." or "Picture of..."

### Decorative Images

If truly decorative (rare):
```html
<img src="decorative.jpg" alt="" aria-hidden="true">
```

### Text Over Images

Ensure sufficient contrast (WCAG AA: 4.5:1):
- Use dark overlay for light images
- Use light overlay for dark images
- Test contrast ratio

---

## Usage Examples

### Card with Image

```html
<div class="card">
  <img
    src="photo-card-student.jpg"
    alt="Student reading a book at desk"
    class="card-image"
  >
  <div class="card-content">
    <h3>John Doe</h3>
    <p>Grade 10 • Mathematics, Science</p>
  </div>
</div>

<style>
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}
</style>
```

### Hero Section with Image

```html
<section class="hero">
  <img
    src="photo-hero-learning.jpg"
    alt="Tutor and student collaborating over a laptop"
    class="hero-image"
  >
  <div class="hero-content">
    <h1>Welcome to Tutoring Management</h1>
    <p>Streamline your tutoring business</p>
    <button class="btn btn-primary">Get Started</button>
  </div>
</section>
```

### Avatar in Profile

```html
<div class="profile-header">
  <img
    src="photo-avatar-jane-doe.jpg"
    alt="Jane Doe's profile photo"
    class="avatar avatar-lg"
  >
  <div class="profile-info">
    <h2>Jane Doe</h2>
    <p>Math & Science Tutor</p>
  </div>
</div>
```

---

## Do's and Don'ts

### ✅ DO:

- Use diverse, inclusive representation
- Show authentic learning moments
- Maintain consistent aspect ratios
- Optimize images for web (compress)
- Provide descriptive alt text
- Use warm, natural lighting
- Apply subtle color processing
- Show comfortable, real environments

### ❌ DON'T:

- Use overly staged stock photos
- Mix photo styles (B&W + color)
- Use low quality or pixelated images
- Forget accessibility (alt text)
- Over-saturate or heavily filter
- Use images without proper licensing
- Show only one demographic
- Use distracting or cluttered backgrounds

---

## Sourcing Guidelines

### Stock Photography Sources

If using stock photos, prefer:

1. **Unsplash** (https://unsplash.com)
   - Free, high quality
   - Diverse selection
   - Verify license before use

2. **Pexels** (https://pexels.com)
   - Free stock photos and videos
   - Good for educational imagery

3. **iStock / Adobe Stock**
   - Paid, professional quality
   - Search: "authentic education", "tutoring", "family learning"

### Search Terms

**Recommended**:
- "authentic tutoring"
- "one-on-one learning"
- "student studying naturally"
- "diverse students"
- "family learning together"
- "home education"

**Avoid**:
- "perfect students"
- "corporate education"
- "posed classroom"

### Licensing

Always verify:
- ✅ Commercial use allowed
- ✅ Attribution requirements (if any)
- ✅ Modification allowed
- ✅ No editorial restrictions

---

## Image Optimization

### Before Publishing

1. **Resize** to appropriate dimensions
2. **Compress** using tools like TinyPNG, ImageOptim
3. **Format** as JPEG (photos) or WebP (modern browsers)
4. **Name** descriptively and consistently
5. **Add alt text** in HTML

### Optimization Tools

- **TinyPNG** - JPEG/PNG compression
- **ImageOptim** (Mac) - Lossless optimization
- **Squoosh** (Web) - Modern formats, manual control
- **Sharp** (Node.js) - Automated processing

### Target File Sizes

| Image Type | Target Size |
|------------|-------------|
| Avatar (256×256) | < 30KB |
| Card image (800×600) | < 100KB |
| Hero image (1920×1080) | < 250KB |

---

## Responsive Images

### HTML Picture Element

```html
<picture>
  <!-- Mobile -->
  <source
    media="(max-width: 768px)"
    srcset="photo-mobile.jpg"
  >
  <!-- Tablet -->
  <source
    media="(max-width: 1024px)"
    srcset="photo-tablet.jpg"
  >
  <!-- Desktop -->
  <img
    src="photo-desktop.jpg"
    alt="Descriptive alt text"
  >
</picture>
```

### Srcset for Resolution

```html
<img
  src="photo.jpg"
  srcset="photo.jpg 1x, photo@2x.jpg 2x"
  alt="Descriptive alt text"
>
```

---

## Review Checklist

Before publishing a photo:

- [ ] Authentic, not overly staged
- [ ] Diverse and inclusive representation
- [ ] Natural, warm lighting
- [ ] Appropriate for educational context
- [ ] Proper aspect ratio for use case
- [ ] Optimized file size (< target KB)
- [ ] Descriptive alt text provided
- [ ] Proper licensing verified
- [ ] Consistent with brand style
- [ ] Background not distracting
- [ ] Cropped and composed well
- [ ] Color processing applied (desaturated, warm)

---

## Version History

- **1.0** (2026-01-04): Initial photography guidelines
  - Defined natural, diverse, warm style
  - Established aspect ratios and sizes
  - Created avatar standards
  - Documented processing guidelines
  - Provided sourcing and optimization guidance
