import { Clock, Link, MapPin, X } from "lucide-react";
import EventImage from "./EventImage";

function EventModal({ isOpen, onClose, allEventInfo }) {
  // Do nothing if the modal shouldnt be open yet
  if (!isOpen || !allEventInfo) return null;

  const rawDate = new Date(allEventInfo.date);
  const displayDate = rawDate.toLocaleString();

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
            flexShrink: 0,
            paddingBottom: "10px",
            marginBottom: "10px"
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

        <div className="event-modal-scroll">
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
          <p style={{ whiteSpace: "pre-wrap" }}>{allEventInfo.description}</p>
          <div className="event-images-container">
            {allEventInfo.images.map((img, index) => (
              <EventImage key={index} src={img} className="eventImage" />
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
    </div>
  );
}

export default EventModal;
