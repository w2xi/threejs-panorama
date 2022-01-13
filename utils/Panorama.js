import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


class Panorama 
{
  constructor(options = {}){
    this.three = {}
    this.options = options

    this.init()
  }

  init(){
    this.createScene()
    this.createCamera()
    this.createRenderer()
    this.creteOrbitControler()

    this.loop()

    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  createScene(){
    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0xf5f5f5)

    this.three.scene = scene
  }

  createCamera(){
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100)

    camera.position.z = 0.01

    this.three.camera = camera
  }

  createRenderer(){
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    this.options.container.appendChild(renderer.domElement)

    this.three.renderer = renderer
  }

  creteOrbitControler(){
    const { camera, renderer } = this.three
    const controler = new OrbitControls(camera, renderer.domElement)

    controler.enableZoom = false
    controler.enablePan = false
    controler.enableDamping = true
    controler.rotateSpeed = - 0.25

    this.three.controler = controler
  }

  loop(){
    const { scene, camera, renderer, controler } = this.three

    window.requestAnimationFrame(this.loop.bind(this))

    controler.update()
    renderer.render(scene, camera)
  }

  onWindowResize(){
    const { camera, renderer } = this.three

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

export default Panorama