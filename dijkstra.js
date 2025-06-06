export function dijkstra(graph, start, end) {
  // Inicializa los objetos para almacenar las distancias y los predecesores
  const distances = {};
  const previous = {};
  const queue = [];

  // Establece la distancia inicial a todos los nodos como infinito y sin predecesor
  for (const city in graph) {
    distances[city] = Infinity;
    previous[city] = null;
  }

  // La distancia al nodo de inicio es 0 y se agrega a la cola
  distances[start] = 0;
  queue.push({ city: start, dist: 0 });

  // Mientras haya nodos en la cola
  while (queue.length > 0) {
    // Ordena la cola para obtener el nodo con menor distancia
    queue.sort((a, b) => a.dist - b.dist); // Ordenar la cola por distancia
    const { city: current } = queue.shift(); // Extrae el nodo con menor distancia

    // Si llegamos al nodo destino, terminamos
    if (current === end) break;

    // Recorre los vecinos del nodo actual
    for (const neighbor in graph[current]) {
      // Calcula la distancia alternativa pasando por el nodo actual
      const alt = distances[current] + graph[current][neighbor];
      // Si la nueva distancia es menor, actualiza la distancia y el predecesor
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
        queue.push({ city: neighbor, dist: alt }); // Agrega el vecino a la cola
      }
    }
  }

  // Reconstruir la ruta más corta desde el final al inicio
  const path = [];
  let step = end;
  while (step) {
    path.unshift(step); // Inserta el nodo al principio del arreglo
    step = previous[step]; // Avanza al predecesor
  }

  // Si el primer nodo no es el inicio, no hay ruta posible
  if (path[0] !== start) return { path: [], cost: Infinity };
  // Devuelve la ruta y el coste total
  return { path, cost: distances[end] };
}