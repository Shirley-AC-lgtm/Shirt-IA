// ============================================================
// SHIRT AI
// DIGITAL HUMAN AVATAR
// Three.js
// ============================================================

import * as THREE from "three";

const canvas = document.getElementById("avatarCanvas");

if (!canvas) {
    console.error("Shirt AI: avatarCanvas no encontrado.");
} else {

    const container = canvas.parentElement;

    // --------------------------------------------------------
    // SCENE
    // --------------------------------------------------------

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        28,
        1,
        0.1,
        100
    );

    camera.position.set(
        0,
        0.25,
        5.5
    );

    // --------------------------------------------------------
    // RENDERER
    // --------------------------------------------------------

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setClearColor(
        0x000000,
        0
    );

    // --------------------------------------------------------
    // DIGITAL HUMAN GROUP
    // --------------------------------------------------------

    const avatar = new THREE.Group();

    scene.add(avatar);

    // --------------------------------------------------------
    // LIGHTING
    // --------------------------------------------------------

    const keyLight = new THREE.DirectionalLight(
        0xdffaff,
        3
    );

    keyLight.position.set(
        -2,
        3,
        4
    );

    scene.add(keyLight);


    const rimLight = new THREE.DirectionalLight(
        0x42dfff,
        2
    );

    rimLight.position.set(
        3,
        1,
        -2
    );

    scene.add(rimLight);


    const frontLight = new THREE.PointLight(
        0xffffff,
        2,
        8
    );

    frontLight.position.set(
        0,
        1,
        3
    );

    scene.add(frontLight);


    // ========================================================
    // DIGITAL BODY
    // ========================================================

    const bodyMaterial = new THREE.MeshPhysicalMaterial({

        color: 0x172b36,

        roughness: 0.48,

        metalness: 0.18,

        transparent: true,

        opacity: 0.96,

        clearcoat: 0.45,

        clearcoatRoughness: 0.2

    });


    // --------------------------------------------------------
    // TORSO
    // --------------------------------------------------------

    const torsoGeometry =
        new THREE.CapsuleGeometry(
            0.72,
            1.35,
            32,
            64
        );

    const torso =
        new THREE.Mesh(
            torsoGeometry,
            bodyMaterial
        );

    torso.scale.set(
        1.05,
        1,
        0.62
    );

    torso.position.y = -0.65;

    avatar.add(torso);


    // --------------------------------------------------------
    // NECK
    // --------------------------------------------------------

    const neckGeometry =
        new THREE.CylinderGeometry(
            0.24,
            0.29,
            0.42,
            32
        );

    const neck =
        new THREE.Mesh(
            neckGeometry,
            bodyMaterial
        );

    neck.position.y = 0.38;

    avatar.add(neck);


    // ========================================================
    // HEAD
    // ========================================================

    const headMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0xc88f78,

            roughness: 0.52,

            metalness: 0.02,

            clearcoat: 0.3,

            clearcoatRoughness: 0.3

        });


    const headGeometry =
        new THREE.SphereGeometry(
            0.61,
            64,
            64
        );


    const head =
        new THREE.Mesh(
            headGeometry,
            headMaterial
        );


    head.scale.set(
        0.91,
        1.12,
        0.86
    );


    head.position.y = 1.02;

    avatar.add(head);


    // ========================================================
    // HAIR
    // ========================================================

    const hairMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x241a18,

            roughness: 0.78,

            metalness: 0.02,

            clearcoat: 0.15

        });


    const hairGeometry =
        new THREE.SphereGeometry(
            0.68,
            48,
            48,
            0,
            Math.PI * 2,
            0,
            Math.PI * 0.65
        );


    const hair =
        new THREE.Mesh(
            hairGeometry,
            hairMaterial
        );


    hair.scale.set(
        0.96,
        1.12,
        0.94
    );


    hair.position.y = 1.18;

    avatar.add(hair);


    // ========================================================
    // EYES
    // ========================================================

    const eyeMaterial =
        new THREE.MeshPhysicalMaterial({
            color: 0x241914,
            roughness: 0.15,
            metalness: 0.1
        });


    function createEye(x) {

        const geometry =
            new THREE.SphereGeometry(
                0.055,
                24,
                24
            );

        const eye =
            new THREE.Mesh(
                geometry,
                eyeMaterial
            );

        eye.position.set(
            x,
            1.08,
            0.52
        );

        return eye;
    }


    const leftEye =
        createEye(-0.18);

    const rightEye =
        createEye(0.18);


    avatar.add(leftEye);
    avatar.add(rightEye);


    // ========================================================
    // NOSE
    // ========================================================

    const noseGeometry =
        new THREE.ConeGeometry(
            0.09,
            0.25,
            24
        );


    const nose =
        new THREE.Mesh(
            noseGeometry,
            headMaterial
        );


    nose.rotation.x =
        Math.PI / 2;


    nose.position.set(
        0,
        0.96,
        0.58
    );


    avatar.add(nose);


    // ========================================================
    // MOUTH
    // ========================================================

    const mouthGeometry =
        new THREE.TorusGeometry(
            0.13,
            0.018,
            12,
            32,
            Math.PI
        );


    const mouth =
        new THREE.Mesh(
            mouthGeometry,
            new THREE.MeshPhysicalMaterial({
                color: 0x7d3e42,
                roughness: 0.4
            })
        );


    mouth.rotation.x =
        Math.PI;


    mouth.position.set(
        0,
        0.82,
        0.54
    );


    avatar.add(mouth);


    // ========================================================
    // SHOULDERS
    // ========================================================

    const shoulderGeometry =
        new THREE.SphereGeometry(
            0.42,
            32,
            32
        );


    const leftShoulder =
        new THREE.Mesh(
            shoulderGeometry,
            bodyMaterial
        );


    leftShoulder.scale.set(
        1.45,
        0.75,
        0.72
    );


    leftShoulder.position.set(
        -0.62,
        -0.32,
        0
    );


    const rightShoulder =
        leftShoulder.clone();


    rightShoulder.position.x =
        0.62;


    avatar.add(leftShoulder);
    avatar.add(rightShoulder);


    // ========================================================
    // DIGITAL WIREFRAME
    // ========================================================

    const wireMaterial =
        new THREE.LineBasicMaterial({

            color: 0x5ce8ff,

            transparent: true,

            opacity: 0.20

        });


    const wireGroup =
        new THREE.Group();


    avatar.add(wireGroup);


    function addWire(mesh) {

        const wire =
            new THREE.LineSegments(

                new THREE.WireframeGeometry(
                    mesh.geometry
                ),

                wireMaterial
            );

        wire.position.copy(
            mesh.position
        );

        wire.rotation.copy(
            mesh.rotation
        );

        wire.scale.copy(
            mesh.scale
        );

        wireGroup.add(wire);

    }


    addWire(head);
    addWire(hair);
    addWire(torso);


    // ========================================================
    // PARTICLE RECONSTRUCTION
    // ========================================================

    const particleCount = 4200;

    const positions =
        new Float32Array(
            particleCount * 3
        );

    const original =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const i3 = i * 3;

        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =
            Math.random();


        const y =
            Math.random() * 3.3 -
            1.1;


        const bodyWidth =
            y > 0.25
                ? 0.55
                : 0.9;


        const x =
            Math.cos(angle) *
            radius *
            bodyWidth;


        const z =
            Math.sin(angle) *
            radius *
            0.48;


        positions[i3] =
            x;

        positions[i3 + 1] =
            y;

        positions[i3 + 2] =
            z;


        original[i3] =
            x;

        original[i3 + 1] =
            y;

        original[i3 + 2] =
            z;

    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x70edff,

            size: 0.018,

            transparent: true,

            opacity: 0.62,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    particles.position.y =
        -0.05;


    avatar.add(particles);


    // ========================================================
    // DIGITAL SCAN
    // ========================================================

    const scanMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x62eaff,

            transparent: true,

            opacity: 0.22,

            side: THREE.DoubleSide,

            blending:
                THREE.AdditiveBlending

        });


    const scanGeometry =
        new THREE.PlaneGeometry(
            2.4,
            0.025
        );


    const scanLine =
        new THREE.Mesh(
            scanGeometry,
            scanMaterial
        );


    scanLine.position.z =
        0.65;


    avatar.add(scanLine);


    // ========================================================
    // DIGITAL HALO
    // ========================================================

    const haloGeometry =
        new THREE.RingGeometry(
            1.15,
            1.19,
            96
        );


    const haloMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x46e5ff,

            transparent: true,

            opacity: 0.20,

            side: THREE.DoubleSide,

            blending:
                THREE.AdditiveBlending

        });


    const halo =
        new THREE.Mesh(
            haloGeometry,
            haloMaterial
        );


    halo.position.y =
        0.75;


    halo.rotation.x =
        Math.PI / 2;


    avatar.add(halo);


    // ========================================================
    // CODE PARTICLES
    // ========================================================

    const codeParticles = [];

    const codeCharacters = [
        "{ }",
        "< />",
        "AI",
        "01",
        "10",
        "//",
        "&&",
        "=>"
    ];


    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const canvasTexture =
            createCodeTexture(
                codeCharacters[
                Math.floor(
                    Math.random() *
                    codeCharacters.length
                )
                ]
            );


        const material =
            new THREE.SpriteMaterial({

                map: canvasTexture,

                transparent: true,

                opacity: 0.35,

                depthWrite: false

            });


        const sprite =
            new THREE.Sprite(
                material
            );


        sprite.scale.set(
            0.20,
            0.10,
            1
        );


        sprite.position.set(

            (Math.random() - 0.5) * 2.8,

            Math.random() * 3.4 - 1.2,

            (Math.random() - 0.5) * 1.2

        );


        sprite.userData.speed =
            0.15 +
            Math.random() * 0.35;


        sprite.userData.baseX =
            sprite.position.x;


        sprite.userData.phase =
            Math.random() * Math.PI * 2;


        avatar.add(sprite);

        codeParticles.push(sprite);

    }


    // ========================================================
    // CODE TEXTURE
    // ========================================================

    function createCodeTexture(text) {

        const c =
            document.createElement("canvas");

        c.width = 256;
        c.height = 128;

        const ctx =
            c.getContext("2d");

        ctx.clearRect(
            0,
            0,
            c.width,
            c.height
        );


        ctx.font =
            "bold 42px monospace";


        ctx.fillStyle =
            "#73ecff";


        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "middle";


        ctx.fillText(
            text,
            c.width / 2,
            c.height / 2
        );


        const texture =
            new THREE.CanvasTexture(c);


        texture.needsUpdate = true;

        return texture;

    }


    // ========================================================
    // POSITION
    // ========================================================

    avatar.position.y =
        -0.35;


    avatar.scale.set(
        1.18,
        1.18,
        1.18
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


        // ------------------------------
        // BREATHING
        // ------------------------------

        const breathing =
            Math.sin(
                time * 1.4
            ) * 0.012;


        torso.scale.y =
            1 + breathing;


        // ------------------------------
        // HEAD MICRO MOVEMENT
        // ------------------------------

        head.rotation.y =
            Math.sin(
                time * 0.45
            ) * 0.025;


        head.rotation.x =
            Math.sin(
                time * 0.31
            ) * 0.012;


        // ------------------------------
        // DIGITAL ROTATION
        // ------------------------------

        avatar.rotation.y =
            Math.sin(
                time * 0.35
            ) * 0.025;


        // ------------------------------
        // SCAN
        // ------------------------------

        scanLine.position.y =
            Math.sin(
                time * 1.4
            ) * 1.55;


        // ------------------------------
        // HALO
        // ------------------------------

        halo.rotation.z =
            time * 0.08;


        halo.material.opacity =
            0.16 +
            Math.sin(time * 2) *
            0.06;


        // ------------------------------
        // PARTICLES
        // ------------------------------

        const positionAttribute =
            particleGeometry.getAttribute(
                "position"
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const i3 =
                i * 3;


            positionAttribute.array[
                i3
            ] =
                original[i3] +
                Math.sin(
                    time * 0.8 + i
                ) * 0.018;


            positionAttribute.array[
                i3 + 1
            ] =
                original[i3 + 1] +
                Math.sin(
                    time * 0.55 + i * 0.3
                ) * 0.025;


            positionAttribute.array[
                i3 + 2
            ] =
                original[i3 + 2] +
                Math.cos(
                    time * 0.7 + i
                ) * 0.018;

        }


        positionAttribute.needsUpdate =
            true;


        // ------------------------------
        // CODE FLOATING
        // ------------------------------

        codeParticles.forEach(
            sprite => {

                sprite.position.y +=
                    sprite.userData.speed *
                    0.003;


                sprite.position.x =
                    sprite.userData.baseX +
                    Math.sin(
                        time +
                        sprite.userData.phase
                    ) * 0.05;


                if (
                    sprite.position.y >
                    2.4
                ) {

                    sprite.position.y =
                        -1.7;

                }

            }
        );


        renderer.render(
            scene,
            camera
        );

    }


    // ========================================================
    // RESIZE
    // ========================================================

    function resize() {

        const width =
            container.clientWidth;

        const height =
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
        "Shirt AI Digital Human iniciado."
    );

}