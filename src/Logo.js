import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


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

    // Add a HemiLight for ambient lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    newScene.add(hemiLight);


    console.log(darkMode);
    if (darkMode) {
        newScene.background = new THREE.Color('black');
    }
    else {
        newScene.background = new THREE.Color('white');
    }


    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3.5;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.25; // Damping factor
    controls.screenSpacePanning = false; // Disable panning

    const ttfLoader = new TTFLoader();
    let textMesh;
    let loadedModel;

    const depth = 0.1,
        size = 1,
        curveSegments = 12,

        bevelThickness = 0.06, // Reduce bevel thickness
        bevelSize = 0.06; // Reduce bevel size
    ttfLoader.load("fonts/ChakraPetch-Bold.ttf", (json) => {
        const font = new FontLoader().parse(json);
        console.log(font);
        const textGeometryBCD = new TextGeometry('BCD', {
            font: font,
            size: size + 0.1,
            depth: depth,
            curveSegments: 32, // Increase the curveSegments for smoother curves
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: true,
        });
        textGeometryBCD.center();

        const materialsBCD = [
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.2 }), // front
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.2 }) // side
        ];
        const textMeshBCD = new THREE.Mesh(textGeometryBCD, materialsBCD);
        textMeshBCD.position.set(0, 0.7, 0.2); // Adjust position as needed

        const textGeometryROM = new TextGeometry('ROM', {
            font: font,
            size: size,
            depth: depth,
            curveSegments: 32, // Increase the curveSegments for smoother curves
            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: true
        });
        textGeometryROM.center();
        const materialsROM = [
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.2 }), // front
            new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.2 }) // side
        ];
        const textMeshROM = new THREE.Mesh(textGeometryROM, materialsROM);
        textMeshROM.position.set(0, -0.7, 0.2); // Adjust position as needed

        textMesh = new THREE.Group();
        textMesh.add(textMeshBCD);
        textMesh.add(textMeshROM);
        // Load the GLB file
        const loader = new GLTFLoader();

        loader.load('3D/CDV2.glb', (gltf) => {
            newScene.add(gltf.scene);
            console.log(gltf.scene);
            setScene(newScene);
            gltf.scene.position.set(0, 0, 0); // Center the model in the scene
            loadedModel = gltf.scene;
            if (textMesh) {
                gltf.scene.add(textMesh);
            }
        });
    });

    

    // Rendering loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
    //   setScene(newScene);
      renderer.render(newScene, camera);
      if (loadedModel) {
        loadedModel.rotation.y += 0.01;
        loadedModel.rotation.x += 0.01;
      }
    };

    animate();

    return () => {
        if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose(); // Dispose of the renderer
            controls.dispose(); // Dispose of the controls
        }
    };
  }, []);

  useEffect(() => {
    console.log('darkMode changed');
    console.log(scene);
    console.log(darkMode);
    if (scene) {
        if (darkMode) {
            console.log('dark');
            scene.background = new THREE.Color('black');
        }
        else {
            console.log('light');
            scene.background = new THREE.Color('white');
        }
    }
  }, [darkMode, scene]);

  return <div ref={mountRef} />;
};

export default Logo;