gsap.registerPlugin(ScrollTrigger, Draggable);

let iteration = 0;

const spacing = 0.18,
  snapTime = gsap.utils.snap(spacing),
  items = gsap.utils.toArray('.vsqh01-1-slider_list li'),
  titles = gsap.utils.toArray('.vsqh01-1-slider_content li'),
  itemWidth = items[0].offsetWidth,
  titleHeight = titles[0].offsetHeight;

const splitLines = Array.from(titles).map(
  (line) => new SplitText(line, { type: 'chars' }),
);

splitLines.forEach((split, index) => {
  gsap.set(split.chars, {
    rotationX: 90,
  });
});

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
      rotateY: -85,
    })
    .to(element, {
      rotateY: 0,
      duration: 0.5,
      ease: 'power1.in',
    })
    .to(element, {
      rotateY: -70,
      duration: 0.5,
      ease: 'power1.out',
    });

  tl.add(rotationTL, 0);

  // Animation 2
  // Different animation for the z axis, blur and opacity, to simulate the circle effect
  const circleMovementTL = gsap.timeline();
  circleMovementTL
    .set(element, {
      z: itemWidth * 4,
      filter: 'blur(8px)',
      opacity: 0,
    })
    .to(
      element,
      {
        z: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.5,
        ease: 'power1.out',
      },
      0,
    )
    .to(
      element,
      {
        z: -itemWidth * 4,
        filter: 'blur(8px)',
        opacity: 0,
        duration: 0.5,
        ease: 'power1.in',
      },
      0.5,
    );

  tl.add(circleMovementTL, 0);

  const titleTl = gsap.timeline();
  titleTl.fromTo(
    splitLines[index].chars,
    { rotationX: 90 },
    {
      rotationX: -90,
      duration: 0.3,
      ease: 'none',
      transformOrigin: `center center ${titleHeight / 3}px`,
    },
    0.35,
  );

  tl.add(titleTl, 0);

  return tl;
}

const seamlessLoop = buildSeamlessLoop(items, spacing, animateFunc);
const playhead = { offset: 0 };
const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

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

const trigger = ScrollTrigger.create({
  start: 0,
  // Infinite scroll loop: teleport to opposite edge when reaching boundaries
  onUpdate(self) {
    let scroll = self.scroll();
    if (scroll > self.end - 1) {
      shiftScrollIteration(1, 1);
    } else if (scroll < 1 && self.direction < 0) {
      shiftScrollIteration(-1, self.end - 2);
    } else {
      scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
      scrub.invalidate().restart();
    }
  },
  end: `+=${items.length * 1000}`,
  pin: '.vsqh01-1-slider',
});

// Snap to closest item when scrolling ends
ScrollTrigger.addEventListener('scrollEnd', () =>
  scrollToOffset(scrub.vars.offset),
);

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
  trigger: '.vsqh01-1-slider',
  onPress() {
    this.startOffset = scrub.vars.offset;
  },
  onDrag() {
    scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
    scrub.invalidate().restart();
  },
  onDragEnd() {
    scrollToOffset(scrub.vars.offset);
  },
});
