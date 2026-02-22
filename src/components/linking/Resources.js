import React, { useState } from "react";
import { useEffect } from "react";
import "./PastEvents.css";
import EventCard from "./EventCard";
import { supabase } from "../supabaseConfig";

function ResourcesPage(props) {
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
        .from("resources")
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
        setEvents(eventData);
        setLoaded(true);
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
              Come back when its not midterm season. We might be a little less
              lazy...
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

export default ResourcesPage;
