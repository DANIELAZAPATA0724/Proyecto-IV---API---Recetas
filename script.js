document.addEventListener("DOMContentLoaded", () => {
  const recipeImage = document.getElementById("recipe-image");
  const recipeName = document.getElementById("recipe-name");
  const ingredientsList = document.getElementById("ingredients-list");
  const nextButton = document.getElementById("next-button");
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");

  nextButton.addEventListener("click", () => {
    getRandomRecipe();
  });

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      searchRecipeByName(searchTerm);
    }
  });

  hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Al cargar la página, muestra una receta aleatoria
  getRandomRecipe();

  // Función para obtener y mostrar una receta aleatoria desde la API
  function getRandomRecipe() {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const recipe = data.meals[0];
        updateRecipeCard(recipe);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Función para obtener y mostrar una receta por nombre desde la API
  function searchRecipeByName(name) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const recipe = data.meals ? data.meals[0] : null;
        if (recipe) {
          updateRecipeCard(recipe);
        } else {
          console.log("No se encontró ninguna receta con ese nombre.");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Función para actualizar la tarjeta de la receta con la información proporcionada
  function updateRecipeCard(recipe) {
    recipeImage.src = recipe.strMealThumb;
    recipeName.textContent = recipe.strMeal;
    ingredientsList.innerHTML = generateIngredientsList(recipe);
  }

  // Función para generar la lista de ingredientes en formato HTML
  function generateIngredientsList(recipe) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`<li>${ingredient} - ${measure}</li>`);
      } else if (ingredient) {
        ingredients.push(`<li>${ingredient}</li>`);
      }
    }
    return ingredients.join("");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ... (Tu código JavaScript existente) ...

  const instructionsButton = document.getElementById("instructions-button");
  const instructionsContainer = document.getElementById("instructions-container");
  const instructions = document.getElementById("instructions");

  instructionsButton.addEventListener("click", () => {
      fetchRecipeInstructions();
  });

  // Función para obtener las instrucciones de preparación desde la API
  function fetchRecipeInstructions() {
      const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              const recipe = data.meals[0];
              updateRecipeInstructions(recipe);
          })
          .catch(error => console.error("Error fetching instructions:", error));
  }

  // Función para mostrar las instrucciones en la tarjeta de detalles de receta
  function updateRecipeInstructions(recipe) {
      instructions.textContent = recipe.strInstructions;
      instructionsContainer.style.display = "block";
  }
});
