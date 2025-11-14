import { state, useState, useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
// import useMousePosition from "./mouseListener";
import useWindowDimensions from "./resizeListener";
import useMousePosition from "./mouseListener";
import * as THREE from "three";

function Plane(props) {
  // This reference will give us direct access to the mesh
  const [scale, setScale] = useState(0.32);
  const [scaleDirection, setScaleDirection] = useState(1);

  // Initial state for the geometry - prevents high reinitialization memory use
  const geometryRef = useRef();

  const { camera } = useThree();
  const { x, y } = useMousePosition();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    geometryRef.current = generateSurfaceGeometry(scale);
  }, []);

  useFrame((state, delta) => {
    if (!geometryRef.current) return;

    const step = delta * scaleDirection * 0.15;
    setScale(scale + step);
    if (scale >= 1.5) {
      setScaleDirection(-1);
    }
    if (scale <= 0.3) {
      setScaleDirection(1);
    }

    // Strange bug where the scale scales infinitely? Some correction against that
    if (scale >= 3 || scale <= 0) {
      setScale(0.32);
    }

    const positions = geometryRef.current.getAttribute("position");

    for (let i = 0; i < positions.count; i++) {
      const xWave = positions.getX(i);
      const yWave = positions.getY(i);

      // Move the sine wave depending on where the user's mouse is
      // World coordinate conversion for mouse
      const mouseX_ndc = (x / width) * 2 - 1;
      const mouseY_ndc = -(y / height) * 2 + 1;

      const mouseVec = new THREE.Vector3(mouseX_ndc, mouseY_ndc, 0);
      mouseVec.unproject(camera); // convert to world space

      // Distance from this vertex to the mouse — THIS is what makes it asymmetrical
      const dx = xWave - mouseVec.x;
      const dy = yWave - mouseVec.y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      // Example bump function
      const z =
        scale *
        (Math.exp(-dist * 0.075) * 1.25 * Math.sin(xWave * dx) +
          Math.exp(-dist * 0.075) * 1.25 * Math.cos(yWave * dy));

      positions.setZ(i, z);
    }

    positions.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
  });

  const generateSurfaceGeometry = (s) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    const resolution = 100; // Number of points along each axis
    const range = 100; // Range for x and y

    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const x = (i / resolution) * range * 2 - range;
        const y = (j / resolution) * range * 2 - range;
        const z = scale * Math.sin(s * x) * Math.cos(s * y); // Sine and cosine function for now, we can definitely change this though

        vertices.push(x, y, z);

        if (i < resolution && j < resolution) {
          const a = i * (resolution + 1) + j;
          const b = i * (resolution + 1) + j + 1;
          const c = (i + 1) * (resolution + 1) + j;
          const d = (i + 1) * (resolution + 1) + j + 1;

          indices.push(a, b, d);
          indices.push(a, d, c);
        }
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  };

  return (
    <mesh
      geometry={geometryRef.current}
      rotation={[-Math.PI / 3, 0, 0]}
      scale={1}
    >
      <meshStandardMaterial color="hotpink" wireframe={true} />{" "}
    </mesh>
  );
}

export default Plane;
