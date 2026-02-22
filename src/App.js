import logo from "./logo.svg";
import Plane from "./3d";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Grid } from "@react-three/drei";
import Cards from "./components/Cards";
import TitleBar from "./components/TitleBar";
import Title from "./components/Title";
import "./App.css";
import useMousePosition from "./listeners/mouseListener";
import KeyboardListener from "./listeners/keyListener";
import { AuthContextProvider } from "./components/linking/auth/authContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/linking/auth/AuthProvider";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function App() {
  KeyboardListener(); // If you're reading this code! Be relieved, this is not a keylogger (thats illegal!!) - but it is related to a cool easter egg, see if you can find it :)
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(circle, #430b00ff, #1c001eff)",
      }}
    >
      {/* Background Canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight position={[-1, -1, -1]} decay={0} intensity={Math.PI} />
          <Plane />
        </Canvas>
      </div>

      {/* Scrollable Content Container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          overflowY: "auto",
          overflowX: "hidden",
          background:
            "transparent" /* Must be transparent to see the 3D plane behind it */,
        }}
      >
        {/* FOREGROUND CARDS */}
        <div style={{ position: "relative" }}>
          <AuthProvider>
            <TitleBar />
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
