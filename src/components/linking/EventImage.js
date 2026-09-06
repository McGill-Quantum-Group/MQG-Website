import React, { useState } from "react";

function EventImage({ src, className, alt = "Event Image" }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={className} style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
      {/* Loading Placeholder */}
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            minWidth: "200px",
            zIndex: 1
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="loader spin" style={{ borderColor: "rgba(0,0,0,0.1)", borderTopColor: "black" }} />
            <p
              style={{
                color: "black",
                marginTop: "10px",
                marginBottom: "0px",
                fontWeight: "bold",
                fontSize: "0.9em"
              }}
            >
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          transition: "opacity 0.3s ease-in-out",
          opacity: isLoaded ? 1 : 0,
          display: "block",
          height: "100%",
          width: "auto",
          borderRadius: "inherit",
          objectFit: "cover"
        }}
      />
    </div>
  );
}

export default EventImage;
