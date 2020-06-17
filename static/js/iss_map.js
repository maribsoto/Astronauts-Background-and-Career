
const mymap = L.map('issMap').setView([0, 0], 1);

// const issIcon = L.icon({
//     iconUrl: 'Iss_img.png',
//     iconSize: [100, 132],
//     iconAnchor: [25, 16],
// });

const marker = L.marker([0, 0]).addTo(mymap);

/* const attribution =
 '&copy; <a href=\"https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

 const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
 const tiles = L.tileLayer(tileUrl, {attribution});
 tiles.addTo(mymap); */

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    minZoom: 2.5,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY 
}).addTo(mymap);
 



const api_url = "https://api.wheretheiss.at/v1/satellites/25544"
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    const { latitude, longitude } = data;

    marker.setLatLng([latitude, longitude]);
    document.getElementById("lat").textContent = latitude;
    document.getElementById("lon").textContent = longitude;
}

getISS();