import { useState, useEffect } from "react";

export default function useScrollToBottom() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Stop at 50 px right before the bottom
    // Makes the blurred div disappear
    const handleScroll = (e) => {
      const target = e.target;
      // Only process scroll events for large containers (like our main scroll div)
      if (target && target.scrollHeight && target.clientHeight) {
        if (target.clientHeight < window.innerHeight * 0.5) return;

        const bottom = Math.ceil(target.clientHeight + target.scrollTop) >= target.scrollHeight - 50;
        setIsAtBottom(bottom);
      }
    };

    // Use capturing phase to catch scroll events from any nested container
    window.addEventListener('scroll', handleScroll, true);

    const checkState = () => {
      const scrollContainer = document.querySelector('[style*="overflowY: auto"], [style*="overflow-y: auto"]');
      if (scrollContainer) {
        const bottom = Math.ceil(scrollContainer.clientHeight + scrollContainer.scrollTop) >= scrollContainer.scrollHeight - 50;
        setIsAtBottom(bottom);
      }
    };

    // Check initial state after a short delay
    const timer = setTimeout(checkState, 500);

    // Add a ResizeObserver so that if images load late and expand the container,
    // we recalculate the scroll height dynamically!
    let resizeObserver = null;
    const scrollContainer = document.querySelector('[style*="overflowY: auto"], [style*="overflow-y: auto"]');
    if (scrollContainer && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => checkState());
      // Observe the inner content that actually expands
      resizeObserver.observe(scrollContainer.firstElementChild || scrollContainer);
    }

    // Make sure to clear the listener
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(timer);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return isAtBottom;
}
