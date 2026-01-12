import { useState } from "react";
import "./TitleBar.css";
import AboutPage from "./linking/AboutPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Title from "./Title";
import EventsPage from "./linking/PastEvents";
import mqgLogo from "./images/mqg.png";

function TitleBar(props) {
  const [pageLoaded, setPageLoaded] = useState(false);

  return (
    <div
      style={pageLoaded ? { height: "100vh", backgroundColor: "black" } : {}}
    >
      <BrowserRouter>
        <nav class={pageLoaded ? "" : "titlebar"}>
          <Link to="/">
            <img src={mqgLogo} width="75" />
          </Link>
          <Link to="/about">About Us</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/past-events">Past Events</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/socials">Socials</Link>
          <Link
            to="/login"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            Login
          </Link>
        </nav>

        <div>
          <Routes>
            <Route
              path="/about"
              element={<AboutPage onLoaded={() => setPageLoaded(true)} />}
            />
            <Route
              path="/"
              element={<Title onLoaded={() => setPageLoaded(false)} />}
            />
            <Route path="/past-events" element={<EventsPage />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    color: "white",
                    fontSize: "xx-large",
                    textAlign: "center",
                    textShadow: "2px 2px #000000ff",
                  }}
                >
                  <h1>Page not found!</h1>
                  <p>
                    While you figure out where to go next, rest and look at the
                    waves for a little...
                  </p>
                  <Link to="/" style={{ color: "white" }}>
                    Go back to homepage
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default TitleBar;
