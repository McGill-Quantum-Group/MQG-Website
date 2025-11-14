import logo from "./logo.svg";
import Plane from "./3d";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Grid } from "@react-three/drei";
import Cards from "./Cards";
import "./App.css";
import useMousePosition from "./mouseListener";

function App() {
  return (
    <div
      style={{
        position: "relative",
        background: "radial-gradient(circle, #430b00ff, #1c001eff)",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* FOREGROUND CARDS */}
      <div
        style={{
          display: "flex",
          zIndex: 10,
          pointerEvents: "auto",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Cards />
      </div>
      {/* BACKGROUND CANVAS */}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
  );
}

export default App;
