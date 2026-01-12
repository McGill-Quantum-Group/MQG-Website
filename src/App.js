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

function App() {
  KeyboardListener();
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "radial-gradient(circle, #430b00ff, #1c001eff)",
          width: "100vw",
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* FOREGROUND CARDS */}
        <div style={{ zIndex: 20, position: "relative" }}>
          <TitleBar />
        </div>
      </div>
      {/* BACKGROUND CANVAS */}
      <div>
        <Canvas
          style={{
            position: "absolute",
            top: 0,
            zIndex: 0,
          }}
        >
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
    </div>
  );
}

export default App;
