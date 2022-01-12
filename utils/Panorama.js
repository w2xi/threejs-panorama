import * as THREE from 'three'

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

    this.loop()
  }

  createScene(){
    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0xf5f5f5)

    this.three.scene = scene
  }

  createCamera(){
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 1000)

    camera.position.set(80, 80, 80)
    camera.lookAt(this.three.scene.position)

    this.three.camera = camera
  }

  createRenderer(){
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    this.options.container.appendChild(renderer.domElement)

    this.three.renderer = renderer
  }

  loop(){
    const { scene, camera, renderer } = this.three

    window.requestAnimationFrame(this.loop.bind(this))

    renderer.render(scene, camera)
  }
}

export default Panorama