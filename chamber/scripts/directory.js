const directory = document.querySelector("#directory");

async function getBusinesses() {
  const response = await fetch("chamber/data/business.json");
  const data = await response.json();
  displayBusinesses(data);
}

function displayBusinesses(businesses) {
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

gridBtn.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// Load data
getBusinesses();
