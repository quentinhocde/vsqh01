gsap.registerPlugin(ScrollTrigger, Draggable);

let iteration = 0;

const spacing = 0.18,
  sliderTrack = document.querySelector('.vsqh01-1-slider_track'),
  slider = document.querySelector('.vsqh01-1-slider'),
  snapTime = gsap.utils.snap(spacing),
  items = gsap.utils.toArray('.vsqh01-1-slider_list li'),
  titles = gsap.utils.toArray('.vsqh01-1-slider_content li'),
  disableFullscreen =
    typeof slider.dataset.disableFullscreen == 'string' ? true : false,
  titleHeight = titles[0].offsetHeight;

// Animation function for each item
// Each animation duration is 1 second, and start at 0
function animateFunc(element, index) {
  const tl = gsap.timeline();

  // Main animation
  // Global animation from 0 to 100%
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
    .set(element, {
      rotateY: -90,
    })
    .to(element, {
      rotateY: 0,
      '--relativeProgress': 1,
      duration: 0.5,
      ease: 'power1.in',
    })
    .to(element, {
      rotateY: -70,
      '--relativeProgress': 0,
      duration: 0.5,
      ease: 'power1.out',
    });

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
        ease: 'power2.out',
      },
      0,
    )
    .to(
      element,
      {
        z: '-50vw',
        zIndex: -50,
        duration: 0.5,
        ease: 'power2.in',
      },
      0.5,
    );

  tl.add(circleMovementTL, 0);

  const titleTl = gsap.timeline();
  titleTl
    .set(titles[index], {
      rotationX: -90,
      transformOrigin: `center center ${-titleHeight / 3}px`,
    })
    .to(
      titles[index],
      {
        rotationX: 90,
        duration: 0.3,
        ease: 'none',
      },
      0.35,
    );

  tl.add(titleTl, 0);

  return tl;
}

const seamlessLoop = buildSeamlessLoop(items, spacing, animateFunc);
const playhead = { offset: 0 };
const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

// Offset added by drag in non-fullscreen mode (persists between scroll updates)
let dragOffset = 0;

// Intermediary tween that creates a smooth transition between user interactions and the animation.
// Instead of jumping directly to the new position, it eases the movement over 0.4s.
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
let trigger = null;

if (disableFullscreen) {
  // Fullscreen disabled: no pin, animation follows scroll through viewport
  trigger = ScrollTrigger.create({
    trigger: sliderTrack,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate(self) {
      if (!isInit) {
        initCallback();
        return;
      }
      // Map scroll progress to animation + dragOffset from user interaction
      scrub.vars.offset = self.progress * seamlessLoop.duration() + dragOffset;
      scrub.invalidate().restart();
    },
  });
} else {
  // Fullscreen mode: pin with infinite scroll
  trigger = ScrollTrigger.create({
    trigger: sliderTrack,
    start: 'top top',
    // Infinite scroll loop: teleport to opposite edge when reaching boundaries
    onUpdate(self) {
      if (!isInit) {
        initCallback();
        return;
      }
      // Calculate scroll relative to the trigger start position
      let scroll = self.scroll() - self.start;
      let scrollRange = self.end - self.start;
      if (scroll > scrollRange - 1) {
        shiftScrollIteration(1, self.start + 1);
      } else if (scroll < 1 && self.direction < 0) {
        shiftScrollIteration(-1, self.start + scrollRange - 2);
      } else {
        scrub.vars.offset =
          (iteration + self.progress) * seamlessLoop.duration();
        scrub.invalidate().restart();
      }
    },
    end: `+=${items.length * 1000}`,
    pin: slider,
  });

  // Snap to closest item when scrolling ends (only in fullscreen mode)
  ScrollTrigger.addEventListener('scrollEnd', () => {
    if (isInit) {
      scrollToOffset(scrub.vars.offset);
    }
  });
}

function initCallback() {
  isInit = true;

  gsap.delayedCall(0.3, () => {
    slider.classList.add('is-init');
  });
}

// Navigation buttons
document
  .querySelector('.next')
  .addEventListener('click', () => scrollToOffset(scrub.vars.offset + spacing));

document
  .querySelector('.prev')
  .addEventListener('click', () => scrollToOffset(scrub.vars.offset - spacing));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    scrollToOffset(scrub.vars.offset + spacing);
  } else if (e.key === 'ArrowLeft') {
    scrollToOffset(scrub.vars.offset - spacing);
  }
});

// Dragging functionality
Draggable.create('.vsqh01-1-drag-proxy', {
  type: 'x',
  trigger: slider,
  onPress() {
    this.startOffset = disableFullscreen ? dragOffset : scrub.vars.offset;
  },
  onDrag() {
    const delta = (this.startX - this.x) * 0.001;
    if (disableFullscreen) {
      // In non-fullscreen mode, update dragOffset which is added to scroll progress
      dragOffset = this.startOffset + delta;
      scrub.vars.offset =
        trigger.progress * seamlessLoop.duration() + dragOffset;
    } else {
      scrub.vars.offset = this.startOffset + delta;
    }
    scrub.invalidate().restart();
  },
  onDragEnd() {
    scrollToOffset(scrub.vars.offset);
  },
});
