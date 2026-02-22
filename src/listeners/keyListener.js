import { useEffect } from "react";

function KeyboardListener() {
  const targetSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    let currentKeyIndex = 0;

    const handleKeyDown = (e) => {
      const key = e.key;
      // Drop physics 2 if a specific sequence is hit
      if (key === targetSequence[currentKeyIndex]) {
        currentKeyIndex += 1;
      } else {
        currentKeyIndex = 0;
      }
      if (currentKeyIndex === targetSequence.length) {
        alert("Quantum mode activated!");
        currentKeyIndex = 0;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

export default KeyboardListener;
