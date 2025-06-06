import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {addCityMarker} from './add_markers.js';
import { dijkstra } from './dijkstra.js';
import { cityData } from './cities.js';

// Detalles de la escena
const canvas = document.querySelector('canvas.webgl'); // Canvas HTML donde se muestra la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set background color to black

// Factores de redimensionamiento (para ajustar el tamaño de la escena)
const resize_factorX = 1.5;
const resize_factorY = 1.5; 
const sizes = {
  width: window.innerWidth/resize_factorX,
  height: window.innerHeight/resize_factorY
};

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

// - / - / - / - / - / - / - / - / - COLOCAR EL CODIGO AQUÍ - / - / - / - / - / - / - / - / -

// Camera setup
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 1000);
scene.add(camera);
camera.position.z = 15;

// Sphere earth texture
const tLoader = new THREE.TextureLoader();
const earthTexture = tLoader.load('static/wmap2.png');
earthTexture.minFilter = THREE.LinearFilter; // Set minFilter to LinearFilter for better quality

// Creating the sphere
const sphere_geometry = new THREE.SphereGeometry(4, 32, 32);
const sphere_material = new THREE.MeshStandardMaterial({map: earthTexture, wireframe: false}); // Green color for the sphere
const sphere = new THREE.Mesh(sphere_geometry, sphere_material);
sphere.rotation.y = 4.7 // Offset align

// Lighting setup
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
const lightPivot = new THREE.Object3D();
lightPivot.add(sunLight);
sunLight.position.set(0, 0.5, 3); // Position the ambient light
scene.add(lightPivot);
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft white light
scene.add(ambientLight);

// GUI for light intensity (deprecated ya no se necesita)
const gui = new dat.GUI();
const lightFolder = gui.addFolder('Light Controls');
const lightPos = gui.addFolder('Light Position');
lightFolder.add(sunLight, 'intensity', 0, 3).name('Intensity');
lightFolder.open();
lightPos.add(sunLight.position, 'x', -10, 10).name('X Position');
lightPos.add(sunLight.position, 'y', -10, 10).name('Y Position');
lightPos.add(sunLight.position, 'z', -10, 10).name('Z Position');
lightPos.open();

// Assemble the scene --------------- ////
const pivot = new THREE.Object3D();
scene.add(pivot);
pivot.add(sphere);


const graph = {}; // Grafo de ciudades /> GRAFO </ 
const cityPositions = {}; // Para guardar Vector3 de cada ciudad /> TABLA DE DISPERSION </
const markers = []; // Para guardar los marcadores de las ciudades y cambiar su color al seleccionar

// Primero se crean las ciudades
for (const city of cityData) {
  if (!graph[city.name]) graph[city.name] = {};
}

// Luego se añade las conexiones bidireccionales
for (const city of cityData) {
  for (const neighbor of city.neighbors) {
    graph[city.name][neighbor.name] = neighbor.weight; // Añadir los vecinos y sus pesos al grafo
    // Añadir también la conexión inversa si no existe
    if (!graph[neighbor.name]) graph[neighbor.name] = {};
    if (!graph[neighbor.name][city.name]) {
      graph[neighbor.name][city.name] = neighbor.weight;
    }
  }
    // Añadir marcador
  const marker = addCityMarker(city.lat, city.lon, city.name, pivot);
  markers[city.name] = marker; // Guardar el marcador para poder cambiar su color después

  // Guardar posición 3D para luego dibujar rutas
  cityPositions[city.name] = marker.position.clone();
}

// Controlar la esfera con el mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth controls





// - / - / - / - / - / - / - / - / - FIN DE LA ZONA CODIGO - / - / - / - / - / - / - / - / -
// ------ RENDERIZADO Y ANIMACIÓN ------ //
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animate
function animate() {
    controls.update(); // Required for damping
    renderer.render(scene, camera);

    lightPivot.rotation.y += 0.003; // Rotar el sol lentamente
}

renderer.setAnimationLoop( animate ); // bucle de animación
// -------------------------------------- //


// Handle window resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth / resize_factorX;
    sizes.height = window.innerHeight / resize_factorY;
    
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
});

// Raycasting para seleccionar los nodos (ciudades)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener para clicks 
window.addEventListener('click', onClick, false);

let selectedCities = []; // Array para almacenar las ciudades seleccionadas

let drawnLines = [];  // Array para almacenar las líneas dibujadas (Para borralas después)

let coloredMarkers = []; // Array para almacenar los marcadores coloreados

function onClick(event) {
    
    const canvasBounds = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(pivot.children, true);
    
    if (intersects.length > 0) {
        const clicked = intersects[0].object;
        if (clicked.name) {
            selectedCities.push(clicked.name);
            console.log("Seleccionado:", clicked.name);

            //Si se selecciona 2 veces la misma ciudad (el mismo nombre), se ignora
            if (selectedCities[selectedCities.length - 1] === selectedCities[selectedCities.length - 2]) {
                selectedCities.pop(); // Eliminar la última ciudad seleccionada
                console.log("Ciudad repetida, ignorada:", clicked.name);
            }
            
            if (selectedCities.length === 2) {
                //Undraw previously drawn lines
                drawnLines.forEach(line => scene.remove(line));
                coloredMarkers.forEach(marker => {
                    marker.material.color.set(0xff0000); // Reset color to red
                });
                coloredMarkers = []; // Clear the array for new markers
                drawnLines = []; // Clear the array for new lines
                
                const [start, end] = selectedCities;
                coloredMarkers.push(markers[start], markers[end]); // Add the selected markers to the array

                markers[start].material.color.set(0x00ff00); // Cambiar color del marcador de inicio a verde
                markers[end].material.color.set(0x0000ff); // Cambiar color del marcador de fin a azul

                const { path, cost } = dijkstra(graph, start, end); // Usar algoritmo de Dijkstra ./dijkstra.js
                console.log(`Ruta más corta de ${start} a ${end}:`, path);
                console.log(`Costo total: ${cost}`);
                
                // Dibujar arcos entre cada par de ciudades del camino
                for (let i = 0; i < path.length - 1; i++) {
                    if (i != 0){
                      let cMark = markers[path[i]];  // Cambiar color de los marcadores intermedios a verde
                      cMark.material.color.set(0xff00ff); // Cambiar color a magenta
                      coloredMarkers.push(cMark); // Añadir el marcador intermedio al array
                    }
                    const from = cityPositions[path[i]];
                    const to = cityPositions[path[i + 1]];
                    drawGeodesicCurve(from, to);
                }
                
                selectedCities = [];
            }
        }
    }
}

// Esto me lo hizo Chat :') -- Ya, estaba muy dificil, no se tantas matematicas
function drawGeodesicCurve(from, to, segments = 100, arcHeight = 1) {
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;

    // Interpolación esférica (slerp) entre `from` y `to`
    const intermediate = new THREE.Vector3().copy(from).normalize().lerp(to.clone().normalize(), t);
    intermediate.normalize();

    // Elevar el punto un poco fuera del radio de la esfera
    const r = from.length(); // radio
    intermediate.multiplyScalar(r * arcHeight);

    points.push(intermediate);
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffcc00 });
  const line = new THREE.Line(geometry, material);
  drawnLines.push(line); // Guardar la línea para poder eliminarla después
  scene.add(line);
}