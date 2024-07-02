document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const recipeForYouContainer = document.querySelector('.recipeforyou-container');
    const recipeTrendingNowContainer = document.querySelector('.recipetrendingnow-container');

    function loadRecipes(url, container) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayRecipes(data, container);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }

    function displayRecipes(recipes, container) {
        container.innerHTML = '';

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

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-button');
            menuButton.innerHTML = `<img src="images/More vert.svg" alt="Menu icon">`;

            const menu = document.createElement('div');
            menu.classList.add('menu');

            const addMealPlanOption = document.createElement('div');
            addMealPlanOption.classList.add('menu-option');
            addMealPlanOption.textContent = 'Add to Meal Plan';
            addMealPlanOption.addEventListener('click', function() {
                addToMealPlan(recipe.name);
                menu.style.display = 'none';
            });

            const deleteRecipeOption = document.createElement('div');
            deleteRecipeOption.classList.add('menu-option');
            deleteRecipeOption.textContent = 'Delete Recipe';
            deleteRecipeOption.addEventListener('click', function() {
                recipeCard.style.display = 'none';
                menu.style.display = 'none';
            });

            const startRecipeOption = document.createElement('div');
            startRecipeOption.classList.add('menu-option');
            startRecipeOption.textContent = 'Start Recipe';
            startRecipeOption.addEventListener('click', function() {
                location.assign('about.html');
            });

            menu.appendChild(addMealPlanOption);
            menu.appendChild(deleteRecipeOption);
            menu.appendChild(startRecipeOption);
            recipeCard.appendChild(menuButton);
            recipeCard.appendChild(menu);

            menuButton.addEventListener('click', function() {
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', function(event) {
                if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
                    menu.style.display = 'none';
                }
            });

            recipeCard.appendChild(recipeInfo);
            container.appendChild(recipeCard);
        });
    }
    loadRecipes('data/recipes_foryou.json', recipeForYouContainer);
    loadRecipes('data/recipes_trendingnow.json', recipeTrendingNowContainer);

        forYouRecipes.forEach(recipe => {
            if (recipe.name.includes(query)) {
                recipe.card.style.display = 'block';
            } else {
                recipe.card.style.display = 'none';
            }
        });

        const trendingNowRecipes = Array.from(recipeTrendingNowContainer.children).map(card => {
            return {
                name: card.querySelector('h3').textContent.toLowerCase(),
                card: card
            };
        });

        trendingNowRecipes.forEach(recipe => {
            if (recipe.name.includes(query)) {
                recipe.card.style.display = 'block';
            } else {
                recipe.card.style.display = 'none';
            }
        });
    });

 


