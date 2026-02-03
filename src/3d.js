import { state, useState, useRef, useEffect, useMemo } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
// import useMousePosition from "./mouseListener";
import useWindowDimensions from "./listeners/resizeListener";
import useMousePosition from "./listeners/mouseListener";
import * as THREE from "three";

function Plane(props) {
  // This reference will give us direct access to the mesh
  const animationData = useRef({
    scale: 0.32,
    theta: 0,
  });

  const { camera } = useThree();
  const { x, y } = useMousePosition();
  const { height, width } = useWindowDimensions();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    // Reduced resolution is fine now because the overhead is gone
    const resolution = 50;
    const range = 50;

    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const x = (i / resolution) * range * 2 - range;
        const y = (j / resolution) * range * 2 - range;
        const z = 0; // Initialize at flat 0, we animate later

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

    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!geometry) return;

    // 3. Update values on the ref (does not trigger re-render)
    const anim = animationData.current;

    anim.theta += delta * 0.1;
    anim.scale = 3 * (Math.sin(anim.theta) + 2.5) * 0.15;

    // Safety clamp
    if (anim.scale >= 5 || anim.scale <= 0) {
      anim.scale = 0.32;
    }

    const positions = geometry.getAttribute("position");
    const count = positions.count;

    // 4. Use native R3F pointer (Range is -1 to 1 already)
    // No need for unproject() or window dimensions listeners
    // 'state.pointer' gives normalized device coordinates (NDC)

    // Access the raw array for speed (bypasses .getX/.getY overhead)
    const posArray = positions.array;

    for (let i = 0; i < count; i++) {
      // x is index * 3, y is index * 3 + 1, z is index * 3 + 2
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const xWave = posArray[ix];
      const yWave = posArray[iy];

      // Simple distance check
      const mouseX_ndc = (x / width) * 2 - 1;

      const mouseY_ndc = -(y / height) * 2 + 1;

      const mouseVec = new THREE.Vector3(mouseX_ndc, mouseY_ndc, 0);

      mouseVec.unproject(camera); // convert to world space

      // Distance from this vertex to the mouse — THIS is what makes it asymmetrical

      const dx = xWave - mouseVec.x;

      const dy = yWave - mouseVec.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const z =
        anim.scale *
        (Math.exp(-dist * 0.075) * 1.25 * Math.sin(xWave * dx) +
          Math.exp(-dist * 0.075) * 1.25 * Math.cos(yWave * dy));

      // Directly write to array (fastest method)
      posArray[iz] = z;
    }

    positions.needsUpdate = true;

    // Computing normals is expensive!
    // Only do this if you need lighting updates.
    // If wireframe, you can comment this out to save huge CPU.
  });

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 3, 0, 0]} scale={1}>
      <meshStandardMaterial color="hotpink" wireframe={true} />{" "}
    </mesh>
  );
}

export default Plane;
