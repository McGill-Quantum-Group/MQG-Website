import React, { useState } from "react";
import { useEffect } from "react";
import "./PastEvents.css";
import EventCard from "./EventCard";
import { supabase } from "../supabaseConfig";

import mqgLogo from "../images/MQG.webp";

function EventsPage(props) {
  const [startFade, setStartFade] = useState(false);
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // {
  //   name: "QiSkit Fall Fest",
  //   info: "Our first run of a quantum hackathon! Pre-event workshops were lead before to ensure that people could start building right away the day of.",
  //   image: mqgLogo,
  //   longInfo: {
  //     title: "QiSkit Fall Fest",
  //     description: "We love to hack",
  //     images: [mqgLogo, mqgLogo],
  //   },
  // },

  useEffect(() => {
    const fetchEvents = async () => {
      setLoaded(false);
      const { data, error } = await supabase
        .from("events-past")
        .select("*")
        .order("date");
      if (error) {
        console.log(error);
      } else {
        let eventData = [];
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          eventData.push({
            name: e.title,
            info: e.short_description,
            image: e.spotlight_image,
            longInfo: {
              title: e.post_title,
              description: e.description,
              images: e.images ?? [],
              extras: e.extras,
              location: e.location,
              date: e.date,
            },
          });
        }
        if (eventData.length > 0) {
          let loadedCount = 0;
          const checkLoaded = () => {
            loadedCount++;
            if (loadedCount === eventData.length) {
              setEvents(eventData);
              setLoaded(true);
            }
          };

          eventData.forEach((e) => {
            if (e.image) {
              const img = new Image();
              img.onload = checkLoaded;
              img.onerror = checkLoaded;
              img.src = e.image;
            } else {
              checkLoaded();
            }
          });
        } else {
          setEvents(eventData);
          setLoaded(true);
        }
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ overflowY: "auto" }}>
      {loaded ? (
        events.length !== 0 ? (
          <EventCard events={events} />
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1
              style={{ color: "white", marginTop: "20px", marginBottom: "0px" }}
            >
              Nothing to see here yet!
            </h1>
            <h2
              style={{ color: "white", marginTop: "20px", marginBottom: "0px" }}
            >
              Come back when its not finals season. You can blame the web
              developer for the lack of updates...
            </h2>
          </div>
        )
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "90vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="loader spin" />
            <h1
              style={{ color: "white", marginTop: "20px", marginBottom: "0px" }}
            >
              Loading, please wait...
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
