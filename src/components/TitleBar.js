// Listen. I know there shouldn't be 20 million import statements up here. "Bad design" or something along those lines
// Just cut me some slack for a bit man...
import { useState, useEffect } from "react";
import "./TitleBar.css";
import AboutPage from "./linking/AboutPage";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
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
import discordIcon from "./images/discord-icon.png";
import instagramIcon from "./images/instagram-icon.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function TitleBar(props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div
      style={pageLoaded ? { height: "100vh", backgroundColor: "black" } : {}}
    >
      <BrowserRouter>
        <nav className={pageLoaded ? "" : "titlebar"}>
          <Link to="/">
            <img src={mqgLogo} width="75" />
          </Link>
          <Link to="/about">About Us</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/past-events">Past Events</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/contact">Contact Us</Link>
          <a href="https://discord.gg/KY4e9BrQNe">
            <img src={discordIcon} width="35" />
          </a>
          <a href="https://www.instagram.com/mcgill_quantum_group/">
            <img src={instagramIcon} width="35" />
          </a>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              padding: "15px",
            }}
          >
            {user ? <UserIcon /> : <Link to="/login">Login</Link>}
            <Link to="/admin"></Link>
          </div>
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
            <Route path="/resources" element={<ResourcesPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />

              <Route path="/admin/schedule" element={<ScheduleRouter />} />
              <Route path="/admin/schedule/add" element={<ScheduleAdd />} />
              <Route path="/admin/schedule/edit" element={<ScheduleEdit />} />
              <Route
                path="/admin/schedule/delete"
                element={<ScheduleDelete />}
              />

              <Route path="/admin/past-events" element={<PastEventsRouter />} />
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

              <Route path="/admin/resources" element={<ResourcesRouter />} />
              <Route path="/admin/resources/add" element={<ResourcesAdd />} />
              <Route path="/admin/resources/edit" element={<ResourcesEdit />} />
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
