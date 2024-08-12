// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // In-memory graph representation of Indian cities with coordinates
// const graph = {
//   Mumbai: {
//     connections: { Pune: 150, Nashik: 166 },
//     lat: 19.076,
//     lon: 72.8777,
//   },
//   Pune: {
//     connections: { Mumbai: 150, Nashik: 210, Bangalore: 840 },
//     lat: 18.5204,
//     lon: 73.8567,
//   },
//   Nashik: {
//     connections: { Mumbai: 166, Pune: 210, Aurangabad: 159 },
//     lat: 19.9975,
//     lon: 73.7898,
//   },
//   Aurangabad: {
//     connections: { Nashik: 159, Hyderabad: 560 },
//     lat: 19.8762,
//     lon: 75.3433,
//   },
//   Bangalore: {
//     connections: { Pune: 840, Chennai: 346, Hyderabad: 570 },
//     lat: 12.9716,
//     lon: 77.5946,
//   },
//   Chennai: {
//     connections: { Bangalore: 346, Hyderabad: 627 },
//     lat: 13.0827,
//     lon: 80.2707,
//   },
//   Hyderabad: {
//     connections: { Bangalore: 570, Chennai: 627, Aurangabad: 560, Nagpur: 501 },
//     lat: 17.385,
//     lon: 78.4867,
//   },
//   Nagpur: {
//     connections: { Hyderabad: 501, Bhopal: 353, Kolkata: 1158 },
//     lat: 21.1458,
//     lon: 79.0882,
//   },
//   Bhopal: {
//     connections: { Nagpur: 353, Delhi: 776 },
//     lat: 23.2599,
//     lon: 77.4126,
//   },
//   Delhi: {
//     connections: { Bhopal: 776, Jaipur: 281, Lucknow: 555 },
//     lat: 28.6139,
//     lon: 77.209,
//   },
//   Jaipur: {
//     connections: { Delhi: 281, Ahmedabad: 657 },
//     lat: 26.9124,
//     lon: 75.7873,
//   },
//   Ahmedabad: {
//     connections: { Jaipur: 657, Mumbai: 524 },
//     lat: 23.0225,
//     lon: 72.5714,
//   },
//   Lucknow: {
//     connections: { Delhi: 555, Kolkata: 985 },
//     lat: 26.8467,
//     lon: 80.9462,
//   },
//   Kolkata: {
//     connections: { Lucknow: 985, Nagpur: 1158 },
//     lat: 22.5726,
//     lon: 88.3639,
//   },
//   Kochi: {
//     connections: { Bangalore: 556, Chennai: 683 },
//     lat: 9.9312,
//     lon: 76.2673,
//   },
// };

// // Dijkstra's Algorithm implementation
// function dijkstra(graph, start, end) {
//   const costs = {};
//   const parents = {};
//   const processed = new Set();

//   Object.keys(graph).forEach((node) => {
//     costs[node] = Infinity;
//   });
//   costs[start] = 0;

//   let node = findLowestCostNode(costs, processed);

//   while (node) {
//     const cost = costs[node];
//     const neighbors = graph[node].connections;

//     for (let n in neighbors) {
//       const newCost = cost + neighbors[n];
//       if (newCost < costs[n]) {
//         costs[n] = newCost;
//         parents[n] = node;
//       }
//     }

//     processed.add(node);
//     node = findLowestCostNode(costs, processed);
//   }

//   // Reconstruct path
//   const path = [end];
//   let parent = parents[end];
//   while (parent) {
//     path.unshift(parent);
//     parent = parents[parent];
//   }

//   return { path, cost: costs[end] };
// }

// function findLowestCostNode(costs, processed) {
//   return Object.keys(costs).reduce((lowest, node) => {
//     if (lowest === null && !processed.has(node)) {
//       lowest = node;
//     }
//     if (costs[node] < costs[lowest] && !processed.has(node)) {
//       lowest = node;
//     }
//     return lowest;
//   }, null);
// }

// app.post("/route", (req, res) => {
//   const { start, end } = req.body;
//   const result = dijkstra(graph, start, end);
//   res.json(result);
// });

// app.get("/cities", (req, res) => {
//   const cities = Object.keys(graph).map((name) => ({
//     name,
//     lat: graph[name].lat,
//     lon: graph[name].lon,
//   }));
//   res.json(cities);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// NEW + 15

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory graph representation of Indian cities with coordinates
const graph = {
  Mumbai: {
    connections: { Pune: 150, Nashik: 166, Ahmedabad: 524 },
    lat: 19.076,
    lon: 72.8777,
  },
  Pune: {
    connections: { Mumbai: 150, Nashik: 210, Bangalore: 840, Goa: 448 },
    lat: 18.5204,
    lon: 73.8567,
  },
  Nashik: {
    connections: { Mumbai: 166, Pune: 210, Aurangabad: 159, Indore: 415 },
    lat: 19.9975,
    lon: 73.7898,
  },
  Aurangabad: {
    connections: { Nashik: 159, Hyderabad: 560, Indore: 435 },
    lat: 19.8762,
    lon: 75.3433,
  },
  Bangalore: {
    connections: { Pune: 840, Chennai: 346, Hyderabad: 570, Kochi: 556 },
    lat: 12.9716,
    lon: 77.5946,
  },
  Chennai: {
    connections: { Bangalore: 346, Hyderabad: 627, Kochi: 683, Madurai: 462 },
    lat: 13.0827,
    lon: 80.2707,
  },
  Hyderabad: {
    connections: {
      Bangalore: 570,
      Chennai: 627,
      Aurangabad: 560,
      Nagpur: 501,
      Vizag: 620,
    },
    lat: 17.385,
    lon: 78.4867,
  },
  Nagpur: {
    connections: { Hyderabad: 501, Bhopal: 353, Kolkata: 1158, Raipur: 285 },
    lat: 21.1458,
    lon: 79.0882,
  },
  Bhopal: {
    connections: { Nagpur: 353, Delhi: 776, Indore: 194 },
    lat: 23.2599,
    lon: 77.4126,
  },
  Delhi: {
    connections: { Bhopal: 776, Jaipur: 281, Lucknow: 555, Chandigarh: 243 },
    lat: 28.6139,
    lon: 77.209,
  },
  Jaipur: {
    connections: { Delhi: 281, Ahmedabad: 657, Udaipur: 393 },
    lat: 26.9124,
    lon: 75.7873,
  },
  Ahmedabad: {
    connections: { Jaipur: 657, Mumbai: 524, Udaipur: 262, Surat: 265 },
    lat: 23.0225,
    lon: 72.5714,
  },
  Lucknow: {
    connections: { Delhi: 555, Kolkata: 985, Varanasi: 319 },
    lat: 26.8467,
    lon: 80.9462,
  },
  Kolkata: {
    connections: { Lucknow: 985, Nagpur: 1158, Patna: 583, Bhubaneswar: 441 },
    lat: 22.5726,
    lon: 88.3639,
  },
  Kochi: {
    connections: { Bangalore: 556, Chennai: 683, Trivandrum: 206 },
    lat: 9.9312,
    lon: 76.2673,
  },
  Goa: {
    connections: { Pune: 448, Bangalore: 560, Mumbai: 587 },
    lat: 15.2993,
    lon: 74.124,
  },
  Indore: {
    connections: { Nashik: 415, Bhopal: 194, Aurangabad: 435, Ujjain: 56 },
    lat: 22.7196,
    lon: 75.8577,
  },
  Madurai: {
    connections: { Chennai: 462, Trivandrum: 298, Kochi: 213 },
    lat: 9.9252,
    lon: 78.1198,
  },
  Udaipur: {
    connections: { Jaipur: 393, Ahmedabad: 262, Jodhpur: 250 },
    lat: 24.5854,
    lon: 73.7125,
  },
  Surat: {
    connections: { Ahmedabad: 265, Mumbai: 284 },
    lat: 21.1702,
    lon: 72.8311,
  },
  Chandigarh: {
    connections: { Delhi: 243, Amritsar: 226, Shimla: 112 },
    lat: 30.7333,
    lon: 76.7794,
  },
  Varanasi: {
    connections: { Lucknow: 319, Patna: 252 },
    lat: 25.3176,
    lon: 82.9739,
  },
  Patna: {
    connections: { Kolkata: 583, Varanasi: 252, Ranchi: 333 },
    lat: 25.5941,
    lon: 85.1376,
  },
  Bhubaneswar: {
    connections: { Kolkata: 441, Vizag: 445 },
    lat: 20.2961,
    lon: 85.8245,
  },
  Raipur: {
    connections: { Nagpur: 285, Vizag: 562, Ranchi: 699 },
    lat: 21.2514,
    lon: 81.6296,
  },
  Vizag: {
    connections: { Hyderabad: 620, Bhubaneswar: 445, Raipur: 562 },
    lat: 17.6868,
    lon: 83.2185,
  },
  Trivandrum: {
    connections: { Kochi: 206, Madurai: 298 },
    lat: 8.5241,
    lon: 76.9366,
  },
  Amritsar: {
    connections: { Chandigarh: 226, Delhi: 450 },
    lat: 31.634,
    lon: 74.8723,
  },
  Shimla: {
    connections: { Chandigarh: 112, Delhi: 346 },
    lat: 31.1048,
    lon: 77.1734,
  },
  Jodhpur: {
    connections: { Udaipur: 250, Jaipur: 337 },
    lat: 26.2389,
    lon: 73.0243,
  },
  Ujjain: {
    connections: { Indore: 56 },
    lat: 23.1765,
    lon: 75.7885,
  },
};

// Dijkstra's Algorithm implementation
function dijkstra(graph, start, end) {
  const costs = {};
  const parents = {};
  const processed = new Set();

  Object.keys(graph).forEach((node) => {
    costs[node] = Infinity;
  });
  costs[start] = 0;

  let node = findLowestCostNode(costs, processed);

  while (node) {
    const cost = costs[node];
    const neighbors = graph[node].connections;

    for (let n in neighbors) {
      const newCost = cost + neighbors[n];
      if (newCost < costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }

    processed.add(node);
    node = findLowestCostNode(costs, processed);
  }

  // Reconstruct path
  const path = [end];
  let parent = parents[end];
  while (parent) {
    path.unshift(parent);
    parent = parents[parent];
  }

  return { path, cost: costs[end] };
}

function findLowestCostNode(costs, processed) {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null && !processed.has(node)) {
      lowest = node;
    }
    if (costs[node] < costs[lowest] && !processed.has(node)) {
      lowest = node;
    }
    return lowest;
  }, null);
}

app.post("/route", (req, res) => {
  const { start, end } = req.body;
  const result = dijkstra(graph, start, end);
  res.json(result);
});

app.get("/cities", (req, res) => {
  const cities = Object.keys(graph).map((name) => ({
    name,
    lat: graph[name].lat,
    lon: graph[name].lon,
  }));
  res.json(cities);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
