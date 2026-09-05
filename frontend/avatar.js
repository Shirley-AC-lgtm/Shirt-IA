// ============================================================
// SHIRT AI
// 3D AVATAR SYSTEM
// ============================================================

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.getElementById("avatarCanvas");

if (!canvas) {
    console.error("Shirt AI: avatarCanvas no encontrado.");
} else {

    // ========================================================
    // CONTAINER
    // ========================================================

    const container = canvas.parentElement;

    let width = container.clientWidth;
    let height = container.clientHeight;


    // ========================================================
    // SCENE
    // ========================================================

    const scene = new THREE.Scene();


    // ========================================================
    // CAMERA
    // ========================================================

    const camera = new THREE.PerspectiveCamera(
        30,
        width / height,
        0.1,
        100
    );

    camera.position.set(
        0,
        0.15,
        5.5
    );


    // ========================================================
    // RENDERER
    // ========================================================

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );

    renderer.setSize(
        width,
        height,
        false
    );

    renderer.setClearColor(
        0x000000,
        0
    );


    // ========================================================
    // AVATAR CONTAINER
    // ========================================================

    const avatar =
        new THREE.Group();

    scene.add(
        avatar
    );


    // ========================================================
    // LIGHTING
    // ========================================================

    const keyLight =
        new THREE.DirectionalLight(
            0xbfefff,
            2.5
        );

    keyLight.position.set(
        -2,
        3,
        4
    );

    scene.add(
        keyLight
    );


    const fillLight =
        new THREE.DirectionalLight(
            0x5fdcff,
            1.5
        );

    fillLight.position.set(
        3,
        1,
        2
    );

    scene.add(
        fillLight
    );


    const frontLight =
        new THREE.PointLight(
            0xffffff,
            1.8,
            8
        );

    frontLight.position.set(
        0,
        0.5,
        3
    );

    scene.add(
        frontLight
    );


    // ========================================================
    // GLB LOADER
    // ========================================================

    const loader =
        new GLTFLoader();


    loader.load(

        "models/ShirtAI.glb",

        function (gltf) {

            console.log(
                "Shirt AI 3D model cargado."
            );

            const model =
                gltf.scene;


            // ------------------------------------------------
            // Add model
            // ------------------------------------------------

            avatar.add(
                model
            );


            // ------------------------------------------------
            // Initial transform
            // ------------------------------------------------

            model.position.set(
                0,
                -1.4,
                0
            );

            model.scale.set(
                1,
                1,
                1
            );


            // ------------------------------------------------
            // Enable shadows
            // ------------------------------------------------

            model.traverse(
                function (object) {

                    if (
                        object.isMesh
                    ) {

                        object.castShadow =
                            true;

                        object.receiveShadow =
                            true;

                    }

                }
            );


            // ------------------------------------------------
            // Animations
            // ------------------------------------------------

            if (
                gltf.animations &&
                gltf.animations.length > 0
            ) {

                console.log(
                    "Animaciones encontradas:",
                    gltf.animations.length
                );

            }


            // ------------------------------------------------
            // Morph targets
            // ------------------------------------------------

            model.traverse(
                function (object) {

                    if (
                        object.isMesh &&
                        object.morphTargetDictionary
                    ) {

                        console.log(
                            "Morph targets encontrados en:",
                            object.name
                        );

                        console.log(
                            object.morphTargetDictionary
                        );

                    }

                }
            );

        },

        function (xhr) {

            if (xhr.total > 0) {

                const progress =
                    (
                        xhr.loaded /
                        xhr.total
                    ) * 100;

                console.log(
                    "Cargando Shirt AI:",
                    progress.toFixed(1) + "%"
                );
            }

        },

        function (error) {

            console.error(
                "ERROR cargando ShirtAI.glb:",
                error
            );

        }

    );


    // ========================================================
    // ANIMATION
    // ========================================================

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );

        const time =
            clock.getElapsedTime();


        // ----------------------------------------------------
        // Very subtle idle movement
        // ----------------------------------------------------

        avatar.rotation.y =
            Math.sin(
                time * 0.45
            ) *
            0.015;

        avatar.rotation.x =
            Math.sin(
                time * 0.30
            ) *
            0.006;


        renderer.render(
            scene,
            camera
        );

    }


    // ========================================================
    // RESIZE
    // ========================================================

    function resize() {

        width =
            container.clientWidth;

        height =
            container.clientHeight;

        if (
            width <= 0 ||
            height <= 0
        ) {
            return;
        }


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height,
            false
        );

    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();

    animate();


    console.log(
        "Shirt AI Avatar System iniciado."
    );

}