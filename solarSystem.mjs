import OrbitControls from './orbitController.js'
import {Celest} from './Celest.mjs'

// Setup
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10000, 100000000)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 100000
controls.maxDistance = 100000000

// Helpers
const axis = new THREE.AxesHelper(1000000)
scene.add(axis)

//const sunRotation = new THREE.Vector3(-895.89643, 9959.78763, 0).normalize()
//const arrowHelper = new THREE.ArrowHelper(sunRotation, new THREE.Vector3(0, 0, 0), 10000, 0xffff00)
//scene.add(arrowHelper)

// Rayon en km, material, demi grand axe en km, vitesse de rotation en km/h, vitesse orbitale moyenne en km/s
const sun = new Celest(696342, null, 0, 6688.355, 0, 0) // Valeur approximative calculée par moi même
const mercure = new Celest(2440, null, 5790905, 10.892, 47.362, 0.2056)
const venus = new Celest(6052, null, 10820950, -6.52, 0, 0.00678)
const earth = new Celest(6378, null, 14959788.75, 1674.364, 0, 0.01671022)
const moon = new Celest(1737, null, 14998228.65, 16.6572, 0, 0)
const mars = new Celest(3390, null, 22794400, 868.220, 0, 0.09339)
const jupiter = new Celest(69911, null, 77834000, 47051, 0, 0.04839)
const saturne = new Celest(58232, null, 142670000, 34821, 0, 0.0539)
const uranus = new Celest(25461, null, 287070000, -9320, 0, 0.04726)
const neptune = new Celest(24622, null, 449840000, 9660, 0, 0.00859)

scene.add(mercure.ellipse)
scene.add(venus.ellipse)
scene.add(earth.ellipse)
scene.add(mars.ellipse)
scene.add(jupiter.ellipse)
scene.add(saturne.ellipse)
scene.add(uranus.ellipse)
scene.add(neptune.ellipse)

// Add to scenes
scene.add(sun.mesh)
scene.add(mercure.group)
scene.add(venus.group)
scene.add(earth.group)
scene.add(moon.group)
scene.add(mars.group)
scene.add(jupiter.group)
scene.add(saturne.group)
scene.add(uranus.group)
scene.add(neptune.group)

let ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)
//let directionalLight = new THREE.DirectionalLight(0xffdddd, 0.8)
//directionalLight.position.set(-50000, 5000, 0)
//scene.add(directionalLight)

camera.translateZ(10000000)
camera.lookAt(sun.mesh.position)
renderer.render(scene, camera)

function animate() {
    controls.update()

    sun.mesh.rotateY(sun.vRotation)
    
    mercure.group.rotateY(0.1047 / 60) // Crée 2 objets qui tournent autour du soleil, ne sais pas encore pourquoi
    mercure.mesh.rotateY(mercure.vRotation)
    
    venus.mesh.rotateY(venus.vRotation)
    
    earth.mesh.rotateY(earth.vRotation)
    
    moon.mesh.rotateY(moon.vRotation)
    
    mars.mesh.rotateY(mars.vRotation)
    
    jupiter.mesh.rotateY(jupiter.vRotation)
    
    saturne.mesh.rotateY(saturne.vRotation)
    
    uranus.mesh.rotateY(uranus.vRotation)
    
    neptune.mesh.rotateY(neptune.vRotation)
    
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()

function updateViewportSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

window.addEventListener("resize", updateViewportSize);