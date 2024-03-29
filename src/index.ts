//eslint-disable-next-line
import { greetUser } from '$utils/greet';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.Webflow ||= [];
window.Webflow.push(() => {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const name = 'Rivard';
  greetUser(name);

  const light = document.querySelector('.lights');

  const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  timeline
    .fromTo(
      light,
      { transform: 'translateX(0%)', opacity: 0 },
      {
        transform: 'translateX(4500%)',
        opacity: 1,
        duration: 1.5,
        ease: 'none',
        opacityEase: 'power1.inOut',
        opacityDuration: 0.1,
      }
    )
    .to(light, { opacity: 0, duration: 0.25, ease: 'none', immediateRender: false }, '-=0.25');

  // Select the element with the class 'svg-header'
  const svgHeader = document.querySelector('.svg-header');

  // Create a GSAP animation for infinite rotation
  gsap.to(svgHeader, {
    rotation: 360, // Rotate by 360 degrees
    duration: 10, // Duration of one full rotation (in seconds)
    ease: 'none', // Linear rotation (constant speed)
    repeat: -1, // Infinite repetition
  });

  const cursor = document.querySelector('.cursor');
  const hoverItem = document.querySelector('#hover-item');
  let isMouseMoving = false; // Flag to track mouse movement
  let mouseX = 0;
  let mouseY = 0;

  // Constants for proximity and scaling
  const maxDistance = 75; // Maximum distance at which scaling starts
  const maxScale = 12.5; // Maximum scale when cursor is over hover-item

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMouseMoving) {
      isMouseMoving = true;
      requestAnimationFrame(updateCursor);
    }
  });

  function updateCursor() {
    // Check if the multi-form22_component modal is present and visible
    const modal = document.querySelector('.multi-form22_component');
    if (modal && modal.style.display !== 'none') {
      return; // Exit the function if the modal is open and visible
    }

    // Existing cursor update logic
    const hoverItemRect = hoverItem.getBoundingClientRect();
    const dist = distanceToPoint(mouseX, mouseY, hoverItemRect);
    const scale = calculateScale(dist, maxDistance, maxScale);

    // Calculate cursor position based on scroll position
    const cursorX = mouseX + window.scrollX;
    const cursorY = mouseY + window.scrollY;

    // Hide the default cursor when the custom cursor is active
    if (scale > 1) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }

    cursor.style.opacity = scale > 1 ? 1 : 0;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(${scale})`;

    if (!isMouseMoving) {
      return;
    }
    requestAnimationFrame(updateCursor);
  }

  function distanceToPoint(x, y, rect) {
    const dx = Math.max(rect.left - x, 0, x - rect.right);
    const dy = Math.max(rect.top - y, 0, y - rect.bottom);
    return Math.sqrt(dx * dx + dy * dy);
  }

  function calculateScale(distance, maxDistance, maxScale) {
    if (distance > maxDistance) return 1;
    return 1 + ((maxScale - 1) * (maxDistance - distance)) / maxDistance;
  }

  function closeModal() {
    const modal = document.querySelector('.multi-form22_component');
    modal.style.display = 'none';
    requestAnimationFrame(updateCursor);
  }

  // Attach event listener for closing the modal
  document.querySelector('.multi-form22_close-button').addEventListener('click', closeModal);
});
