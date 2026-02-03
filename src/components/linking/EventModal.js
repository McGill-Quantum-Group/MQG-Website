import { MapPin } from "lucide-react";

function EventModal({ isOpen, onClose, allEventInfo }) {
  // Do nothing if the modal shouldnt be open yet
  if (!isOpen || !allEventInfo) return null;

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
          }}
        >
          <h1>{allEventInfo.title}</h1>
          <button
            style={{
              position: "relative",
              textAlign: "right",
            }}
            onClick={() => {
              onClose();
            }}
          >
            <h1>❌</h1>
          </button>
        </div>
        {allEventInfo.location != null ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MapPin size={24} color="black" />
            <p>{allEventInfo.location}</p>
          </div>
        ) : (
          <div />
        )}
        <p>{allEventInfo.description}</p>
        <div style={{ display: "flex" }}>
          {allEventInfo.images.map((img) => (
            <img className="eventImage" src={img}></img>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
