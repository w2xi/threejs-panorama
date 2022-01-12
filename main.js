import './style.css'
import Panorama from './utils/Panorama'
import * as THREE from 'three'
import bg from './assets/bg.png'

const panoramaIns = new Panorama({
  container: document.getElementById('app')
})

const loader = new THREE.TextureLoader()
const sphereGeometry = new THREE.SphereGeometry(100, 60, 60)
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: loader.load(bg)
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

sphere.scale.set(-1, 1, 1)

const { scene } = panoramaIns.three

scene.add(sphere)
scene.add(new THREE.AxesHelper(50))


