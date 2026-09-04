// ============================================================
// SHIRT AI
// 2D CODED AVATAR
// ============================================================

const canvas = document.getElementById("avatarCanvas");

if (!canvas) {
    console.error("Shirt AI: avatarCanvas no encontrado.");
} else {

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;

    // ========================================================
    // AVATAR STATE
    // ========================================================

    const avatar = {

        // posición
        x: 0,
        y: 0,

        // escala
        scale: 1,

        // animación
        blink: 0,
        blinkTimer: 0,

        mouth: 0,

        // expresión
        expression: "neutral",

        // movimiento
        headX: 0,
        headY: 0,

        targetHeadX: 0,
        targetHeadY: 0

    };


    // ========================================================
    // RESIZE
    // ========================================================

    function resize() {

        const container = canvas.parentElement;

        width = container.clientWidth;
        height = container.clientHeight;

        if (width <= 0 || height <= 0) {
            return;
        }

        const dpr =
            Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );
    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();


    // ========================================================
    // UTILITY
    // ========================================================

    function lerp(a, b, amount) {
        return a + (b - a) * amount;
    }


    function roundedRect(
        x,
        y,
        w,
        h,
        r
    ) {

        ctx.beginPath();

        ctx.roundRect(
            x,
            y,
            w,
            h,
            r
        );

        ctx.fill();
    }


    // ========================================================
    // HAIR
    // ========================================================

    function drawHair(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        /*
         * Main afro silhouette
         */

        ctx.fillStyle = "#11100f";

        ctx.beginPath();

        ctx.arc(
            0,
            -80,
            155,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /*
         * Additional volume
         */

        const curls = [

            [-120, -120, 45],
            [-145, -70, 42],
            [-135, -15, 38],

            [-100, -155, 43],
            [-55, -175, 45],
            [0, -180, 48],

            [55, -170, 45],
            [105, -145, 43],
            [135, -100, 42],

            [145, -45, 40],
            [135, 10, 35],

            [-115, 30, 38],
            [100, 30, 38]
        ];


        for (const curl of curls) {

            ctx.beginPath();

            ctx.arc(
                curl[0],
                curl[1],
                curl[2],
                0,
                Math.PI * 2
            );

            ctx.fill();
        }


        /*
         * Individual curls
         */

        ctx.strokeStyle = "#292725";
        ctx.lineWidth = 2;

        for (
            let i = 0;
            i < 220;
            i++
        ) {

            const angle =
                i * 2.399;

            const radius =
                50 +
                (i % 12) * 8;

            const cx =
                Math.cos(angle) *
                radius;

            const cy =
                -105 +
                Math.sin(angle) *
                radius * 0.75;

            ctx.beginPath();

            for (
                let j = 0;
                j < 8;
                j++
            ) {

                const t =
                    j / 7;

                const xx =
                    cx +
                    Math.sin(
                        t * Math.PI * 4
                    ) * 5;

                const yy =
                    cy +
                    t * 13;

                if (j === 0) {
                    ctx.moveTo(
                        xx,
                        yy
                    );
                } else {
                    ctx.lineTo(
                        xx,
                        yy
                    );
                }
            }

            ctx.stroke();
        }


        ctx.restore();
    }


    // ========================================================
    // HEAD
    // ========================================================

    function drawHead(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);


        /*
         * Face gradient
         */

        const skin =
            ctx.createRadialGradient(
                -20,
                -35,
                20,
                0,
                0,
                150
            );

        skin.addColorStop(
            0,
            "#d99a79"
        );

        skin.addColorStop(
            0.65,
            "#c98467"
        );

        skin.addColorStop(
            1,
            "#b97159"
        );


        ctx.fillStyle = skin;


        /*
         * Face shape
         */

        ctx.beginPath();

        ctx.moveTo(
            -90,
            -65
        );

        ctx.bezierCurveTo(
            -100,
            -10,
            -92,
            80,
            -55,
            115
        );

        ctx.bezierCurveTo(
            -25,
            145,
            25,
            145,
            55,
            115
        );

        ctx.bezierCurveTo(
            92,
            80,
            100,
            -10,
            90,
            -65
        );

        ctx.bezierCurveTo(
            70,
            -125,
            -70,
            -125,
            -90,
            -65
        );

        ctx.closePath();

        ctx.fill();


        ctx.restore();
    }


    // ========================================================
    // EARS
    // ========================================================

    function drawEars(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.fillStyle = "#c98467";

        ctx.beginPath();

        ctx.ellipse(
            -88,
            0,
            18,
            35,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.beginPath();

        ctx.ellipse(
            88,
            0,
            18,
            35,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }


    // ========================================================
    // EYEBROWS
    // ========================================================

    function drawEyebrows(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.strokeStyle = "#34251f";

        ctx.lineWidth = 5;

        ctx.lineCap = "round";


        // left

        ctx.beginPath();

        ctx.moveTo(
            -62,
            -35
        );

        ctx.quadraticCurveTo(
            -35,
            -48,
            -8,
            -38
        );

        ctx.stroke();


        // right

        ctx.beginPath();

        ctx.moveTo(
            8,
            -38
        );

        ctx.quadraticCurveTo(
            35,
            -48,
            62,
            -35
        );

        ctx.stroke();


        ctx.restore();
    }


    // ========================================================
    // EYES
    // ========================================================

    function drawEye(
        x,
        y,
        scale,
        side
    ) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);


        /*
         * Eye white
         */

        ctx.fillStyle = "#f7f4f1";

        ctx.beginPath();

        ctx.ellipse(
            side * 32,
            0,
            29,
            17,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /*
         * Iris
         */

        ctx.fillStyle = "#4b2e20";

        ctx.beginPath();

        ctx.arc(
            side * 32 +
            avatar.headX * 8,
            avatar.headY * 5,
            10,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /*
         * pupil
         */

        ctx.fillStyle = "#16110f";

        ctx.beginPath();

        ctx.arc(
            side * 32 +
            avatar.headX * 8,
            avatar.headY * 5,
            5,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /*
         * eye highlight
         */

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.arc(
            side * 29,
            -4,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /*
         * eyelid
         */

        ctx.strokeStyle = "#714a3a";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.ellipse(
            side * 32,
            0,
            29,
            17,
            0,
            Math.PI,
            Math.PI * 2
        );

        ctx.stroke();


        ctx.restore();
    }


    function drawEyes(x, y, scale) {

        const blink =
            avatar.blink;

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(
            scale,
            scale
        );


        if (blink < 0.85) {

            drawEye(
                0,
                0,
                1,
                -1
            );

            drawEye(
                0,
                0,
                1,
                1
            );

        } else {

            ctx.strokeStyle =
                "#694639";

            ctx.lineWidth = 4;

            ctx.lineCap =
                "round";

            ctx.beginPath();

            ctx.moveTo(
                -60,
                0
            );

            ctx.quadraticCurveTo(
                -32,
                7,
                -5,
                0
            );

            ctx.stroke();


            ctx.beginPath();

            ctx.moveTo(
                5,
                0
            );

            ctx.quadraticCurveTo(
                32,
                7,
                60,
                0
            );

            ctx.stroke();
        }


        ctx.restore();
    }


    // ========================================================
    // NOSE
    // ========================================================

    function drawNose(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.strokeStyle =
            "rgba(120,70,55,0.55)";

        ctx.lineWidth = 2;

        ctx.lineCap =
            "round";


        ctx.beginPath();

        ctx.moveTo(
            0,
            -5
        );

        ctx.quadraticCurveTo(
            -4,
            18,
            -11,
            30
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            -15,
            31
        );

        ctx.quadraticCurveTo(
            0,
            40,
            15,
            31
        );

        ctx.stroke();


        ctx.restore();
    }


    // ========================================================
    // MOUTH
    // ========================================================

    function drawMouth(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);


        const smile =
            avatar.expression === "happy"
                ? 7
                : 0;


        /*
         * Lips
         */

        ctx.fillStyle =
            "#a85f61";


        ctx.beginPath();

        ctx.moveTo(
            -32,
            0
        );

        ctx.quadraticCurveTo(
            -16,
            -7 - smile,
            0,
            0
        );

        ctx.quadraticCurveTo(
            16,
            -7 - smile,
            32,
            0
        );

        ctx.quadraticCurveTo(
            15,
            12 + smile,
            0,
            13 + smile
        );

        ctx.quadraticCurveTo(
            -15,
            12 + smile,
            -32,
            0
        );

        ctx.fill();


        /*
         * Mouth separation
         */

        ctx.strokeStyle =
            "#713e43";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(
            -25,
            1
        );

        ctx.quadraticCurveTo(
            0,
            5,
            25,
            1
        );

        ctx.stroke();


        ctx.restore();
    }


    // ========================================================
    // HEADBAND
    // ========================================================

    function drawHeadband(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.strokeStyle =
            "#161616";

        ctx.lineWidth = 7;

        ctx.beginPath();

        ctx.arc(
            0,
            -20,
            82,
            Math.PI * 1.12,
            Math.PI * 1.88
        );

        ctx.stroke();


        /*
         * white dots
         */

        ctx.fillStyle =
            "#f5f5f5";


        const dots = [
            [-60, -58],
            [-42, -69],
            [-20, -77],
            [5, -80],
            [30, -75],
            [52, -63],
            [66, -48]
        ];


        for (const dot of dots) {

            ctx.beginPath();

            ctx.arc(
                dot[0],
                dot[1],
                3.5,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }


        ctx.restore();
    }


    // ========================================================
    // NECK
    // ========================================================

    function drawNeck(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.fillStyle =
            "#b9785e";


        ctx.beginPath();

        ctx.roundRect(
            -45,
            -20,
            90,
            100,
            25
        );

        ctx.fill();


        ctx.restore();
    }


    // ========================================================
    // SWEATER
    // ========================================================

    function drawSweater(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);


        /*
         * body
         */

        ctx.fillStyle =
            "#f4f3f1";


        ctx.beginPath();

        ctx.moveTo(
            -170,
            120
        );

        ctx.quadraticCurveTo(
            -150,
            75,
            -100,
            60
        );

        ctx.lineTo(
            100,
            60
        );

        ctx.quadraticCurveTo(
            150,
            75,
            170,
            120
        );

        ctx.lineTo(
            190,
            300
        );

        ctx.lineTo(
            -190,
            300
        );

        ctx.closePath();

        ctx.fill();


        /*
         * turtleneck
         */

        ctx.fillStyle =
            "#e9e8e6";


        ctx.beginPath();

        ctx.roundRect(
            -92,
            40,
            184,
            65,
            30
        );

        ctx.fill();


        /*
         * sweater ribs
         */

        ctx.strokeStyle =
            "#d7d5d2";

        ctx.lineWidth = 2;

        for (
            let i = -150;
            i <= 150;
            i += 9
        ) {

            ctx.beginPath();

            ctx.moveTo(
                i,
                110
            );

            ctx.lineTo(
                i,
                295
            );

            ctx.stroke();
        }


        ctx.restore();
    }


    // ========================================================
    // COMPLETE AVATAR
    // ========================================================

    function drawAvatar() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
         * Responsive scale
         */

        const scale =
            Math.min(
                width / 500,
                height / 620
            );


        const cx =
            width / 2;


        const cy =
            height / 2 +
            70;


        /*
         * body first
         */

        drawSweater(
            cx,
            cy + 100,
            scale
        );


        drawNeck(
            cx,
            cy + 25,
            scale
        );


        /*
         * ears
         */

        drawEars(
            cx + avatar.headX * 8,
            cy - 60 +
            avatar.headY * 8,
            scale
        );


        /*
         * hair behind face
         */

        drawHair(
            cx,
            cy - 75,
            scale
        );


        /*
         * face
         */

        drawHead(
            cx + avatar.headX * 8,
            cy - 60 +
            avatar.headY * 8,
            scale
        );


        /*
         * face details
         */

        drawEyebrows(
            cx + avatar.headX * 8,
            cy - 60 +
            avatar.headY * 8,
            scale
        );


        drawEyes(
            cx + avatar.headX * 8,
            cy - 60 +
            avatar.headY * 8,
            scale
        );


        drawNose(
            cx + avatar.headX * 8,
            cy - 25 +
            avatar.headY * 8,
            scale
        );


        drawMouth(
            cx + avatar.headX * 8,
            cy + 15 +
            avatar.headY * 8,
            scale
        );


        /*
         * headband over hair
         */

        drawHeadband(
            cx,
            cy - 60,
            scale
        );
    }


    // ========================================================
    // BLINK SYSTEM
    // ========================================================

    function updateBlink(delta) {

        avatar.blinkTimer += delta;

        if (
            avatar.blinkTimer >
            3.5
        ) {

            avatar.blink = 1;

            setTimeout(() => {

                avatar.blink = 0;

            }, 130);

            avatar.blinkTimer = 0;
        }
    }


    // ========================================================
    // HEAD MOVEMENT
    // ========================================================

    function updateHead(delta) {

        avatar.headX =
            lerp(
                avatar.headX,
                avatar.targetHeadX,
                delta * 4
            );


        avatar.headY =
            lerp(
                avatar.headY,
                avatar.targetHeadY,
                delta * 4
            );
    }


    // ========================================================
    // ANIMATION LOOP
    // ========================================================

    let lastTime =
        performance.now();


    function animate(now) {

        const delta =
            (now - lastTime) / 1000;

        lastTime = now;


        updateBlink(
            delta
        );


        updateHead(
            delta
        );


        drawAvatar();


        requestAnimationFrame(
            animate
        );
    }


    requestAnimationFrame(
        animate
    );


    // ========================================================
    // PUBLIC API
    // ========================================================

    window.ShirtAIAvatar = {

        smile() {

            avatar.expression =
                "happy";
        },


        neutral() {

            avatar.expression =
                "neutral";
        },


        lookAt(x, y) {

            avatar.targetHeadX =
                Math.max(
                    -1,
                    Math.min(1, x)
                );

            avatar.targetHeadY =
                Math.max(
                    -1,
                    Math.min(1, y)
                );
        },


        blink() {

            avatar.blink = 1;

            setTimeout(() => {

                avatar.blink = 0;

            }, 130);
        },


        reset() {

            avatar.expression =
                "neutral";

            avatar.targetHeadX =
                0;

            avatar.targetHeadY =
                0;
        }

    };


    console.log(
        "Shirt AI 2D Avatar iniciado."
    );
}