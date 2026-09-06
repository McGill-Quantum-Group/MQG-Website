import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Title.css";
import qffTitleBackground from "../components/images/qff_no_title_background_edited1.png"
import qffPinkSticker from "../components/images/badge-pink.svg"
import QiskitFallFest2026 from "./linking/QiskitFallFest2026";
import useScrollToBottom from "../listeners/scrollListener";
import { supabase } from "./supabaseConfig";
import EventModal from "./linking/EventModal";
import AdvancedEventModal from "./linking/AdvancedEventModal";
import advancedEvents from "./linking/advancedEvents.json";

function Title(props) {
  const [startFade, setStartFade] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [fetchingEvent, setFetchingEvent] = useState(false);

  const isAtBottom = useScrollToBottom();
  const bottomRef = useRef(null);

  useEffect(() => {
    // Notify parent if needed (e.g., to stop loading spinner)
    if (props.onLoaded) {
      props.onLoaded();
    }

    // Preload images to cache them and wait for them to load before fading in
    const imagesToLoad = [qffTitleBackground, qffPinkSticker];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        setImagesLoaded(true);
        // Slight delay to allow DOM to render the images before starting transition
        setTimeout(() => setStartFade(true), 25);
      }
    };

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Fallback so it doesn't freeze
      img.src = src;
    });
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTellMeMore = async () => {
    setFetchingEvent(true);
    // Fetch the event from the calendar database using a flexible search
    const { data, error } = await supabase
      .from("events-schedule")
      .select("*")
      .ilike("title", "%Qiskit Fall Fest%")
      .limit(1);

    setFetchingEvent(false);

    if (data && data.length > 0) {
      setEventInfo(data[0]);
      setShowEventModal(true);
    } else {
      // Fallback to the old component if the event is missing from the database
      setShowDetails(true);
    }
  };

  return (
    <>
      {eventInfo && advancedEvents["Qiskit Fall Fest 2026"] ? (
        <AdvancedEventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          eventData={advancedEvents["Qiskit Fall Fest 2026"]}
        />
      ) : (
        <EventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          allEventInfo={eventInfo}
        />
      )}
      {showDetails ? <QiskitFallFest2026 /> : <div className={`dashboard ${startFade ? 'fade-in' : ''}`}>
        <div className="dashboardBackground blurContainer">
          <div className="heroContainer">
            <div className="heroLeft">
              <h2 className="imageTopTitle">Qiskit Fall Fest is back bigger and better this year!</h2>
            </div>
            <div className="heroRight">
              <img id="qffBackground" src={qffTitleBackground} alt="Qiskit Fall Fest 2026" />
            </div>
          </div>
          <div className="titleBox">
            <h1 id="QFFTitle">Qiskit Fall Fest 2026</h1>
            <h2 id="McGill">McGill University</h2>
          </div>
          <img id="qffPinkSticker" src={qffPinkSticker} alt="Qiskit Fall Fest 2026 Pink Sticker" />
          <button ref={bottomRef} onClick={handleTellMeMore} disabled={fetchingEvent}>
            {fetchingEvent ? "Loading..." : "Tell me more!"}
          </button>
          <hr className="discordDivider" />
          <p className="discordCTA">
            Join our <a href="https://discord.gg/RcYtVGygDb" target="_blank" rel="noopener noreferrer" className="discordLink">Discord</a> for all updates related to the McGill Quantum Group.
          </p>
        </div>

        <div className={`pullTabContainer ${isAtBottom ? 'hidden' : ''}`} onClick={scrollToBottom}>
          <div className="pullTabText">
            Scroll down for more details on this year's Qiskit fall fest... <span>&#x25BC;</span>
          </div>
        </div>
      </div>
      }
    </>
  );
}


export default Title;