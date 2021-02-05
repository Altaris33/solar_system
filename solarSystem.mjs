import OrbitControls from './orbitController.js'
import {Celest} from './Celest.mjs'

// Setup
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1000, 10000000000)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 10000
controls.maxDistance = 10000000000

// Helpers
const axis = new THREE.AxesHelper(1000000)
scene.add(axis)

//const sunRotation = new THREE.Vector3(-895.89643, 9959.78763, 0).normalize()
//const arrowHelper = new THREE.ArrowHelper(sunRotation, new THREE.Vector3(0, 0, 0), 10000, 0xffff00)
//scene.add(arrowHelper)

// Rayon en km, material, demi grand axe en km, vitesse de rotation en km/h, vitesse orbitale moyenne en km/s, excentricité, 
// inclinaison en degré, noeud ascendant en degré, argument du périhélie en degré
const sun = new Celest(696342, null, 0, 6688.355, 0, 0, 0, 0, 0)
const mercure = new Celest(2440, null, 57909050, 10.892, 47.362, 0.2056, 7, 48.33, 29.12)
const venus = new Celest(6052, null, 108209500, -6.52, 0, 0.00678, 3.39471, 76.68, 54.9)
const earth = new Celest(6378, null, 149597887.5, 1674.364, 0, 0.01671022, 0, 174.873, 288.064)
const moon = new Celest(1737, null, 149982286.5, 16.6572, 0, 0)
const mars = new Celest(3390, null, 227944000, 868.220, 0, 0.09339, 1.85, 49.6, 286.5)
const jupiter = new Celest(69911, null, 778340000, 47051, 0, 0.04839, 1.304, 100.5, 274.255)
const saturne = new Celest(58232, null, 1426700000, 34821, 0, 0.0539, 2.486, 113.7, 338.94)
const uranus = new Celest(25461, null, 2870700000, -9320, 0, 0.04726, 0.773, 74.02, 96.9)
const neptune = new Celest(24622, null, 4498400000, 9660, 0, 0.00859, 1.77, 131.784, 273.2)

scene.add(mercure.ellipse.orbite)
scene.add(venus.ellipse.orbite)
scene.add(earth.ellipse.orbite)
scene.add(mars.ellipse.orbite)
scene.add(jupiter.ellipse.orbite)
scene.add(saturne.ellipse.orbite)
scene.add(uranus.ellipse.orbite)
scene.add(neptune.ellipse.orbite)

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

camera.translateZ(1000000000)
camera.lookAt(sun.mesh.position)
renderer.render(scene, camera)

let start = null
function animate(t) {
    if (start === null) {
        start = t
    }

    let delai = t - start
    controls.update()

    sun.mesh.rotateY(sun.vRotation)

    //console.log(t)
    //console.log(delai)
    //console.log(mercure.speed)
    //console.log(mercure.ellipse.curve.getPointAt((delai * mercure.speed * 0.00001) % 1))
    //mercure.group.rotateY(0.1047 / 60)
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

requestAnimationFrame(animate)

function updateViewportSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

window.addEventListener("resize", updateViewportSize);