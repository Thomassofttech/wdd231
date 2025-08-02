async function loadCards() {
  const response = await fetch("data/discover.json");
  const items = await response.json();

  const gallery = document.querySelector("#gallery");

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-grid">
        <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy" />
        <h2 class="card-title">${item.title}</h2>
        <address class="card-address">${item.address}</address>
        <p class="card-desc">${item.description}</p>
        <button class="card-btn">
        <a href="${item.website}">
        Learn More
        </a>
        </button>
      </div>
    `;

    gallery.appendChild(card);
  });
}

loadCards();
