console.log("Viewer loaded");

const viewer =
    document.getElementById("viewer");

viewer.innerHTML = "";

const canvas =
    document.createElement("canvas");

viewer.appendChild(canvas);

const ctx =
    canvas.getContext("2d");

function resize(){

        canvas.width =
            viewer.clientWidth;

        canvas.height =
            viewer.clientHeight;
}

resize();

window.addEventListener(
    "resize",
    resize
);

let angle = 0;

function animate(){

    resize();

    ctx.fillStyle =
        "#202020";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.save();

    ctx.translate(
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.rotate(angle);

    ctx.fillStyle =
        "#00aaff";

    ctx.fillRect(
        -50,
        -50,
        100,
        100
    );

    ctx.restore();

    angle += 0.01;

    requestAnimationFrame(
        animate
    );

}

animate();