import * as THREE from 'three';

// Esta funcion agrega los marcadores a la esfera para las ciudades
export function addCityMarker(lat, lon, name = '', sceneObj) {
    const radius = 4.02;
    const latRad = THREE.MathUtils.degToRad(lat);
    const lonRad = THREE.MathUtils.degToRad(lon);

    const x = radius * Math.cos(latRad) * Math.sin(lonRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.cos(lonRad);

    const markerGeometry = new THREE.SphereGeometry(0.07, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(x, y, z);
    marker.name = name;
    sceneObj.add(marker);

    if (name) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256*1.2;
        canvas.height = 64*1.2;
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText(name, 10, 40);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false, transparent: true });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(1.5, 0.4, 1);
        sprite.renderOrder = 0; 
        sprite.position.set(x, y, z);
        sceneObj.add(sprite);
    }
    return marker;
}
