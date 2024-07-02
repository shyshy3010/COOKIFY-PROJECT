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
        })
    });