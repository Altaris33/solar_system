export class Celest {
    constructor(r, material, demiGAxe, vRotation, vOrbitale) {
        const geo = new THREE.SphereGeometry(r, 64, 64)
        const mat = material === null ? new THREE.MeshNormalMaterial() : material
        if (material === null)
            mat.wireframe = true
        this.mesh = new THREE.Mesh(geo, mat)

        this.group = new THREE.Group()
        this.group.add(this.mesh)

        this.mesh.position.x = demiGAxe / 5
        this.vRotation = vRotation
        this.vOrbitale = vOrbitale / 5
    }
}