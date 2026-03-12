const initGSAP = () => {
  console.log('initGSAP');
  console.log(gsap);
  //gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  gsap.registerPlugin(ScrollTrigger);

 /*  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    normalizeScroll: true,
    // THE FIX: This runs every single time the scroll moves
    onUpdate: (self) => {
      // self.progress is a value between 0 and 1 representing the total page journey
      gsap.to('.progress-bar', {
        scaleX: self.progress,
        duration: 0.05, // Tiny duration for maximum responsiveness
        ease: 'none',
      });
    },
  }); */

   const galleryTrack = document.querySelector('.gallery-track');
   if (!galleryTrack) return;
    gsap.to(galleryTrack, {
    x: () => -(galleryTrack.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '.gallery-section',
      start: "top top", // Pin when the top of the section hits the top of the viewport
      end: () => '+=' + galleryTrack.scrollWidth,
      pin: true,       // This creates the "sticky" effect
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });
};


document.addEventListener("DOMContentLoaded", initGSAP);
document.addEventListener('shopify:section:load', function(event) {
  if (event.detail.sectionId === '{{ section.id }}') {
    ScrollTrigger.getAll().forEach(t => t.kill()); // Clean up old triggers
    initGSAP(); // Re-initialize
  }
});