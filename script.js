let heroesArray = []; // Store valid hero names
let apiKey = ""; // Store API key

/**
 * Validates the API Key by making a test request
 * @param {String} key API key entered by the user
 * @returns {Boolean} - True if key is valid, False otherwise
 */
async function validateAPIKey(key) {
    const API_URL = `https://superheroapi.com/api.php/${key}/search/Batman`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("API Response:", data); // Debugging log

        if (data.response === "success") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error validating API key:", error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const apiLink = document.createElement("a");
    apiLink.href = "https://www.superheroapi.com/";
    apiLink.textContent = "Superhero API - Free API for Superhero Data";
    apiLink.target = "_blank";
    document.body.prepend(apiLink);
    document.body.prepend(document.createElement("br"));
    const apiKeyInput = document.createElement("input");
    apiKeyInput.setAttribute("type", "text");
    apiKeyInput.setAttribute("placeholder", "Enter API Key");
    apiKeyInput.id = "apiKeyInput";

    const apiKeyButton = document.createElement("button");
    apiKeyButton.textContent = "Submit API Key";
    apiKeyButton.id = "apiKeyButton";

    document.body.prepend(apiKeyButton);
    document.body.prepend(apiKeyInput);

    const heroInput = document.getElementById("heroName");
    const message = document.getElementById("message");
    const heroList = document.getElementById("heroList");

    apiKeyButton.addEventListener("click", async function () {
        const key = apiKeyInput.value.trim();
        if (key === "") {
            message.textContent = "Please enter a valid API key.";
            return;
        }

        validateAPIKey(key).then(isValid => { // Pass the key here
            if (!isValid) {
                message.textContent = "Invalid API key. Please try again.";
            } else {
                apiKey = key;
                message.textContent = "API key validated successfully! You can now search for heroes.";
                apiKeyInput.disabled = true;
                apiKeyButton.disabled = true;
            }
        });
    });

    /**
     * Function to fetch superhero data from API
     * @param {String} heroName 
     * @returns Boolean - True if hero exists
     */
    async function checkHeroExists(heroName) {
        if (!apiKey) {
            message.textContent = "Please enter and validate your API key first.";
            return false;
        }

        const API_URL = `https://superheroapi.com/api.php/${apiKey}/search/`;
        try {
            const response = await fetch(`${API_URL}${heroName}`);
            const data = await response.json();

            if (data.response === "success" && data.results.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error fetching superhero data:", error);
            return false;
        }
    }

    /**
     * Handles what happens when a new hero is input
     */
    async function addHero() {
        const heroName = heroInput.value.trim();
        const heroNameLower = heroName.toLowerCase();
        message.textContent = "";

        if (heroName === "") {
            message.textContent = "Please enter a valid superhero name.";
            return;
        }
        if (heroesArray.length >= 100) {
            message.textContent = "You have reached the limit of 100 superheroes!";
            return;
        }
        if (heroesArray.some(hero => hero.toLowerCase() === heroNameLower)) {
            message.textContent = `${heroName} has already been added!`;
            return;
        }

        const exists = await checkHeroExists(heroName);

        if (!exists) {
            message.textContent = `${heroName} not found! Please enter a valid hero name.`;
            return;
        }

        heroesArray.push(heroName);
        heroInput.value = "";
        message.textContent = `${heroName} added successfully!`;
        updateHeroList();
    }

    /**
     * Updates the hero list display
     */
    function updateHeroList() {
        heroList.innerHTML = "";
        heroesArray.forEach((hero, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${hero}`;
            heroList.appendChild(li);
        });
    }

    // Event listener for pressing Enter inside the input field
    heroInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addHero();
        }
    });
});
