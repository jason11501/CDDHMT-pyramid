// Thiết lập Scene
const scene = new THREE.Scene();

// Thiết lập Camera
const camera = new THREE.PerspectiveCamera( 
    75, 
    window.innerWidth / window.innerHeight, 
    0.01, 
    1000
);

const camera2 = new THREE.PerspectiveCamera( 
    75, 
    window.innerWidth / window.innerHeight, 
    0.01, 
    1000
);


// Tọa độ Cam
camera.position.z = 8;
camera.position.y = .5;
camera.position.x = .5;
camera.lookAt(scene.position);

// camera2.position.set(0,0,0);

// Thiết lập Render
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    }
);
// renderer.setPixelRatio(window.devicePixelRatio);// bề mặt pyramid nét hơn
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xAAAAAA, 1.0);
document.body.appendChild( renderer.domElement );

//xoay camera
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
const controls = new OrbitControls( camera, renderer.domElement );
const controls2 = new OrbitControls( camera2, renderer.domElement );
//orbit control
controls.update();
controls2.update();
// Trục tọa độ
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//Nền
const background = new THREE.TextureLoader().load( "/background.png" );
scene.background = background

//Mặt đất
const groundSurface = new THREE.TextureLoader().load( "/sand.jpg" );
groundSurface.repeat.x=0.8
groundSurface.repeat.x=1
var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);//60 40 1 1
var planeMaterial = new THREE.MeshLambertMaterial({
    map: groundSurface
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 10;
plane.position.y = -1;
plane.position.z = .5;
scene.add(plane);

//Rọi đèn để thấy màu của mặt đất
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//Sương mù
scene.fog = new THREE.Fog( 0xefd1b5, 0.015, 25 );

//Kim tự tháp
const texture = new THREE.TextureLoader().load( "/pyramid.jpg" );// vân của kim tự tháp
const geometry = new THREE.ConeGeometry( 1.3, 2, 4 ); // bề rộng của đáy 1.3, độ cao, số mặt bên
const material = new THREE.MeshBasicMaterial( {map: texture} ); //dán hình lên bề mặt
const cone = new THREE.Mesh( geometry, material );
cone.position.set(-1, 0, 2);
scene.add( cone );

const geometry2 = new THREE.ConeGeometry( 2.3, 2.5, 4 );
const material2 = new THREE.MeshBasicMaterial( {map: texture} );
const cone2 = new THREE.Mesh( geometry2, material2 );
cone2.position.set(0, 0.25, -2.35);
scene.add( cone2 );

const geometry3 = new THREE.ConeGeometry( 1.3, 2, 4 );
const material3 = new THREE.MeshBasicMaterial( {map: texture} );
const cone3 = new THREE.Mesh( geometry3, material3 );
cone3.position.set(1, 0, -7);//2 0 -6
scene.add( cone3 );

// máy bay
//import * as THREE from 'three';
//THƯ VIỆN
import { OBJLoader } from "https://threejs.org/examples/jsm/loaders/OBJLoader.js";

const clock = new THREE.Clock();
let object
//model
const loader = new OBJLoader();
loader.load( 'airplane.obj', function ( obj ) {

    object = obj;
    object.scale.multiplyScalar( 0.8 );
    object.scale.setScalar( 0.0021 );//0.0021
    object.position.y = 3.5;//-30 //3.5
    object.position.z = 2.3;//70
    object.position.x = 0;
    camera2.position.x= 0
    camera2.position.y= 3.5
    camera2.position.z= 2.3
    scene.add( object );

} );
const sphere = new THREE.SphereGeometry( 0.5, 16, 8 );
//lights
var light1 = new THREE.PointLight( 0xff0040, 2, 50 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
scene.add( light1 );

var light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
scene.add( light2 );

var light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
scene.add( light3 );

var light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
scene.add( light4 );

function animate() { 
    requestAnimationFrame(animate);
    
	//máy bay
    const time = Date.now() * 0.0005;
    const delta = clock.getDelta();

    if ( object ) {
        // object.rotation.y -= 0.2 * delta;
        // camera2.position.y-= 0.2 * delta;
    
        object.position.x = Math.sin( time * 3 ) * 3; //sin 3 3
        camera2.position.x = Math.sin( time * 3 ) * 3
        // object.position.y = Math.sin( time * 7 ) * 3;
        object.position.z = -Math.sin( time * 3 ) * 13;
        camera2.position.z = -Math.sin( time * 3 ) * 13//-sin 3 13
        
    }

    light1.position.x = Math.sin( time * 0.7 ) * 30;
    light1.position.y = Math.cos( time * 0.5 ) * 40;
    light1.position.z = Math.cos( time * 0.3 ) * 30;

    light2.position.x = Math.cos( time * 0.3 ) * 30;
    light2.position.y = Math.sin( time * 0.5 ) * 40;
    light2.position.z = Math.sin( time * 0.7 ) * 30;

    light3.position.x = Math.sin( time * 0.7 ) * 30;
    light3.position.y = Math.cos( time * 0.3 ) * 40;
    light3.position.z = Math.sin( time * 0.5 ) * 30;

    light4.position.x = Math.sin( time * 0.3 ) * 30;
    light4.position.y = Math.cos( time * 0.7 ) * 40;
    light4.position.z = Math.sin( time * 0.5 ) * 30;
    
    controls.update();//orbit control
    controls2.update();

    addEventListener("keyup",function(event){
        if (event.code=="Digit1")
        {
            renderer.render(scene,camera);
        }
        else if (event.code=="Digit2")
        {
            renderer.render(scene,camera2);
        }
    });
    renderer.render(scene,camera2);
    
}

animate();