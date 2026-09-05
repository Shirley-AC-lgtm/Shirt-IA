import * as THREE from "three";

const canvas = document.getElementById("avatarCanvas");

if (!canvas) {
    console.error("Shirt AI: no se encontró #avatarCanvas");
} else {

    const container = canvas.parentElement;

    // --------------------------------------------------
    // ESCENA
    // --------------------------------------------------

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        32,
        1,
        0.1,
        100
    );

    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setClearColor(0x000000, 0);

    // --------------------------------------------------
    // GRUPO PRINCIPAL
    // --------------------------------------------------

    const avatar = new THREE.Group();

    scene.add(avatar);

    // --------------------------------------------------
    // FOTO
    // --------------------------------------------------

    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(
        "models/avatar.jpeg",
        () => {
            console.log("Shirt AI: retrato cargado.");
        },
        undefined,
        (error) => {
            console.error(
                "Shirt AI: no se pudo cargar models/avatar.jpeg",
                error
            );
        }
    );

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // --------------------------------------------------
    // SHADER DEL HUMANO DIGITAL
    // --------------------------------------------------

    const material = new THREE.ShaderMaterial({

        transparent: true,

        uniforms: {

            uTexture: {
                value: texture
            },

            uTime: {
                value: 0
            },

            uMouse: {
                value: new THREE.Vector2(0, 0)
            },

            uResolution: {
                value: new THREE.Vector2(1, 1)
            }

        },

        vertexShader: `

            varying vec2 vUv;

            uniform float uTime;
            uniform vec2 uMouse;

            void main() {

                vUv = uv;

                vec3 pos = position;

                // Micro movimiento tipo videollamada
                float breathing =
                    sin(uTime * 1.15) * 0.006;

                pos.y += breathing;

                // Parallax extremadamente pequeño
                pos.x += uMouse.x * 0.025;
                pos.y += uMouse.y * 0.018;

                // Pequeña vibración digital
                float wave =
                    sin(uv.y * 25.0 + uTime * 1.5)
                    * 0.0015;

                pos.x += wave;

                gl_Position =
                    projectionMatrix *
                    modelViewMatrix *
                    vec4(pos, 1.0);
            }

        `,

        fragmentShader: `

            uniform sampler2D uTexture;
            uniform float uTime;

            varying vec2 vUv;

            // ------------------------------------------------
            // NOISE
            // ------------------------------------------------

            float hash(vec2 p) {

                return fract(
                    sin(
                        dot(
                            p,
                            vec2(
                                127.1,
                                311.7
                            )
                        )
                    ) * 43758.5453123
                );
            }

            // ------------------------------------------------
            // DIGITAL SCAN
            // ------------------------------------------------

            float scanline(vec2 uv) {

                float line =
                    sin(
                        uv.y * 900.0
                        - uTime * 4.0
                    );

                return line * 0.018;
            }

            // ------------------------------------------------
            // EDGE DETECTION APROXIMADA
            // ------------------------------------------------

            float edgeGlow(vec2 uv) {

                float left =
                    texture2D(
                        uTexture,
                        uv + vec2(-0.004, 0.0)
                    ).r;

                float right =
                    texture2D(
                        uTexture,
                        uv + vec2(0.004, 0.0)
                    ).r;

                float top =
                    texture2D(
                        uTexture,
                        uv + vec2(0.0, 0.004)
                    ).r;

                float bottom =
                    texture2D(
                        uTexture,
                        uv + vec2(0.0, -0.004)
                    ).r;

                float difference =
                    abs(left - right)
                    +
                    abs(top - bottom);

                return smoothstep(
                    0.03,
                    0.25,
                    difference
                );
            }

            void main() {

                vec2 uv = vUv;

                // --------------------------------------------
                // MICRO DISTORSIÓN
                // --------------------------------------------

                float distortion =
                    sin(
                        uv.y * 70.0
                        + uTime * 1.2
                    ) * 0.0007;

                uv.x += distortion;

                vec4 photo =
                    texture2D(
                        uTexture,
                        uv
                    );

                // --------------------------------------------
                // MÁSCARA SUAVE
                // --------------------------------------------

                vec2 centered =
                    uv - 0.5;

                float ellipse =
                    dot(
                        centered * vec2(0.88, 1.0),
                        centered * vec2(0.88, 1.0)
                    );

                float mask =
                    1.0 -
                    smoothstep(
                        0.18,
                        0.255,
                        ellipse
                    );

                // --------------------------------------------
                // CONSERVAR LA FOTO REAL
                // --------------------------------------------

                vec3 color =
                    photo.rgb;

                // --------------------------------------------
                // TONO DIGITAL MUY SUTIL
                // --------------------------------------------

                color.r *= 0.97;
                color.g *= 1.01;
                color.b *= 1.025;

                // --------------------------------------------
                // SCANLINES
                // --------------------------------------------

                color +=
                    scanline(uv);

                // --------------------------------------------
                // BORDES RECONSTRUIDOS
                // --------------------------------------------

                float edge =
                    edgeGlow(uv);

                vec3 digitalEdge =
                    vec3(
                        0.05,
                        0.75,
                        1.0
                    );

                color =
                    mix(
                        color,
                        color + digitalEdge * 0.30,
                        edge * 0.35
                    );

                // --------------------------------------------
                // PIXELES DIGITALES MUY SUTILES
                // --------------------------------------------

                vec2 grid =
                    floor(
                        uv * 180.0
                    );

                float randomPixel =
                    hash(
                        grid +
                        floor(uTime * 2.0)
                    );

                float digitalNoise =
                    step(
                        0.996,
                        randomPixel
                    );

                color +=
                    digitalNoise *
                    vec3(
                        0.0,
                        0.35,
                        0.55
                    );

                // --------------------------------------------
                // TRANSPARENCIA
                // --------------------------------------------

                float alpha =
                    mask * photo.a;

                gl_FragColor =
                    vec4(
                        color,
                        alpha
                    );
            }
        `
    });

    // --------------------------------------------------
    // PLANO DEL RETRATO
    // --------------------------------------------------

    const geometry =
        new THREE.PlaneGeometry(
            3.15,
            4.15,
            64,
            64
        );

    const portrait =
        new THREE.Mesh(
            geometry,
            material
        );

    avatar.add(portrait);

    portrait.position.set(
        0,
        -0.05,
        0
    );

    // --------------------------------------------------
    // HALO DIGITAL
    // --------------------------------------------------

    const haloMaterial =
        new THREE.ShaderMaterial({

            transparent: true,
            depthWrite: false,

            uniforms: {
                uTime: {
                    value: 0
                }
            },

            vertexShader: `

                varying vec2 vUv;

                void main() {

                    vUv = uv;

                    gl_Position =
                        projectionMatrix *
                        modelViewMatrix *
                        vec4(
                            position,
                            1.0
                        );
                }

            `,

            fragmentShader: `

                varying vec2 vUv;

                uniform float uTime;

                void main() {

                    vec2 p =
                        vUv - 0.5;

                    float d =
                        length(
                            p *
                            vec2(
                                0.85,
                                1.0
                            )
                        );

                    float glow =
                        1.0 -
                        smoothstep(
                            0.18,
                            0.5,
                            d
                        );

                    float pulse =
                        0.85 +
                        sin(
                            uTime * 1.2
                        ) * 0.08;

                    vec3 color =
                        vec3(
                            0.0,
                            0.65,
                            1.0
                        );

                    gl_FragColor =
                        vec4(
                            color,
                            glow *
                            0.11 *
                            pulse
                        );
                }

            `
        });

    const halo =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                3.8,
                4.7
            ),
            haloMaterial
        );

    halo.position.z = -0.08;

    avatar.add(halo);

    // --------------------------------------------------
    // PARTÍCULAS DE RECONSTRUCCIÓN
    // --------------------------------------------------

    const particleCount = 1300;

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );

    const particleSizes =
        new Float32Array(
            particleCount
        );

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const radius =
            1.2 +
            Math.random() * 1.5;

        const x =
            Math.cos(angle) *
            radius *
            0.72;

        const y =
            (
                Math.random() * 3.8
            ) - 1.8;

        const z =
            (
                Math.random() - 0.5
            ) * 0.7;

        particlePositions[
            i * 3
        ] = x;

        particlePositions[
            i * 3 + 1
        ] = y;

        particlePositions[
            i * 3 + 2
        ] = z;

        particleSizes[i] =
            1.0 +
            Math.random() * 2.5;
    }

    const particleGeometry =
        new THREE.BufferGeometry();

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );

    particleGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(
            particleSizes,
            1
        )
    );

    const particleMaterial =
        new THREE.ShaderMaterial({

            transparent: true,
            depthWrite: false,

            uniforms: {
                uTime: {
                    value: 0
                }
            },

            vertexShader: `

                attribute float size;

                uniform float uTime;

                void main() {

                    vec3 p =
                        position;

                    p.x +=
                        sin(
                            uTime * 0.5 +
                            position.y * 2.0
                        ) * 0.018;

                    p.y +=
                        cos(
                            uTime * 0.35 +
                            position.x * 2.0
                        ) * 0.012;

                    vec4 mvPosition =
                        modelViewMatrix *
                        vec4(
                            p,
                            1.0
                        );

                    gl_PointSize =
                        size *
                        (70.0 / -mvPosition.z);

                    gl_Position =
                        projectionMatrix *
                        mvPosition;
                }

            `,

            fragmentShader: `

                uniform float uTime;

                void main() {

                    vec2 p =
                        gl_PointCoord -
                        0.5;

                    float d =
                        length(p);

                    if (d > 0.5)
                        discard;

                    float pulse =
                        0.6 +
                        sin(
                            uTime * 2.0
                        ) * 0.2;

                    gl_FragColor =
                        vec4(
                            0.05,
                            0.75,
                            1.0,
                            (1.0 - d * 2.0)
                            * 0.45
                            * pulse
                        );
                }

            `
        });

    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    particles.position.z = 0.15;

    avatar.add(particles);

    // --------------------------------------------------
    // LÍNEAS DE ESCANEO
    // --------------------------------------------------

    const scanGroup =
        new THREE.Group();

    avatar.add(scanGroup);

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const lineGeometry =
            new THREE.BufferGeometry();

        const y =
            -1.8 +
            i * 0.5;

        const vertices =
            new Float32Array([
                -1.55, y, 0.22,
                1.55, y, 0.22
            ]);

        lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                vertices,
                3
            )
        );

        const lineMaterial =
            new THREE.LineBasicMaterial({
                color: 0x37dfff,
                transparent: true,
                opacity: 0.08
            });

        const line =
            new THREE.Line(
                lineGeometry,
                lineMaterial
            );

        scanGroup.add(line);
    }

    // --------------------------------------------------
    // MOUSE / PARALLAX
    // --------------------------------------------------

    const targetMouse =
        new THREE.Vector2(0, 0);

    const currentMouse =
        new THREE.Vector2(0, 0);

    window.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                container.getBoundingClientRect();

            targetMouse.x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                0.5;

            targetMouse.y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                0.5;

        }
    );

    // --------------------------------------------------
    // ANIMACIÓN
    // --------------------------------------------------

    const clock =
        new THREE.Clock();

    function animate() {

        requestAnimationFrame(
            animate
        );

        const time =
            clock.getElapsedTime();

        material.uniforms.uTime.value =
            time;

        material.uniforms.uMouse.value =
            currentMouse;

        haloMaterial.uniforms.uTime.value =
            time;

        particleMaterial.uniforms.uTime.value =
            time;

        // Suavizado del movimiento
        currentMouse.x +=
            (
                targetMouse.x -
                currentMouse.x
            ) * 0.035;

        currentMouse.y +=
            (
                targetMouse.y -
                currentMouse.y
            ) * 0.035;

        // Movimiento de "videollamada"
        avatar.rotation.y =
            currentMouse.x * 0.035;

        avatar.rotation.x =
            -currentMouse.y * 0.018;

        // Partículas flotando
        particles.rotation.y =
            Math.sin(
                time * 0.18
            ) * 0.025;

        particles.rotation.x =
            Math.sin(
                time * 0.13
            ) * 0.012;

        renderer.render(
            scene,
            camera
        );
    }

    // --------------------------------------------------
    // RESPONSIVE
    // --------------------------------------------------

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

        material.uniforms.uResolution.value
            .set(
                width,
                height
            );
    }

    window.addEventListener(
        "resize",
        resize
    );

    resize();

    animate();

    console.log(
        "Shirt AI — Digital Human System iniciado."
    );
}