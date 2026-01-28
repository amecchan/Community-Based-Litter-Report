let map;
let marker;

// Popup functions
function showPopup(message) {
  document.getElementById("popupMessage").textContent = message;
  document.getElementById("popupOverlay").style.display = "flex";
}
function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}

// Geolocation function
function getLocation() {
  const status = document.getElementById("locationStatus");
  const errorStatus = document.getElementById("errorStatus");

  // Clear previous messages
  errorStatus.classList.add("hidden");
  
  if (!navigator.geolocation) {
    showPopup("Geolocation is not supported by your browser.");
    return;
  }

  // Show "locating..."
  status.textContent = "📍 Getting location...";
  status.classList.remove("hidden");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      document.getElementById("latitude").value = lat;
      document.getElementById("longitude").value = lng;

      // Hide status after success
      status.textContent = "";
      status.classList.add("hidden");

      showPopup("Location obtained successfully!");
      showMap(lat, lng);
    },
    () => {
      // Hide "locating..." when denied
      status.textContent = "";
      status.classList.add("hidden");
      showPopup("Location permission denied. Please describe the landmark manually.");
    }
  );
}

function showMap(lat, lng) {
  const mapDiv = document.getElementById("map");
  mapDiv.style.display = "block";

  if (!map) {
    map = L.map("map").setView([lat, lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map);
  } else {
    map.setView([lat, lng], 16);
    marker.setLatLng([lat, lng]);
  }
}