document.addEventListener('DOMContentLoaded', function() {
    let data = {
        pantryIngredients: [],
        preparedMeals: []
    };

    fetch('data/pantry.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            updatePantry(data);
        });

    function updatePantry(data) {
        const ingredientList = document.querySelector('.ingredient-list');
        const mealList = document.querySelector('.meal-list');
        const ingredientCount = document.querySelector('.ingredient-count');
        const mealCount = document.querySelector('.meal-count');


        ingredientList.innerHTML = '';
        mealList.innerHTML = '';

        if (data.pantryIngredients && data.pantryIngredients.length > 0) {
            data.pantryIngredients.forEach((ingredient, index) => {
                const ingredientItem = document.createElement('div');
                ingredientItem.classList.add('ingredient-item');
                ingredientItem.innerHTML = `
                    <img src="${ingredient.image}" alt="${ingredient.name}">
                    <span>${ingredient.quantity} ${ingredient.unit} ${ingredient.name}</span>
                    <button class="delete-ingredient-button" data-index="${index}">Delete</button>
                `;
                ingredientList.appendChild(ingredientItem);
            });
        }
        ingredientCount.textContent = `${data.pantryIngredients.length} Ingredients`;

      
        if (data.preparedMeals && data.preparedMeals.length > 0) {
            data.preparedMeals.forEach((meal, index) => {
                const mealItem = document.createElement('div');
                mealItem.classList.add('meal-item');
                mealItem.innerHTML = `
                    <img src="${meal.image}" alt="${meal.name}">
                    <span>${meal.name} - ${meal.date}</span>
                    <button class="delete-meal-button" data-index="${index}">Delete</button>
                `;
                mealList.appendChild(mealItem);
            });
        }
        mealCount.textContent = `${data.preparedMeals.length} Meals`;

        document.querySelectorAll('.delete-ingredient-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                confirmDelete('ingredient', index); 
            });
        });

        document.querySelectorAll('.delete-meal-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                confirmDelete('meal', index); 
            });
        });
    }

    
    function confirmDelete(type, index) {
        const itemName = type === 'ingredient' ? 'ingredient' : 'meal';
        const confirmation = confirm('Are you sure you want to delete this?')
        if (confirmation) {
            if (type === 'ingredient') {
                removeIngredient(index);
            } else {
                removeMeal(index);
            }
        }
    }

    function addIngredient(name, quantity, unit, image) {
        data.pantryIngredients.push({ name, quantity, unit, image });
        updatePantry(data);
    }

    function addMeal(name, date, image) {
        data.preparedMeals.push({ name, date, image });
        updatePantry(data);
    }

    function removeIngredient(index) {
        data.pantryIngredients.splice(index, 1);
        updatePantry(data);
    }

    function removeMeal(index) {
        data.preparedMeals.splice(index, 1);
        updatePantry(data);
    }

    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function changeSectionColors() {
        const ingredientsSection = document.querySelector('.ingredients-section');
        const mealsSection = document.querySelector('.meals-section');

        const color = randomColor(); 

        ingredientsSection.style.backgroundColor = color;
        mealsSection.style.backgroundColor = color;
    }

    const changeColorButton = document.querySelector('.change-color-button');
    changeColorButton.addEventListener('click', changeSectionColors);
});
