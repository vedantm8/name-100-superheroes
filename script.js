let heroesArray = []; // Store valid hero names

/**
 * Retrieves the API Key
 * @param {String} heroName Name of the hero user has inputted
 * @returns API Key
 */
async function getAPIKey(heroName) {
    // Get API Key from config.js file 
    const response = await fetch("config.js")
    const text = await response.text();
    // Extract the Key 
    return text.match(/API_KEY\s*=\s*"(.+)"/)[1];
}

document.addEventListener("DOMContentLoaded", function () {
    const heroInput = document.getElementById("heroName");
    const message = document.getElementById("message");

    /**
     * Function to fetch superhero data from API
     * @param {String} heroName 
     * @returns Boolean - True if hero exists
     */
    async function checkHeroExists(heroName) {
        const API_KEY = await getAPIKey(heroName) 
        const API_URL = `https://superheroapi.com/api.php/${API_KEY}/search/`;
        try {
            const response = await fetch(`${API_URL}${heroName}`);
            const data = await response.json();

            if (data.response === "success" && data.results.length > 0) {
                return true; // Hero exists in the database
            } else {
                return false; // Hero does not exist
            }
        } catch (error) {
            console.error("Error fetching superhero data:", error);
            return false;
        }
    }

    /**
     * Handles what happens when a new hero is input
     * @returns 
     */
    async function addHero() {
        const heroName = heroInput.value.trim();
        const heroNameLower = heroName.toLowerCase(); // Normalize to lowercase
        message.textContent = ""; // Clear previous messages

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

        // Check if the superhero exists
        const exists = await checkHeroExists(heroName);

        if (!exists) {
            message.textContent = `${heroName} not found! Please enter a valid hero name.`;
            return;
        }

        // If the superhero exists, add them to the list
        heroesArray.push(heroName);
        heroInput.value = "";
        message.textContent = `${heroName} added successfully!`;

        updateHeroList();
    }

    /**
     * Adds a new hero to the list 
     */
    function updateHeroList() {
        const heroList = document.getElementById("heroList");
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
