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
    });