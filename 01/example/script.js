let iteration = 0;
const spacing = 0.18;

// DOM
const $slider = document.querySelector('.vsqh01-1-slider');
const $sliderTrack = document.querySelector('.vsqh01-1-slider_track');
const items = gsap.utils.toArray('.vsqh01-1-slider_card');
const images = gsap.utils.toArray('.vsqh01-1-slider_card img');

// Utils
const snapTime = gsap.utils.snap(spacing);

// Options via data-attributes
const disableMagnet =
  typeof $slider.dataset.disableMagnet == 'string' ? true : false;
const disableFullscreen =
  typeof $slider.dataset.disableFullscreen == 'string' ? true : false;
const scrollRatio =
  typeof $slider.dataset.scrollRatio == 'string'
    ? parseFloat($slider.dataset.scrollRatio)
    : 1;
const dragRatio =
  typeof $slider.dataset.dragRatio == 'string'
    ? parseFloat($slider.dataset.dragRatio)
    : 1;

gsap.registerPlugin(ScrollTrigger, Draggable);

// After all images are loaded, display the slider
async function init() {
  await loadImages(images);

  isInit = true;
  $slider.classList.add('is-init');
}

init();

// Animation function for each item
// Each animation duration is 1 second, and start at 0
function animateFunc(element, index) {
  const tl = gsap.timeline();

  // Set initial values
  gsap.set(element, {
    rotateY: -90,
    rotateX: -10,
    xPercent: 200,
    z: '100vw',
    zIndex: 100,
    '--relativeProgress': 0, // use in css for the dark overlay
  });

  // Main animation
  // Global animation from right to left
  tl.fromTo(
    element,
    { xPercent: 200 },
    {
      xPercent: -200,
      duration: 1,
      ease: 'power1.inOut',
      immediateRender: false,
    },
  );

  // Animation 1
  // Animation for the rotation on Y of items
  const rotationTL = gsap.timeline();
  rotationTL
    .to(element, {
      rotateY: 0,
      rotateX: 0,
      '--relativeProgress': 1,
      duration: 0.45,
      ease: 'power1.in',
    })
    .to(
      element,
      {
        rotateY: -70,
        rotateX: 10,
        '--relativeProgress': 0,
        duration: 0.45,
        ease: 'power1.out',
      },
      0.55,
    );

  tl.add(rotationTL, 0);

  // Animation 2
  // Different animation for the z axis, to simulate the circle effect
  const circleMovementTL = gsap.timeline();
  circleMovementTL
    .set(element, {
      z: '100vw',
      zIndex: 100,
    })
    .to(
      element,
      {
        z: 0,
        zIndex: 0,
        duration: 0.5,
        ease: 'power1.out',
      },
      0,
    )
    .to(
      element,
      {
        z: '-50vw',
        zIndex: -50,
        duration: 0.5,
        ease: 'power1.in',
      },
      0.5,
    );
  tl.add(circleMovementTL, 0);

  return tl;
}

const seamlessLoop = buildSeamlessLoop(items, spacing, animateFunc);
const playhead = { offset: 0 };
const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

// Offset added by drag in non-fullscreen mode (persists between scroll updates)
let dragOffset = 0;

// Intermediary tween that creates a smooth transition between user interactions and the animation.
const scrub = gsap.to(playhead, {
  offset: 0, // Target offset value (dynamically updated via scrub.vars.offset)
  onUpdate() {
    // On each frame, sync seamlessLoop's time with the current offset (wrapped between 0 and duration)
    seamlessLoop.time(wrapTime(playhead.offset));
  },
  duration: 0.4, // Easing duration — creates the inertia/gliding effect
  ease: 'power3', // Easing curve for a natural slow-down
  paused: true, // Starts paused, manually restarted via scrub.invalidate().restart()
});

let isInit = false;

// Main ScrollTrigger that synchronizes the slider animation (and its pinning) with the scroll position.
// In fullscreen mode, it pins and uses infinite looping logic.
// In non-fullscreen mode, it maps page scroll progress directly to the slider animation, plus any drag offset.
const trigger = ScrollTrigger.create({
  trigger: $sliderTrack, // Element that triggers the scroll animation
  start: disableFullscreen ? 'top bottom' : 'top top', // Where the trigger starts based on fullscreen mode
  end: disableFullscreen ? 'bottom top' : `+=${items.length * 1000}`, // Where the scroll effect ends
  pin: disableFullscreen ? false : $slider, // Only pin the slider in fullscreen mode
  onUpdate(self) {
    // Only allow updates if initialization is done
    if (!isInit) {
      return;
    }

    if (disableFullscreen) {
      // When fullscreen is disabled: scroll maps directly to the slider, plus additional offset from dragging
      scrub.vars.offset =
        self.progress * seamlessLoop.duration() * scrollRatio + dragOffset;
      scrub.invalidate().restart();
    } else {
      // Fullscreen mode: infinite scroll loop with teleportation
      let scroll = self.scroll() - self.start;
      let scrollRange = self.end - self.start;
      if (scroll > scrollRange - 1) {
        shiftScrollIteration(1, self.start + 1);
      } else if (scroll < 1 && self.direction < 0) {
        shiftScrollIteration(-1, self.start + scrollRange - 2);
      } else {
        scrub.vars.offset =
          (iteration + self.progress) * seamlessLoop.duration() * scrollRatio +
          dragOffset;
        scrub.invalidate().restart();
      }
    }
  },
});

// Snap to closest item when scrolling ends (only in fullscreen mode)
if (!disableFullscreen && !disableMagnet) {
  ScrollTrigger.addEventListener('scrollEnd', () => {
    if (isInit) {
      scrollToOffset(scrub.vars.offset);
    }
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    scrollToOffset(scrub.vars.offset + spacing);
  } else if (e.key === 'ArrowLeft') {
    scrollToOffset(scrub.vars.offset - spacing);
  }
});

// Dragging management
Draggable.create('.vsqh01-1-drag-proxy', {
  type: 'x',
  trigger: $slider,
  onPress() {
    this.startOffset = dragOffset;
  },
  onDrag() {
    const delta = (this.startX - this.x) * 0.001 * dragRatio;
    dragOffset = this.startOffset + delta;
    if (disableFullscreen) {
      scrub.vars.offset =
        trigger.progress * seamlessLoop.duration() * scrollRatio + dragOffset;
    } else {
      scrub.vars.offset =
        (iteration + trigger.progress) * seamlessLoop.duration() * scrollRatio +
        dragOffset;
    }
    scrub.invalidate().restart();
  },
  onDragEnd() {
    if (!disableMagnet) {
      scrollToOffset(scrub.vars.offset);
    }
  },
});
