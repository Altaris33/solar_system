export class Celest {
    mesh;
    demiGAxe;
    vRotation;
    vOrbitale;
    excentricite;
    inclinaison;
    noeudAsc;
    argPerihelie;
    group;

    constructor(r, material, demiGAxe, vRotation, vOrbitale, excentricite, inclinaison, noeudAsc, argPerihelie) {
        const geo = new THREE.SphereGeometry(r, 64, 64)
        const mat = material === null ? new THREE.MeshNormalMaterial() : material
        if (material === null)
            mat.wireframe = true

        this.mesh = new THREE.Mesh(geo, mat)
        this.group = new THREE.Group()
        this.group.add(this.mesh)

        this.mesh.position.x = demiGAxe

        this.demiGAxe = demiGAxe
        this.vRotation = vRotation
        this.vOrbitale = vOrbitale
        this.excentricite = excentricite
        this.inclinaison = inclinaison
        this.noeudAsc = noeudAsc
        this.argPerihelie = argPerihelie
    }

    get ellipse() {
        return this.calcEllipse()
    }

    get speed() {
        return this.speedAtt()
    }

    calcEllipse() {
        let centerX = -this.demiGAxe * this.excentricite
        let demiPAxe = Math.sqrt(Math.pow(this.demiGAxe, 2) - Math.pow(this.demiGAxe * this.excentricite, 2))

        const curve = new THREE.EllipseCurve(
            centerX, 0,
            this.demiGAxe, demiPAxe,
            0, 2*Math.PI,
            0,
            THREE.Math.degToRad(this.argPerihelie)
        )

        const points = curve.getPoints(10000)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({color: 0xff0000})
        let orbite = new THREE.Line(geometry, material)
        orbite.rotateY(THREE.Math.degToRad(this.noeudAsc))
        orbite.rotateZ(THREE.Math.degToRad(this.inclinaison))
        orbite.rotateX(THREE.Math.degToRad(90))
        return {orbite, curve}
    }

    speedAtt() {
        const µ = 132712440018 // Paramètre gravitationnel standard du soleil en km^3 s^-2
        const posSun = new THREE.Vector3(0, 0, 0)

        let d = posSun.distanceTo(this.mesh.position)
        let v = Math.sqrt(µ * (2/d - 1/this.demiGAxe))
        return v
    }

}