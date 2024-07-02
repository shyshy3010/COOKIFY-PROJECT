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
            // Slider pour les portions
            const slider = document.getElementById("myRange");
            const output = document.getElementById("demo");

            output.innerHTML = slider.value; 

            slider.addEventListener('input', function() {
                output.innerHTML = this.value;
                updateIngredientQuantities(this.value); 
            });

            function updateIngredientQuantities(numServings) {
                const mainIngredientsListItems = document.querySelectorAll('.main-ingredients-list li');
                const bechamelIngredientsListItems = document.querySelectorAll('.bechamel-ingredients-list li');

                mainIngredientsListItems.forEach(item => {
                    const baseQuantity = parseFloat(item.dataset.baseQuantity);
                    const updatedQuantity = baseQuantity * numServings;
                    const unit = item.dataset.unit;
                    item.querySelector('.ingredient-quantity').textContent = `${formatQuantity(updatedQuantity)} ${unit}`;
                });

                bechamelIngredientsListItems.forEach(item => {
                    const baseQuantity = parseFloat(item.dataset.baseQuantity);
                    const updatedQuantity = baseQuantity * numServings;
                    const unit = item.dataset.unit;
                    item.querySelector('.ingredient-quantity').textContent = `${formatQuantity(updatedQuantity)} ${unit}`;
                });
            }
            function formatQuantity(quantity) {
                if (Number.isInteger(quantity)) {
                    return quantity.toFixed(0); 
                } else {
                    return quantity.toFixed(2);
                }
            }

            const addToPantryBtn = document.getElementById('addToPantryBtn');
            addToPantryBtn.disabled = true;

            document.querySelectorAll('.main-ingredients-list input[type="checkbox"], .bechamel-ingredients-list input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    updateAddToPantryBtnState();
                });
            });
            function updateAddToPantryBtnState() {
                const anyCheckboxChecked = Array.from(document.querySelectorAll('.main-ingredients-list input[type="checkbox"], .bechamel-ingredients-list input[type="checkbox"]'))
                    .some(checkbox => checkbox.checked);

                addToPantryBtn.disabled = !anyCheckboxChecked;
                addToPantryBtn.classList.toggle('active', anyCheckboxChecked);
            }

            addToPantryBtn.addEventListener('click', function() {
                const mainIngredientsListItems = document.querySelectorAll('.main-ingredients-list li');
                const bechamelIngredientsListItems = document.querySelectorAll('.bechamel-ingredients-list li');
                const selectedIngredients = [];

                mainIngredientsListItems.forEach(item => {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    if (checkbox.checked) {
                        const name = item.querySelector('.ingredient-name').innerText;
                        const quantity = item.querySelector('.ingredient-quantity').innerText;
                        selectedIngredients.push({ name, quantity });
                    }
                });

                bechamelIngredientsListItems.forEach(item => {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    if (checkbox.checked) {
                        const name = item.querySelector('.ingredient-name').innerText;
                        const quantity = item.querySelector('.ingredient-quantity').innerText;
                        selectedIngredients.push({ name, quantity });
                    }
                });

                addToPantry(selectedIngredients);
            });
            function addToPantry(ingredients) {
                console.log('Adding ingredients to My Pantry:', ingredients);
                alert('Ingredients added to My Pantry!');
            }
        })
    });