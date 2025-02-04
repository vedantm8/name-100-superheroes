# Name 100 Superheroes

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

Name 100 Superheroes is a simple web-based challenge where users attempt to name up to 100 superheroes. The project includes real-time validation using the SuperHero API to verify whether the entered superhero exists in the database. 

## Getting Started <a name = "getting_started"></a>

### Prerequisites

To run this project, you will need the following: 

* A modern web-browser (Chrome, Firefox, etc)
* A text-editor (VSCode, Subline, etc)
* Internet Connection 

### Installing

1. Clone the repository
```bash
# Clone the repository to local machine 
git clone https://github.com/vedantm8/name-100-superheroes.git

# Move to local directory
cd name-100-superheroes
```

2. Set up the Superhero API Key:

    * Go to [Superhero API](https://superheroapi.com)
    * Login to GitHub to get the API Key
    * Open `script.js` and replace `YOUR_ACCESS_TOKEN` with your actual API key

3. Run the project 
    * Open `index.html` in your web browser


## Usage <a name = "usage"></a>

* Enter a superhero name in the input field.
* Press Enter or click the "Add Hero" button.
* If the superhero exists in the database, they are added to the list.
* If the superhero does not exist, an error message is displayed.
* Users can add up to 100 superheroes.