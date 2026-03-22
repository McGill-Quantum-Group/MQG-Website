// Listen. I know there shouldn't be 20 million import statements up here. "Bad design" or something along those lines
// Just cut me some slack for a bit man...
import { useState, useEffect, useRef } from "react";
import "./TitleBar.css";
import AboutPage from "./linking/AboutPage";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import Title from "./Title";
import EventsPage from "./linking/PastEvents";
import SchedulePage from "./linking/SchedulePage";

import ProtectedRoute from "./linking/admin/ProtectedRoute";
import ContactPage from "./linking/ContactPage";
import Login from "./linking/auth/Login";
import Signup from "./linking/auth/Signup";
import ResourcesPage from "./linking/Resources";
import ResetPassword from "./linking/auth/ResetPassword";
import UserIcon from "./linking/UserIcon";

import Admin from "./linking/admin/Admin";
import ScheduleAdd from "./linking/admin/schedule/ScheduleAdd";
import ScheduleEdit from "./linking/admin/schedule/ScheduleEdit";
import ScheduleDelete from "./linking/admin/schedule/ScheduleDelete";
import ScheduleRouter from "./linking/admin/schedule/ScheduleRouter";
import PastEventsAdd from "./linking/admin/pastEvents/PastEventsAdd";
import PastEventsEdit from "./linking/admin/pastEvents/PastEventsEdit";
import PastEventsDelete from "./linking/admin/pastEvents/PastEventsDelete";
import PastEventsRouter from "./linking/admin/pastEvents/PastEventsRouter";
import ResourcesAdd from "./linking/admin/resources/ResoucesAdd";
import ResourcesEdit from "./linking/admin/resources/ResourcesEdit";
import ResourcesDelete from "./linking/admin/resources/ResourcesDelete";
import ResourcesRouter from "./linking/admin/resources/ResourcesRouter";

import mqgLogo from "./images/mqg.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FileStack, Menu, X } from "lucide-react";
import useWindowDimensions from "../listeners/resizeListener";

// Removed transition since it didnt look too nice - we can add it back later though
function AnimatedRoutes({ children, durationMs = 240 }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState("in"); // "out" -> swap -> "in"
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    setPhase("out");
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setDisplayLocation(location);
      setPhase("in");
    }, durationMs);

    return () => window.clearTimeout(timeoutRef.current);
  }, [location, displayLocation, durationMs]);

  return (
    <>
      <div
        className={`page-transition-mask page-transition-mask--${phase}`}
        aria-hidden="true"
      />
      <div className="page-transition-content">
        {typeof children === "function" ? children(displayLocation) : children}
      </div>
    </>
  );
}

function TitleBar(props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [isTitleReady, setIsTitleReady] = useState(false);
  const auth = getAuth();
  const { width } = useWindowDimensions();
  const isDesktop = width > 750;

  const handleLogout = () => {
    signOut(auth);
    alert("Logged out successfully!");
  };

  useEffect(() => {
    import("./Title").then(() => setIsTitleReady(true));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  // Split links to handle the Login button separately on desktop
  const CoreLinks = (
    <>
      <Link to="/about">About Us</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/past-events">Past Events</Link>
      <Link to="/resources">Resources</Link>
      <Link to="/contact">Contact Us</Link>
      <a href="https://discord.gg/KY4e9BrQNe">
        <i className="fa-brands fa-discord" style={{ fontSize: "24px" }}></i>
      </a>
      <a href="https://www.instagram.com/mcgill_quantum_group/">
        <i className="fa-brands fa-instagram" style={{ fontSize: "28px" }}></i>
      </a>
    </>
  );

  const AuthLink = user ? (
    <a
      onClick={() => handleLogout()}
      style={{ cursor: "pointer", margin: "0 20px" }}
    >
      Log out
    </a>
  ) : (
    <Link to="/login" style={{ margin: "0 20px" }}>
      Login
    </Link>
  );

  // Mobile keeps everything together
  const MobileNavLinks = (
    <>
      {CoreLinks}
      {user ? (
        <a onClick={() => handleLogout()} style={{ cursor: "pointer" }}>
          Log out
        </a>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );

  return (
    <div
      style={pageLoaded ? { height: "100vh", backgroundColor: "black" } : {}}
    >
      <BrowserRouter>
        <header className="titlebar">
          {/* Title bar */}
          <Link to="/">
            <img src={mqgLogo} width="75" alt="logo" />
          </Link>

          {/* Desktop hyperlinks */}
          {isDesktop ? (
            <nav className="title-scrollbar link-container icons-bar">
              {CoreLinks}
            </nav>
          ) : null}

          {/* Profile & Auth button (Moved Login to far right) */}
          {isDesktop ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {AuthLink}
              {user ? <UserIcon /> : null}
              <Link to="/admin"></Link>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                padding: "0 4px",
              }}
            >
              <Menu
                style={{
                  cursor: showNav ? "default" : "pointer",
                  padding: "6px",
                  visibility: showNav ? "hidden" : "visible",
                }}
                onClick={() => setShowNav(true)}
                size={24}
              />
            </div>
          )}
        </header>

        {/* Mobile menu overlay - INLINED to prevent React from unmounting it! */}
        {!isDesktop && (
          <div
            className={`mobile-menu-overlay ${showNav ? "open" : ""}`}
            onClick={() => setShowNav(false)}
          >
            <div
              className={`mobile-menu ${showNav ? "open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-menu-header">
                <button
                  className="mobile-menu-close"
                  aria-label="Close navigation menu"
                  onClick={() => setShowNav(false)}
                >
                  <X style={{ cursor: "pointer" }} size={24} />
                </button>
              </div>
              <nav className="link-container icons-menu">{MobileNavLinks}</nav>
            </div>
          </div>
        )}

        <div className="main-content">
          <AnimatedRoutes>
            {(routeLocation) =>
              isTitleReady ? (
                <Routes location={routeLocation}>
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
                  <Route path="/resources" element={<ResourcesPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<Admin />} />

                    <Route
                      path="/admin/schedule"
                      element={<ScheduleRouter />}
                    />
                    <Route
                      path="/admin/schedule/add"
                      element={<ScheduleAdd />}
                    />
                    <Route
                      path="/admin/schedule/edit"
                      element={<ScheduleEdit />}
                    />
                    <Route
                      path="/admin/schedule/delete"
                      element={<ScheduleDelete />}
                    />

                    <Route
                      path="/admin/past-events"
                      element={<PastEventsRouter />}
                    />
                    <Route
                      path="/admin/past-events/add"
                      element={<PastEventsAdd />}
                    />
                    <Route
                      path="/admin/past-events/edit"
                      element={<PastEventsEdit />}
                    />
                    <Route
                      path="/admin/past-events/delete"
                      element={<PastEventsDelete />}
                    />
                    <Route
                      path="/admin/schedule/delete"
                      element={<ScheduleDelete />}
                    />

                    <Route
                      path="/admin/resources"
                      element={<ResourcesRouter />}
                    />
                    <Route
                      path="/admin/resources/add"
                      element={<ResourcesAdd />}
                    />
                    <Route
                      path="/admin/resources/edit"
                      element={<ResourcesEdit />}
                    />
                    <Route
                      path="/admin/resources/delete"
                      element={<ResourcesDelete />}
                    />
                  </Route>
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/sign-up" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/reset" element={<ResetPassword />} />

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
                          While you figure out where to go next, rest and look
                          at the waves for a little...
                        </p>
                        <Link to="/" style={{ color: "white" }}>
                          Go back to homepage
                        </Link>
                      </div>
                    }
                  />
                </Routes>
              ) : null
            }
          </AnimatedRoutes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default TitleBar;
