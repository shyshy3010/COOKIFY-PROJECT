document.addEventListener('DOMContentLoaded', function() {
    const recipeContainer = document.querySelector('.recipe-container');

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
            
        });
    }
    loadRecipes();
});
