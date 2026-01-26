import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  float intensity = max(dot(vNormal, lightDir), 0.0);
  vec3 color = vec3(0.0);

  if (intensity > 0.0) {
    float angle = acos(dot(vNormal, lightDir));
    float wavelength = 380.0 + angle * 400.0 / 3.141592653589793;
    color = vec3(
      sin(0.024 * wavelength - 0.3),
      sin(0.024 * wavelength - 0.6),
      sin(0.024 * wavelength - 0.9)
    );
  }

  gl_FragColor = vec4(color * intensity, 1.0);
}
`;

const Logo = ({ darkMode }) => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(new THREE.Scene());
  let newScene;
  useEffect(() => {
    // Create a scene
    newScene = new THREE.Scene();
    setScene(newScene);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(250, 250);
    if (mountRef.current && !mountRef.current.hasChildNodes()) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add light to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1000); // Decrease the intensity to 1000
    light.position.set(1, 1, 1).normalize();
    newScene.add(light);

    // Add a point light for better reflection
    const pointLight = new THREE.PointLight(0xffffff, 100);
    pointLight.position.set(0, 0, 0);
    newScene.add(pointLight);

    // Load the CD model
    const loader = new GLTFLoader();
    loader.load('/path/to/cd-model.glb', (gltf) => {
      const cd = gltf.scene;
      const cdMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
      });
      cd.traverse((child) => {
        if (child.isMesh) {
          child.material = cdMaterial;
        }
      });
      newScene.add(cd);
    });

    // Add OrbitControls
    const controls = new OrbitControls(renderer.domElement);
    controls.update();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(newScene, new THREE.PerspectiveCamera(75, 1, 0.1, 1000));
    };
    animate();
  }, []);

  return <div ref={mountRef} />;
};

export default Logo;