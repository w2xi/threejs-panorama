import './style.css'
import Panorama from './utils/Panorama'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import bg from './assets/sun_temple_stripe.jpg'
import bg from './assets/panorama-demo.jpg'

// const panoramaIns = new Panorama({
//   container: document.getElementById('app')
// })

let camera, controls;
let renderer;
let scene;

init();
animate();

function init() {

  const container = document.getElementById('app');

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 500 );
  camera.position.z = 0.01;

  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.rotateSpeed = -0.25;

  const geometry = new THREE.SphereGeometry( 500, 60, 40 );
  const texture = new THREE.TextureLoader().load(bg)
	const material = new THREE.MeshBasicMaterial( { map: texture } );
  const mesh = new THREE.Mesh( geometry, material );
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale( - 1, 1, 1 );

  scene.add( mesh );

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  controls.update(); // required when damping is enabled

  renderer.render( scene, camera );

}
