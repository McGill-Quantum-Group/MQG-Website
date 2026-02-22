import { Clock, Link, MapPin, X } from "lucide-react";
import { useState } from "react";

function EventModal({ isOpen, onClose, allEventInfo }) {
  // Do nothing if the modal shouldnt be open yet
  if (!isOpen || !allEventInfo) return null;
  const rawDate = new Date(allEventInfo.date);
  const displayDate = rawDate.toLocaleString();

  // Sub-component to handle individual image loading
  const EventImage = ({ src }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Show spinner if image hasn't loaded yet */}
        {!isLoaded && (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "20vh",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div className="loader spin" />
              <h1
                style={{
                  color: "black",
                  marginTop: "20px",
                  marginBottom: "0px",
                }}
              >
                Loading image...
              </h1>
            </div>
          </div>
        )}

        <img
          className={`eventImage ${isLoaded ? "opacity-100" : "opacity-0"}`}
          src={src}
          alt="Event"
          onLoad={() => setIsLoaded(true)}
          style={{ transition: "opacity 0.3s ease-in-out" }}
        />
      </div>
    );
  };

  return (
    <div
      className="modalOverlay animateModal"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="eventInfo"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>{allEventInfo.title}</h1>
          <div
            style={{
              position: "relative",
              textAlign: "right",
              cursor: "pointer",
            }}
            onClick={() => {
              onClose();
            }}
          >
            <X size={48} color="black" />
          </div>
        </div>
        {allEventInfo.location != null ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MapPin size={24} color="black" />
            <p>{allEventInfo.location}</p>
          </div>
        ) : (
          <div />
        )}
        {allEventInfo.date != null ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Clock size={24} color="black" />
            <p>{displayDate}</p>
          </div>
        ) : (
          <div />
        )}
        <p>{allEventInfo.description}</p>
        <div style={{ display: "flex" }}>
          {allEventInfo.images.map((img, index) => (
            <EventImage
              className="eventImage"
              key={index}
              src={img}
            ></EventImage>
          ))}
        </div>

        {allEventInfo.extras != null && allEventInfo.extras.length > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <Link size={24} color="black" style={{ marginTop: "2px" }} />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <span style={{ fontWeight: "bold" }}>Learn more!</span>
              {allEventInfo.extras.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ wordBreak: "break-all" }} // Prevents long URLs from breaking the modal width
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default EventModal;
