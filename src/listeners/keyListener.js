import React, { useState, useEffect } from "react";

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
      console.log(key == targetSequence[currentKeyIndex]);
      // Drop physics 2 if a specific sequence is hit
      if (key == targetSequence[currentKeyIndex]) {
        currentKeyIndex += 1;
      } else {
        currentKeyIndex = 0;
      }
      if (currentKeyIndex == targetSequence.length) {
        currentKeyIndex = 0;
      }
      console.log(currentKeyIndex);
      console.log(e);
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

export default KeyboardListener;
