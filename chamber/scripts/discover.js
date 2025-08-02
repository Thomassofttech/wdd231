async function loadCards() {
  const response = await fetch("data/discover.json");
  const items = await response.json();

  const gallery = document.querySelector("#gallery");
  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;

    gallery.appendChild(card);
  });
}

loadCards();
