async function loadSpotlights() {
  const response = await fetch("data/business.json");
  const data = await response.json();

  const goldSilver = data.filter(m => m.membership === 2 || m.membership === 3);
  const selected = [];

  while (selected.length < 3 && goldSilver.length > 0) {
    const randomIndex = Math.floor(Math.random() * goldSilver.length);
    selected.push(goldSilver.splice(randomIndex, 1)[0]);
  }

  const spotlightContainer = document.getElementById("spotlight-container");
  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>${member.membership === 3 ? "Gold" : "Silver"} Member</strong></p>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();
