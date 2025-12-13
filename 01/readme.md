# VSQH01_1 - Infinite 3D Slider

A 3D slider component using GSAP.

## 🚀 Quick Integration

### 1. Include GSAP Dependencies

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/Draggable.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"></script>
```

### 2. Include the VSQH01_1 Module

```html
<!-- From a CDN (replace with your URL) -->
<script src="https://your-cdn.com/vsqh01-1.min.js"></script>

<!-- Or locally -->
<script src="dist/vsqh01-1.min.js"></script>
```

### 3. Add the HTML

```html
<section class="vsqh01-1-slider_wrap">
  <div class="vsqh01-1-slider">
    <!-- Slider Images (minimum 5 slides, must be duplicated) -->
    <ul class="vsqh01-1-slider_list">
      <li style="background-image: url('image1.jpg')"></li>
      <li style="background-image: url('image2.jpg')"></li>
      <li style="background-image: url('image3.jpg')"></li>
      <li style="background-image: url('image4.jpg')"></li>
      <li style="background-image: url('image5.jpg')"></li>
      <!-- Duplicate your slides for seamless loop -->
      <li style="background-image: url('image1.jpg')"></li>
      <li style="background-image: url('image2.jpg')"></li>
      <li style="background-image: url('image3.jpg')"></li>
      <li style="background-image: url('image4.jpg')"></li>
      <li style="background-image: url('image5.jpg')"></li>
    </ul>

    <!-- Navigation Buttons (optional, hidden by default) -->
    <div class="vsqh01-1-actions">
      <button class="prev">Prev</button>
      <button class="next">Next</button>
    </div>

    <!-- Titles (must be duplicated like images) -->
    <ul class="vsqh01-1-slider_content">
      <li>Title 1</li>
      <li>Title 2</li>
      <li>Title 3</li>
      <li>Title 4</li>
      <li>Title 5</li>
      <!-- Duplicate your titles -->
      <li>Title 1</li>
      <li>Title 2</li>
      <li>Title 3</li>
      <li>Title 4</li>
      <li>Title 5</li>
    </ul>
  </div>

  <div class="vsqh01-1-drag-proxy"></div>
</section>
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"></script>
<script src="https://your-cdn.com/vsqh01-1.min.js"></script>
```

### Step 2: Create the HTML Structure

Create the following structure in Webflow:

```
Section (class: vsqh01-1-slider_wrap)
├── Div (class: vsqh01-1-slider)
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

### Step 3: Publish

That's all! The slider will work automatically.

---

## ⚙️ Configuration Options

You can manually initialize with custom options:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.vsqh01-1-slider_wrap');
  const slider = new VSQH01_1.Slider(wrapper, {
    spacing: 0.18, // Spacing between items (default: 0.18)
    scrubDuration: 0.4, // Smooth scrolling duration (default: 0.4)
    scrubEase: 'power3', // Easing curve (default: 'power3')
  });
});
```

---

## 🎮 Public API

```javascript
// Get the instance
const slider = document.querySelector('.vsqh01-1-slider_wrap')._vsqh01-1Instance;

// Navigate
slider.next(); // Next slide
slider.prev(); // Previous slide

// Cleanup
slider.destroy(); // Destroy the slider
```

---

## 🔧 Build

```bash
# Non-minified build (for debugging)
npm run build

# Minified build (for production)
npm run build:minified
```

The file will be generated in `dist/vsqh01-1.min.js`.

---

## 📝 Important Notes

1. **SplitText** is a Club GSAP plugin (requires license for production use)
2. **Minimum 5 slides** required for the seamless loop to work properly
3. Images AND titles must be **duplicated** for seamless looping
4. CSS is automatically injected by the script
5. The slider uses scroll for navigation (infinite scroll)
6. Drag also works (horizontal drag)

---

## 🎨 CSS Customization

Styles are injected automatically, but you can override them:

```css
/* Example: change background color */
.vsqh01-1-slider {
  background-color: #dddddd;
  color: #1a1a1a;
}

/* Example: customize titles */
.vsqh01-1-slider_content {
  font-family: 'Your Font', sans-serif;
  font-size: 4vw;
}
```
