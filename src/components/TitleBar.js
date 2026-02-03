import { useState } from "react";
import "./TitleBar.css";
import AboutPage from "./linking/AboutPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Title from "./Title";
import EventsPage from "./linking/PastEvents";
import SchedulePage from "./linking/SchedulePage";

import ProtectedRoute from "./linking/admin/ProtectedRoute";
import Admin from "./linking/admin/Admin";
import Schedule from "./linking/admin/Schedule";
import Posts from "./linking/admin/Posts";
import ContactPage from "./linking/ContactPage";
import Login from "./linking/Login";
import Signup from "./linking/Signup";

import mqgLogo from "./images/mqg.png";
import discordIcon from "./images/discord-icon.png";
import instagramIcon from "./images/instagram-icon.png";

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
          <a href="https://discord.gg/KY4e9BrQNe">
            <img src={discordIcon} width="35" />
          </a>
          <a href="https://www.instagram.com/mcgill_quantum_group/">
            <img src={instagramIcon} width="35" />
          </a>

          <Link to="/login" style={{ display: "flex", marginLeft: "auto" }}>
            Login
          </Link>
          <Link to="/admin"></Link>
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
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/admin" element={<Admin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/schedule" element={<Schedule />} />
              <Route path="/admin/posts" element={<Posts />} />
            </Route>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />

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
