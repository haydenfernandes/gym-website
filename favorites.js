function addFavorite(name, image, description, details) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let item = {
        name: name,
        image: image,
        description: description,
        details: details
    };

    let exists = favorites.some(function(fav) {
        return fav.name === name;
    });

    if (!exists) {
        favorites.push(item);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(name + " added to favorites!");
    } else {
        alert(name + " is already in favorites.");
    }
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let list = document.getElementById("favorites-list");

    if (!list) return;

    list.innerHTML = "";

    if (favorites.length === 0) {
        list.innerHTML = "<p>No favorites added yet.</p>";
        return;
    }

    favorites.forEach(function(item) {
        list.innerHTML += `
            <div class="list-card">
                <img src="${item.image}" alt="${item.name}" class="card-img">

                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>

                    <details>
                        <summary class="btn">View Details</summary>
                        <div class="dropdown-content">
                            ${item.details}
                        </div>
                    </details>

                    <button onclick="removeFavorite('${item.name}')" class="btn">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });
}

function removeFavorite(name) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(function(item) {
        return item.name !== name;
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));
    location.reload();
}

window.onload = loadFavorites;