/**
 * Build Seamless Loop
 * Creates a seamless looping timeline from an array of items
 */
function buildSeamlessLoop(items, spacing, animateFunc) {
  let overlap = Math.ceil(1 / spacing),
    startTime = items.length * spacing + 0.5,
    loopTime = (items.length + overlap) * spacing + 1,
    rawSequence = gsap.timeline({ paused: true }),
    seamlessLoop = gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        this._time === this._dur && (this._tTime += this._dur - 0.01);
      },
    }),
    l = items.length + overlap * 2,
    time,
    i,
    index;

  for (i = 0; i < l; i++) {
    index = i % items.length;
    time = i * spacing;
    rawSequence.add(animateFunc(items[index], index), time);
    i <= items.length && seamlessLoop.add('label' + i, time);
  }

  rawSequence.time(startTime);
  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: 'none',
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: 'none',
      },
    );

  return seamlessLoop;
}

// Convert a progress value (0-1) to an actual scroll position
function progressToScroll(progress) {
  let scrollRange = trigger.end - trigger.start;
  return gsap.utils.clamp(
    trigger.start + 1,
    trigger.end - 1,
    trigger.start + gsap.utils.wrap(0, 1, progress) * scrollRange,
  );
}

// Shift to a new scroll iteration to simulate infinite scrolling.
// Updates the iteration counter and repositions the scroll to maintain seamless looping.
function shiftScrollIteration(iterationDelta, scrollTo) {
  iteration += iterationDelta;
  trigger.scroll(scrollTo);
  trigger.update();
}

// Moves the scroll playhead to the position that corresponds to the seamlessLoop time, and wraps if necessary.
function scrollToOffset(offset) {
  // In non-fullscreen mode, don't manipulate scroll - update dragOffset instead
  if (disableFullscreen) {
    let snappedOffset = snapTime(offset);
    // Calculate what dragOffset should be to achieve the snapped position
    dragOffset = snappedOffset - trigger.progress * seamlessLoop.duration();
    scrub.vars.offset = snappedOffset;
    scrub.invalidate().restart();
    return;
  }

  let snappedTime = snapTime(offset),
    progress =
      (snappedTime - seamlessLoop.duration() * iteration) /
      seamlessLoop.duration(),
    scroll = progressToScroll(progress);

  if (progress >= 1 || progress < 0) {
    return shiftScrollIteration(Math.floor(progress), scroll);
  }

  scrub.vars.offset = (iteration + trigger.progress) * seamlessLoop.duration();
  scrub.invalidate().restart();

  trigger.scroll(scroll);
  trigger.update();
}
