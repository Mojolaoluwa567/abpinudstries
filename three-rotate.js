// Apply floating effect to all images in sync
function floatElementsInSync(elements, floatAmount, duration) {
  gsap.to(elements, {
    y: floatAmount,
    duration: duration,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  });
}

// Select all images
const images = document.querySelectorAll(".floating-image");

// Apply the floating animation in sync
floatElementsInSync(images, 30, 2.5);
