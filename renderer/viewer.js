import * as THREE from '../node_modules/three/build/three.module.js';
//import { OrbitControls }
//from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

console.log("Viewer loaded");

const viewer =
    document.getElementById("viewer");

viewer.innerHTML = "";

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x202020);

const camera =
    new THREE.PerspectiveCamera(
        60,
        viewer.clientWidth / viewer.clientHeight,
        0.1,
        1000
    );

camera.position.z = 5;

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
        viewer.clientWidth,
        viewer.clientHeight
);

viewer.appendChild(
    renderer.domElement
);

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        1
    )
);

const light =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

light.position.set(
    2,
    2,
    2
);

scene.add(light);

//const controls =
//    new OrbitControls(
//        camera,
//        renderer.domElement
//    );

//controls.enableDamping = true;

const cube =
    new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshPhongMaterial({
            color: 0x00aaff
        })
    );

scene.add(cube);

function resize(){

    camera.aspect =
        viewer.clientWidth /
        viewer.clientHeight;
    
    camera.updateProjectionMatrix();

    renderer.setSize(
        viewer.clientWidth,
        viewer.clientHeight
    );

}

window.addEventListener(
    "resize",
    resize
);

function animate(){

    requestAnimationFrame(
        animate
    );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

//    controls.update();

    renderer.render(
        scene,
        camera
    );

}

resize();

animate();