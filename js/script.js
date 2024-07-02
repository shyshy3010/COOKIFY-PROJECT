document.addEventListener('DOMContentLoaded', function() {
    const recipeContainer = document.querySelector('.recipe-container');
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', function(event) {
        const query = event.target.value.trim().toLowerCase();

        const filteredRecipes = recipesData.filter(recipe =>
            recipe.name.toLowerCase().includes(query)
        );

        displayRecipes(filteredRecipes);
    });
    function loadRecipes() {
        fetch("data/recipes.json")
            .then(response => response.json())
            .then(data => {
                displayRecipes(data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }
    function displayRecipes(recipes) {
        recipeContainer.innerHTML = '';

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
    
            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.name;
            recipeCard.appendChild(recipeImage);
    
            const recipeInfo = document.createElement('div');
            recipeInfo.classList.add('recipe-info');
    
            const recipeName = document.createElement('h3');
            recipeName.textContent = recipe.name;
            recipeInfo.appendChild(recipeName);
    
            const recipeDetails = document.createElement('div');
            recipeDetails.classList.add('recipe-details');
    
            const recipeTime = document.createElement('span');
            recipeTime.innerHTML = `<img src="images/time-icon.svg" alt="Time icon"> ${recipe.time}`;
            recipeDetails.appendChild(recipeTime);
    
            const recipeDifficulty = document.createElement('span');
            recipeDifficulty.innerHTML = `<img src="images/level-icon.svg" alt="Difficulty icon"> ${recipe.difficulty}`;
            recipeDetails.appendChild(recipeDifficulty);
    
            const recipeConservation = document.createElement('span');
            recipeConservation.innerHTML = `<img src="images/trash-icon.svg" alt="Conservation icon"> ${recipe.conservation}`;
            recipeDetails.appendChild(recipeConservation);
    
            recipeInfo.appendChild(recipeDetails);
        });
    }
    loadRecipes();
});
