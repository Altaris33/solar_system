export class Celest {
    constructor(r, material, demiGAxe, vRotation, vOrbitale, excentricite, textureLoader) {
        const geo = new THREE.SphereGeometry(r, 64, 64)
        const mat = material === null ? new THREE.MeshNormalMaterial() : material
        if (material === null)
            mat.wireframe = true
        this.mesh = new THREE.Mesh(geo, mat)

        this.group = new THREE.Group()
        this.group.add(this.mesh)

        this.mesh.position.x = demiGAxe
        this.vRotation = vRotation
        this.vOrbitale = vOrbitale / 5
        this.excentricite = excentricite
        this.demiGAxe = demiGAxe
        this.textureLoader = textureLoader
        //this.textureLoader = new THREE.TextureLoader().load(textureLoader)
    }

    get ellipse() {
        return this.calcEllipse()
    }

    calcEllipse() {
        let centerX = -this.demiGAxe * this.excentricite
        console.log(centerX)
        let demiPAxe = Math.sqrt(Math.pow(this.demiGAxe, 2) - Math.pow(this.demiGAxe * this.excentricite, 2))
        console.log(demiPAxe)

        const curve = new THREE.EllipseCurve(
            centerX, 0,
            this.demiGAxe, demiPAxe,
            0, 2*Math.PI,
            0,
            0
        )

        const points = curve.getPoints(100)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({color: 0xff0000})
        return new THREE.Line(geometry, material)
    }

}