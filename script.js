import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";


import {OrbitControls} from
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";



const scene =
new THREE.Scene();


scene.background =
new THREE.Color(0x222222);



const camera =
new THREE.PerspectiveCamera(
45,
window.innerWidth/500,
0.1,
1000
);


camera.position.z=5;



const renderer =
new THREE.WebGLRenderer();


renderer.setSize(
window.innerWidth,
500
);


document.getElementById("scene")
.appendChild(renderer.domElement);



const controls =
new OrbitControls(
camera,
renderer.domElement
);



/*
LEGO HEART PLACEHOLDER

Each cube represents
a LEGO brick

*/


let bricks=[];



function createBrick(x,y,z,color,name,description){


let geometry =
new THREE.BoxGeometry(
0.5,
0.5,
0.5
);


let material =
new THREE.MeshBasicMaterial(
{
color:color
}
);



let brick =
new THREE.Mesh(
geometry,
material
);



brick.position.set(
x,y,z
);



brick.name=name;

brick.userData.description=
description;



scene.add(brick);

bricks.push(brick);



}



createBrick(
0,
0,
0,
0xff0000,
"Heart Muscle",
"These LEGO pieces represent cardiac muscle cells that contract and pump blood."
);



createBrick(
0.6,
0,
0,
0xff0000,
"Heart Tissue",
"Healthy heart tissue is organized and works together to maintain circulation."
);



createBrick(
-0.6,
0,
0,
0x9b59b6,
"Tumor Cell",
"This abnormal LEGO piece represents uncontrolled cell growth caused by cancer."
);



createBrick(
0,
0.6,
0,
0x3498db,
"Blood Vessel",
"Blood vessels transport oxygen and nutrients throughout the body."
);



/*
CLICK DETECTION
*/


const raycaster =
new THREE.Raycaster();


const mouse =
new THREE.Vector2();



window.addEventListener(
"click",
(event)=>{


mouse.x =
(event.clientX/window.innerWidth)*2-1;


mouse.y =
-(event.clientY/500)*2+1;



raycaster.setFromCamera(
mouse,
camera
);



let hits =
raycaster.intersectObjects(bricks);



if(hits.length>0){


let brick =
hits[0].object;


document.getElementById("info")
.innerHTML=

`
<h2>${brick.name}</h2>

<p>
${brick.userData.description}
</p>
`;

}


});




function animate(){

requestAnimationFrame(animate);

renderer.render(
scene,
camera
);

}

animate();
