document.addEventListener("DOMContentLoaded", function() {
    fetch('data/david_recipes.json')
        .then(response => response.json())
        .then(data => {
            const recipe = data.recipes[0];

            const cardContainer = document.getElementById('card-container');

            const cardHTML = `
                <div class="card">
                    <img src="${recipe.imageUrl}" alt="${recipe.title}">
                    <div class="card-footer">
                        <div class="card-footer-title">${recipe.title}</div>
                        <div class="card-footer-content">
                            <div class="card-footer-instructions">
                                <div>
                                    <p>Prep Time:</p>
                                    <p>${recipe.prepTime}</p>
                                </div>
                                <div>
                                    <p>Cook Time:</p>
                                    <p>${recipe.cookTime}</p>
                                </div>
                                <div>
                                    <p>Total Time:</p>
                                    <p>${recipe.totalTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML = cardHTML;

            const mainIngredientsList = document.getElementById('main-ingredients-list');
            recipe.mainIngredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.dataset.baseQuantity = ingredient.baseQuantity; 
                listItem.dataset.unit = ingredient.unit; 
                listItem.innerHTML = `
                    <img src="${ingredient.image}" alt="${ingredient.name}" class="ingredient-image">
                    <span class="ingredient-name">${ingredient.name}</span>
                    <span class="ingredient-quantity">${formatQuantity(ingredient.baseQuantity)} ${ingredient.unit}</span>
                    <input type="checkbox" id="mainIngredient-${ingredient.id}" name="mainIngredient">
                `;
                mainIngredientsList.appendChild(listItem);
            });
            const bechamelIngredientsList = document.getElementById('bechamel-ingredients-list');
            recipe.bechamelIngredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.dataset.baseQuantity = ingredient.baseQuantity;
                listItem.dataset.unit = ingredient.unit; 
                listItem.innerHTML = `
                    <img src="${ingredient.image}" alt="${ingredient.name}" class="ingredient-image">
                    <span class="ingredient-name">${ingredient.name}</span>
                    <span class="ingredient-quantity">${formatQuantity(ingredient.baseQuantity)} ${ingredient.unit}</span>
                    <input type="checkbox" id="bechamelIngredient-${ingredient.id}" name="bechamelIngredient">
                `;
                bechamelIngredientsList.appendChild(listItem);
            });
        })
    });