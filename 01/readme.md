# VSQH01_1 - Infinite 3D Slider

A 3D infinite slider component using GSAP. Made with ❤️ by Quentin Hocdé for VSGOODS.

## 📖 Two Ways to Use This Effect

### Option 1: Custom Integration (Advanced)

If you're comfortable with code and want full control:

- Check out the **`/example`** folder
- It contains all the source files (`script.js`, `vsqh.css`, `utils/`)
- Copy and adapt them to fit your project's architecture

This option gives you more flexibility to customize animations, styles, and behavior.

### Option 2: As a Module

The simplest way to integrate this effect:

1. Import the **GSAP dependencies** (from CDN)
2. Import the **minified script** (`vsqh01-1.min.js`)
3. Add the **HTML structure**
4. Done! ✨

> 💡 **CSS is automatically injected** by the script — no separate stylesheet needed.

→ Follow the [Quick Integration](#-quick-integration) guide below.

---

## 🚀 Quick Integration

### 1. Include GSAP Dependencies

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/Draggable.min.js"></script>
```

### 2. Include the VSQH01_1 Module

```html
<!-- From a CDN -->
<script src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01/01/dist/vsqh01-1.min.js"></script>

<!-- Or locally -->
<script src="dist/vsqh01-1.min.js"></script>
```

### 3. Add the HTML

```html
<vsqh01-1-slider class="vsqh01-1-slider">
  <div class="vsqh01-1-slider_track">
    <!-- Slider Images (minimum 5 slides, must be duplicated) -->
    <ul class="vsqh01-1-slider_list">
      <li
        style="background-image: url('https://picsum.photos/id/1067/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/1062/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/164/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/429/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/1042/800/1200')"></li>
      <!-- Duplicate your slides for seamless loop -->
      <li
        style="background-image: url('https://picsum.photos/id/1067/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/1062/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/164/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/429/800/1200')"></li>
      <li
        style="background-image: url('https://picsum.photos/id/1042/800/1200')"></li>
    </ul>

    <!-- Navigation Buttons (optional, hidden by default) -->
    <div class="vsqh01-1-actions">
      <button class="prev">Prev</button>
      <button class="next">Next</button>
    </div>

    <!-- Titles (must be duplicated like images) -->
    <ul class="vsqh01-1-slider_content">
      <li>Brutalist Tower</li>
      <li>Spiral Stairs</li>
      <li>Concrete Pillars</li>
      <li>Sacred Dome</li>
      <li>Grid Windows</li>
      <!-- Duplicate your titles -->
      <li>Brutalist Tower</li>
      <li>Spiral Stairs</li>
      <li>Concrete Pillars</li>
      <li>Sacred Dome</li>
      <li>Grid Windows</li>
    </ul>
  </div>

  <div class="vsqh01-1-drag-proxy"></div>
</vsqh01-1-slider>
```

**That's it!** The module auto-initializes on page load.

---

## ⚙️ Options

You can customize the slider behavior using data attributes on the `vsqh01-1-slider` element:

| Attribute                 | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `data-disable-fullscreen` | Disables fullscreen pin mode. The slider scrolls with the page. |

---

## 📦 Webflow Integration

### Step 1: Add the Scripts

In **Project Settings > Custom Code > Footer Code**, add:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01/01/dist/vsqh01-1.min.js"></script>
```

### Step 2: Create the HTML Structure

Create the following structure in Webflow:

```
Div Block (tag: vsqh01-1-slider, class: vsqh01-1-slider)
├── Div (class: vsqh01-1-slider_track)
│   ├── List (class: vsqh01-1-slider_list)
│   │   ├── List Item (background-image inline style)
│   │   ├── List Item ...
│   │   └── (min 5 items, duplicated)
│   │
│   ├── Div (class: vsqh01-1-actions) [optional]
│   │   ├── Button (class: prev)
│   │   └── Button (class: next)
│   │
│   └── List (class: vsqh01-1-slider_content)
│       ├── List Item (title text)
│       └── (duplicated like images)
│
└── Div (class: vsqh01-1-drag-proxy)
```

> 💡 **Tip**: In Webflow, use an Embed element with custom HTML tag `vsqh01-1-slider` for the wrapper, or use a Div Block and change the tag in settings.

### Step 3: Publish

That's all! The slider will work automatically.

---

## 📝 Important Notes

1. **Minimum 5 slides** required for the seamless loop to work properly
2. Images AND titles must be **duplicated** for seamless looping
3. CSS is automatically injected by the script
4. The wrapper element uses a custom tag `<vsqh01-1-slider>` with class `vsqh01-1-slider`

---

## 🎨 CSS Customization

Styles are injected automatically, but you can override them:

```css
/* Example: change background color */
.vsqh01-1-slider_track {
  background-color: #dddddd;
  color: #1a1a1a;
}

/* Example: customize titles */
.vsqh01-1-slider_content {
  font-family: 'Your Font', sans-serif;
  font-size: 4vw;
}

/* Example: change slider dimensions */
.vsqh01-1-slider {
  height: 80vh; /* instead of 100vh */
}
```

---

## 🏗️ HTML Structure Reference

```
vsqh01-1-slider.vsqh01-1-slider     → Main wrapper (custom element)
├── .vsqh01-1-slider_track          → Inner container (pinned in fullscreen mode)
│   ├── .vsqh01-1-slider_list       → Images container
│   │   └── li                      → Image slides (background-image)
│   ├── .vsqh01-1-actions           → Navigation buttons (hidden by default)
│   │   ├── .prev                   → Previous button
│   │   └── .next                   → Next button
│   └── .vsqh01-1-slider_content    → Titles container
│       └── li                      → Title slides
└── .vsqh01-1-drag-proxy            → Invisible drag target
```
