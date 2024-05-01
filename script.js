const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const receipeContainer = document.querySelector('.receipe-container');
const closeReceipeDetails = document.querySelector('.close-receipe-details');
const receipeDetailsContent = document.querySelector('.receipe-details-content');

// Url to Fetching data
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Fetching Receipe Data
const fetchReceipe = async () => {

    const searchInput = searchBox.value.trim();
    receipeContainer.innerHTML = `<h2>Fetching Data...</h2>`;

    try {
        const response = await fetch(url + searchInput);
        const data = await response.json();
        console.log(data);

        receipeContainer.innerHTML = ``;
        data.meals.forEach(item => {
            const receipeDiv = document.createElement('div');
            receipeDiv.classList.add('receipe');

            receipeDiv.innerHTML = `
            <img src="${item.strMealThumb}">
            <h3>${item.strMeal}</h3>
            <p><span>${item.strArea}</span> Dish</p>
            <p>Belong to:<span> ${item.strCategory}</span> Category</p>
            `
            const button = document.createElement('button');
            button.innerText = `View Receipe`;
            receipeDiv.appendChild(button);
            receipeContainer.appendChild(receipeDiv);

            button.addEventListener('click', () => {
                receipePopUp(item);
            })
        });

    } catch (error) {
        receipeContainer.innerHTML = `<h2>Error in Fetching Receipe...</h2>`;
    }
}

// Fetching Receipe Ingredient
const fetchIngretient = (item) => {
    let ingredientList = "";

    for (let i = 1; i <= 20; i++) {
        let ingredient = item[`strIngredient${i}`];

        if (ingredient) {
            let measure = item[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }else {
            break;
        }
    }

    return ingredientList;
}

// Receipe Popup Window
const receipePopUp = (item) => {
    
    receipeDetailsContent.innerHTML = `
    <h2 class="receipeTitle">${item.strMeal}</h2>
    <h3>Ingredient: </h3>
    <ul class="receipeIngredient">${fetchIngretient(item)}</ul>
    <div class="receipeInstruction">
       <h3>Instructions: </h3>
       <p>${item.strInstructions}</p>
    </div>
    `
    receipeDetailsContent.parentElement.style.display = "block";
}

// Add Event Listener to Close Receipe Button
closeReceipeDetails.addEventListener('click', () => {
    closeReceipeDetails.parentElement.style.display = "none";
})

// Add Event Listener to Search Button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (searchBox.value.trim() == "") {
        receipeContainer.innerHTML = `<h2>Type the Meal in the Search box.</h2>`;
        return;
    }
    
    fetchReceipe();
})