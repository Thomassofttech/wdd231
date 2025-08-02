const directory = document.querySelector("#directory");

async function getBusinesses() {
  const response = await fetch("data/business.json");
  const data = await response.json();
  displayBusinesses(data);
}

function displayBusinesses(businesses) {
  if (!directory) {
    console.warn("Directory element not found.");
    return;
  }
  
  businesses.forEach((biz) => {
    const card = document.createElement("section");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${biz.image}" alt="${biz.name} Logo">
      <h3>${biz.name}</h3>
      <p>📍 ${biz.address}</p>
      <p>📞 ${biz.phone}</p>
      <a href="${biz.website}" target="_blank">🌐 Visit Website</a>
    `;

    directory.appendChild(card);
  });
}

// Grid/List toggle
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

if (gridBtn && listBtn && directory) {
  gridBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
  });
  
  listBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
  });
}

// Load data
getBusinesses();

const menuButton = document.getElementById("menu");
const navLinks = document.getElementById("navmenu");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Set timestamp on load
window.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    const timestamp = new Date().toISOString();
    timestampField.value = timestamp;
  }
});


// Modal control
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
