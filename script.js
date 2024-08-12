// let map;
// let cities = [];
// let startCity = null;
// let endCity = null;
// let markers = {};

// async function fetchCities() {
//   try {
//     const response = await fetch("http://localhost:3000/cities");
//     cities = await response.json();
//     initializeMap();
//   } catch (error) {
//     console.error("Error fetching cities:", error);
//   }
// }

// function initializeMap() {
//   map = L.map("map").setView([20.5937, 78.9629], 5); // Centered on India
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "© OpenStreetMap contributors",
//   }).addTo(map);

//   cities.forEach((city) => {
//     const marker = L.marker([city.lat, city.lon]).addTo(map);
//     marker.bindPopup(city.name);
//     marker.on("click", () => selectCity(city));
//     markers[city.name] = marker;
//   });
// }

// function selectCity(city) {
//   if (!startCity) {
//     startCity = city;
//     document.getElementById("startCity").textContent = `Start: ${city.name}`;
//     markers[city.name].setIcon(
//       L.icon({
//         iconUrl:
//           "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//       })
//     );
//   } else if (!endCity && city.name !== startCity.name) {
//     endCity = city;
//     document.getElementById("endCity").textContent = `End: ${city.name}`;
//     markers[city.name].setIcon(
//       L.icon({
//         iconUrl:
//           "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//       })
//     );
//   }
// }

// document.getElementById("findRouteBtn").addEventListener("click", async () => {
//   if (!startCity || !endCity) {
//     alert("Please select both start and end cities.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:3000/route", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ start: startCity.name, end: endCity.name }),
//     });

//     const data = await response.json();

//     if (data.path) {
//       document.getElementById("result").innerHTML = `
//                 <h3>Optimal Route:</h3>
//                 <p>${data.path.join(" → ")}</p>
//                 <p>Total Distance: ${data.cost} km</p>
//             `;

//       // Draw route on map
//       const routeCoordinates = data.path.map((cityName) => {
//         const city = cities.find((c) => c.name === cityName);
//         return [city.lat, city.lon];
//       });
//       L.polyline(routeCoordinates, { color: "blue" }).addTo(map);
//     } else {
//       document.getElementById("result").innerHTML = "<p>No route found.</p>";
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     document.getElementById("result").innerHTML =
//       "<p>An error occurred. Please try again.</p>";
//   }
// });

// fetchCities();

// NEW + 15

let map;
let cities = [];
let startCity = null;
let endCity = null;
let markers = {};
let routePolyline = null;

async function fetchCities() {
  try {
    const response = await fetch("http://localhost:3000/cities");
    cities = await response.json();
    initializeMap();
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
}

function initializeMap() {
  map = L.map("map").setView([20.5937, 78.9629], 5); // Centered on India
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  cities.forEach((city) => {
    const marker = L.marker([city.lat, city.lon]).addTo(map);
    marker.bindPopup(city.name);
    marker.on("click", () => selectCity(city));
    markers[city.name] = marker;
  });
}

function selectCity(city) {
  if (!startCity) {
    startCity = city;
    document.getElementById("startCity").textContent = `Start: ${city.name}`;
    markers[city.name].setIcon(
      L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    );
  } else if (!endCity && city.name !== startCity.name) {
    endCity = city;
    document.getElementById("endCity").textContent = `End: ${city.name}`;
    markers[city.name].setIcon(
      L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    );
  }
}

document.getElementById("findRouteBtn").addEventListener("click", async () => {
  if (!startCity || !endCity) {
    alert("Please select both start and end cities.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start: startCity.name, end: endCity.name }),
    });

    const data = await response.json();

    if (data.path) {
      document.getElementById("result").innerHTML = `
        <h3>Optimal Route:</h3>
        <p>${data.path.join(" → ")}</p>
        <p>Total Distance: ${data.cost} km</p>
      `;

      // Clear previous route if exists
      if (routePolyline) {
        map.removeLayer(routePolyline);
      }

      // Draw route on map
      const routeCoordinates = data.path.map((cityName) => {
        const city = cities.find((c) => c.name === cityName);
        return [city.lat, city.lon];
      });
      routePolyline = L.polyline(routeCoordinates, { color: "blue" }).addTo(
        map
      );

      // Zoom the map to fit the route
      map.fitBounds(routePolyline.getBounds());
    } else {
      document.getElementById("result").innerHTML = "<p>No route found.</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerHTML =
      "<p>An error occurred. Please try again.</p>";
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  // Reset selections
  if (startCity) {
    markers[startCity.name].setIcon(
      L.icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    );
    startCity = null;
    document.getElementById("startCity").textContent = "Start: ";
  }
  if (endCity) {
    markers[endCity.name].setIcon(
      L.icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    );
    endCity = null;
    document.getElementById("endCity").textContent = "End: ";
  }

  // Remove route from map
  if (routePolyline) {
    map.removeLayer(routePolyline);
    routePolyline = null;
  }

  // newnew
  document.getElementById("resetBtn").addEventListener("click", resetMap);

  document.getElementById("result").innerHTML = "";
});

// newnew
function resetMap() {
  // Reset the map view to the original center and zoom
  map.setView([20.5937, 78.9629], 5);

  // Reset startCity and endCity selections
  startCity = null;
  endCity = null;

  // Reset the markers to the original icons
  Object.keys(markers).forEach((city) => {
    markers[city].setIcon(
      L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    );
  });

  // Clear the result display
  document.getElementById("startCity").textContent = "Start: Not selected";
  document.getElementById("endCity").textContent = "End: Not selected";
  document.getElementById("result").innerHTML = "";

  // Remove the route polyline if any
  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });
}

fetchCities();
