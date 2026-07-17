import * as THREE from 'three';

import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import {
    STLLoader
} from 'three/examples/jsm/loaders/STLLoader.js';

console.log("Viewer loaded");

const viewer =
    document.getElementById("viewer");

viewer.innerHTML = "";

const dimX =
    document.getElementById("dimX");

const dimY =
    document.getElementById("dimY");

const dimZ =
    document.getElementById("dimZ");

let currentMesh = null;

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

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping = true;

function fitCamera(mesh){
    const box =
        new THREE.Box3()
            .setFromObject(mesh);

    const size =
        box.getSize(
            new THREE.Vector3()
        );

    dimX.textContent =
        `X: ${size.x.toFixed(2)} mm`;

    dimY.textContent =
        `Y: ${size.y.toFixed(2)} mm`;

    dimZ.textContent =
        `Z: ${size.z.toFixed(2)} mm`;

    const maxDim =
        Math.max(
            size.x,
            size.y,
            size.z
        );
    
    camera.position.set(
        0,
        0,
        maxDim * 2.5
    );

    controls.target.set(
        0,
        0,
        0
    );

    controls.update();

}

function loadSTL(buffer){

    console.log(
        "Loading STL...",
        buffer.byteLength
    );

    if(currentMesh){

        scene.remove(currentMesh);

        currentMesh.geometry.dispose();
        currentMesh.material.dispose();

    }

    const loader =
        new STLLoader();

    const geometry =
        loader.parse(buffer);

    geometry.computeVertexNormals();
    geometry.center();

    const material =
        new THREE.MeshPhongMaterial({
            color: 0xd0d0d0,
            shininess: 80
        });

    currentMesh =
        new THREE.Mesh(
            geometry,
            material
        );

    scene.add(currentMesh);

    console.log(
        "Mesh added"
    );

    fitCamera(currentMesh);

}

//const cube =
//    new THREE.Mesh(
//        new THREE.BoxGeometry(),
//        new THREE.MeshPhongMaterial({
//            color: 0x00aaff
//        })
//    );

//scene.add(cube);

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

//    cube.rotation.x += 0.01;
//    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(
        scene,
        camera
    );

}

resize();

animate();

window.loadSTLBuffer = loadSTL;