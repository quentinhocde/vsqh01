# VSQH01_1 - Infinite 3D Slider

A 3D infinite slider component using GSAP. Made with ♥︎ by Quentin Hocdé for VSGOODS.

> **This effect is designed to run fullscreen by default,**  
> but you can also integrate it inside an existing page (non-fullscreen)  
> by adding the `data-disable-fullscreen` attribute to the root element:

```html
<vsqh01-1-slider class="vsqh01-1-slider" data-disable-fullscreen>
  ...
</vsqh01-1-slider>
```

This will sync the animation to your page scroll, without taking over fullscreen.

## 📖 Two Ways to Use This Effect

### Option 1: Custom Integration (Advanced, but more flexible)

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
4. Enjoy! ✨

> 💡 **CSS is automatically injected** by the script — no separate stylesheet needed.

→ Follow the [Quick Integration](#-quick-integration) guide below.

---

## ⚙️ Options

You can customize the slider behavior using data attributes on the `vsqh01-1-slider` element:

| Attribute                 | Description                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
| `data-disable-fullscreen` | Disables fullscreen pin mode. The slider scrolls with the page.            |
| `data-disable-magnet`     | Disables snap to closest slide after scroll/drag ends.                     |
| `data-scroll-ratio="1"`   | Scroll speed multiplier. `2` = 2× faster, `0.5` = 2× slower. Default: `1`. |
| `data-drag-ratio="1"`     | Drag speed multiplier. `2` = 2× faster, `0.5` = 2× slower. Default: `1`.   |

### Example with options

```html
<vsqh01-1-slider
  class="vsqh01-1-slider"
  data-scroll-ratio="1.5"
  data-drag-ratio="0.8"
  data-disable-magnet>
  ...
</vsqh01-1-slider>
```

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
<script src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/dist/vsqh01-1.min.js"></script>

<!-- Or locally -->
<script src="dist/vsqh01-1.min.js"></script>
```

### 3. Add the HTML

```html
<vsqh01-1-slider class="vsqh01-1-slider">
  <div class="vsqh01-1-slider_track">
    <!-- Slider Images (minimum 9 slides) -->
    <!-- Use data-src for lazy loading -->
    <ul class="vsqh01-1-slider_list">
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/01.jpg"
          alt="Image 01" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/02.jpg"
          alt="Image 02" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/03.jpg"
          alt="Image 03" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/04.jpg"
          alt="Image 04" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/05.jpg"
          alt="Image 05" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/06.jpg"
          alt="Image 06" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/07.jpg"
          alt="Image 07" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/08.jpg"
          alt="Image 08" />
      </li>
      <li class="vsqh01-1-slider_card">
        <img
          data-src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/example/images/09.jpg"
          alt="Image 09" />
      </li>
    </ul>
  </div>
  <div class="vsqh01-1-drag-proxy"></div>
</vsqh01-1-slider>
```

**That's it!** The module auto-initializes on page load.

---

## 📦 Webflow Integration

### Step 1: Add the Scripts

In **Project Settings > Custom Code > Footer Code**, add:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/quentinhocde/vsqh01@0.1.0/01/dist/vsqh01-1.min.js"></script>
```

### Step 2: Create the HTML Structure

Create the following structure in Webflow:

```
Div Block (tag: vsqh01-1-slider, class: vsqh01-1-slider)
├── Div (class: vsqh01-1-slider_track)
│   └── List (class: vsqh01-1-slider_list)
│       ├── List Item (class: vsqh01-1-slider_card)
│       │   └── Image (data-src + alt as title)
│       ├── List Item (class: vsqh01-1-slider_card)
│       │   └── Image (data-src + alt as title)
│       └── ... (min 9 items)
│
└── Div (class: vsqh01-1-drag-proxy)
```

> 💡 **Tip**: In Webflow, use an Embed element with custom HTML tag `vsqh01-1-slider` for the wrapper, or use a Div Block and change the tag in settings.

> ⚠️ **Important**: Use `data-src` attribute instead of `src` for images.

### Step 3: Publish

That's all! The slider will work automatically.

---

## 📝 Important Notes

1. **Minimum 9 slides** required for the seamless loop to work properly (with default spacing of 0.18)
2. Each slide must have the class `vsqh01-1-slider_card`
3. Use `data-src` instead of `src` for lazy loading
4. The `alt` attribute is used as the slide title
5. CSS is automatically injected by the script
6. The wrapper element uses a custom tag `<vsqh01-1-slider>` with class `vsqh01-1-slider`

### Spacing & Minimum Images

If you customize the `spacing` value in the script, the minimum number of images required changes:

| Spacing | Minimum images |
| ------- | -------------- |
| 0.10    | 16             |
| 0.12    | 13             |
| 0.15    | 11             |
| 0.18    | 9 (default)    |
| 0.20    | 8              |
| 0.25    | 7              |
| 0.30    | 6              |
| 0.35    | 5              |
| 0.40    | 5              |
| 0.50    | 4              |

> **Rule of thumb:** Smaller spacing = more images needed, larger spacing = fewer images needed.  
> **Tip:** If you don't have enough unique images, you can simply duplicate your image HTML elements (e.g. `<li class="vsqh01-1-slider_card">` blocks) to reach the required number.

---

## 🏗️ HTML Structure Reference

```
vsqh01-1-slider.vsqh01-1-slider     → Main wrapper (custom element)
├── .vsqh01-1-slider_track          → Inner container (pinned in fullscreen mode)
│   └── .vsqh01-1-slider_list       → Images container
│       └── li.vsqh01-1-slider_card → Slide card
│           └── img[data-src, alt]  → Image (data-src for lazy load, alt for title)
└── .vsqh01-1-drag-proxy            → Invisible drag target
```
