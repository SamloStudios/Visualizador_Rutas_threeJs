// Lista de ciudades con sus coordenadas y distancias a otras ciudades
// Esto tal vez deberia estar en un json :)

export const cityData = [
    {
        name: 'New York',
        lat: 40.7128,
        lon: -74.0060,
        neighbors: [
            { name: 'London', weight: 5567 },
            { name: 'Tokyo', weight: 10853 },
            { name: 'Los Angeles', weight: 3935 },
            { name: 'Toronto', weight: 550 }
        ]
    },
    {
        name: 'London',
        lat: 51.5074,
        lon: -0.1278,
        neighbors: [
            { name: 'New York', weight: 5567 },
            { name: 'Paris', weight: 343 },
            { name: 'Berlin', weight: 930 }
        ]
    },
    {
        name: 'Paris',
        lat: 48.8566,
        lon: 2.3522,
        neighbors: [
            { name: 'London', weight: 343 },
            { name: 'Berlin', weight: 878 },
            { name: 'Rome', weight: 1107 }
        ]
    },
    {
        name: 'Berlin',
        lat: 52.5200,
        lon: 13.4050,
        neighbors: [
            { name: 'Paris', weight: 878 },
            { name: 'London', weight: 930 },
            { name: 'Moscow', weight: 1600 }
        ]
    },
    {
        name: 'Rome',
        lat: 41.9028,
        lon: 12.4964,
        neighbors: [
            { name: 'Paris', weight: 1107 },
            { name: 'Istanbul', weight: 1375 }
        ]
    },
    {
        name: 'Istanbul',
        lat: 41.0082,
        lon: 28.9784,
        neighbors: [
            { name: 'Rome', weight: 1375 },
            { name: 'Moscow', weight: 1730 }
        ]
    },
    {
        name: 'Moscow',
        lat: 55.7558,
        lon: 37.6173,
        neighbors: [
            { name: 'Berlin', weight: 1600 },
            { name: 'Istanbul', weight: 1730 },
            { name: 'Tokyo', weight: 7475 }
        ]
    },
    {
        name: 'Tokyo',
        lat: 35.6895,
        lon: 139.6917,
        neighbors: [
            { name: 'New York', weight: 10853 },
            { name: 'Sydney', weight: 7826 },
            { name: 'Moscow', weight: 7475 }
        ]
    },
    {
        name: 'Sydney',
        lat: -33.8688,
        lon: 151.2093,
        neighbors: [
            { name: 'Tokyo', weight: 7826 },
            { name: 'Los Angeles', weight: 12051 }
        ]
    },
    {
        name: 'Los Angeles',
        lat: 34.0522,
        lon: -118.2437,
        neighbors: [
            { name: 'New York', weight: 3935 },
            { name: 'Sydney', weight: 12051 },
            { name: 'Toronto', weight: 3490 }
        ]
    },
    {
        name: 'Toronto',
        lat: 43.6511,
        lon: -79.3839,
        neighbors: [
            { name: 'New York', weight: 550 },
            { name: 'Los Angeles', weight: 3490 }
        ]
    },
    {
        name: 'São Paulo',
        lat: -23.5505,
        lon: -46.6333,
        neighbors: [
            { name: 'Rio de Janeiro', weight: 360 },
            { name: 'Buenos Aires', weight: 1670 },
            { name: 'Miami', weight: 6600 }
        ]
    },
    {
        name: 'Buenos Aires',
        lat: -34.6037,
        lon: -58.3816,
        neighbors: [
            { name: 'São Paulo', weight: 1670 },
            { name: 'Santiago', weight: 1400 }
        ]
    },
    {
        name: 'Santiago',
        lat: -33.4489,
        lon: -70.6693,
        neighbors: [
            { name: 'Buenos Aires', weight: 1400 },
            { name: 'Lima', weight: 2700 }
        ]
    },
    {
        name: 'Lima',
        lat: -12.0464,
        lon: -77.0428,
        neighbors: [
            { name: 'Santiago', weight: 2700 },
            { name: 'Bogotá', weight: 2100 }
        ]
    },
    {
        name: 'Bogotá',
        lat: 4.7110,
        lon: -74.0721,
        neighbors: [
            { name: 'Miami', weight: 2200 },
            { name: 'New York', weight: 4000 },
            { name: 'Lima', weight: 2100 }
        ]
    },
    {
        name: 'Johannesburgo',
        lat: -26.2041,
        lon: 28.0473,
        neighbors: [
            { name: 'Nairobi', weight: 2700 },
            { name: 'Lagos', weight: 4600 }
        ]
    },
    {
        name: 'Nairobi',
        lat: -1.2921,
        lon: 36.8219,
        neighbors: [
            { name: 'Johannesburgo', weight: 2700 },
            { name: 'Cairo', weight: 4000 }
        ]
    },
    {
        name: 'Lagos',
        lat: 6.5244,
        lon: 3.3792,
        neighbors: [
            { name: 'Johannesburgo', weight: 4600 },
            { name: 'Casablanca', weight: 3500 }
        ]
    },
    {
        name: 'Casablanca',
        lat: 33.5731,
        lon: -7.5898,
        neighbors: [
            { name: 'Lagos', weight: 3500 },
            { name: 'London', weight: 2900 }
        ]
    },
    {
        name: 'Cairo',
        lat: 30.0444,
        lon: 31.2357,
        neighbors: [
            { name: 'Nairobi', weight: 4000 },
            { name: 'Istanbul', weight: 1100 }
        ]
    },
    {
        name: 'Melbourne',
        lat: -37.8136,
        lon: 144.9631,
        neighbors: [
            { name: 'Sydney', weight: 880 },
            { name: 'Auckland', weight: 2100 }
        ]
    },
    {
        name: 'Auckland',
        lat: -36.8485,
        lon: 174.7633,
        neighbors: [
            { name: 'Melbourne', weight: 2100 },
            { name: 'Sydney', weight: 1600 }
        ]
    },
    {
        name: 'Seúl',
        lat: 37.5665,
        lon: 126.9780,
        neighbors: [
            { name: 'Tokyo', weight: 1150 },
            { name: 'Beijing', weight: 950 }
        ]
    },
    {
        name: 'Beijing',
        lat: 39.9042,
        lon: 116.4074,
        neighbors: [
            { name: 'Seúl', weight: 950 },
            { name: 'Moscow', weight: 5800 }
        ]
    },
    {
        name: 'Delhi',
        lat: 28.7041,
        lon: 77.1025,
        neighbors: [
            { name: 'Dubai', weight: 2100 },
            { name: 'Mumbai', weight: 1150 },
            { name: 'Beijing', weight: 3200 }
        ]
    },
    {
        name: 'Dubai',
        lat: 25.2048,
        lon: 55.2708,
        neighbors: [
            { name: 'Delhi', weight: 2100 },
            { name: 'Istanbul', weight: 4100 }
        ]
    }

];
