import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ""
}

export const clearresult = () => {
    elements.resultList.innerHTML = "";
    elements.searchResultPages.innerHTML = "";
}

export const activeLink = id => {
    const resultArr = Array.from(document.querySelectorAll('.results__link'))
    resultArr.forEach(el => {
        el.classList.remove('active__link')
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('active__link')
}

export const limitRcpTitle = (title, limit = 20) => {
    var newTitle = []
    if(title.length > limit){
        title.split(" ").reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur)
            }
            return acc + cur.length;
        }, 0)
        return `${newTitle.join(' ')}...`
    }
    return title
}

const renderRecipe = recipe => {
    const baseVar = recipe.restaurant;
    
    const markUp = `
        <li>
            <a class="results__link" href="#${baseVar.id}">
                <figure class="results__fig">
                    <img src="${baseVar.thumb}" alt="${baseVar.name}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRcpTitle(baseVar.name, 25)}</h4>
                    <p class="results__author">${baseVar.name}</p>
                </div>
            </a>
        </li>
    `;

    elements.resultList.insertAdjacentHTML('beforeend', markUp)
};

const renderCategory = catg => {
    const categoryVar = catg.categories;
    const categoryMarkup = `
        <option value="${categoryVar.id}" selected>${categoryVar.name}</option>
    `
    elements.selectCategory.insertAdjacentHTML('beforeend', categoryMarkup)
};

const createBtn = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButton = (page, numResults, recPerPage) => {
    const pages = Math.ceil(numResults / recPerPage);
    let button;
    if(page === 1 && pages > 1){
        //button only to go next page
        button = createBtn(page, 'next');
    } else if(page < pages){
        //both next and prev Btn
        button = `
            ${createBtn(page, 'prev')};
            ${createBtn(page, 'next')};
        `
    } else if(page === pages && page > 1) {
        //button only for prev 
        button = createBtn(page, 'prev');
    }

    elements.searchResultPages.insertAdjacentHTML('afterbegin', button)
}

export const renderResults = (recipes, page = 1, recPerPage = 10) => {
    const start = (page - 1) * recPerPage;
    const end = page * recPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination
    renderButton(page, recipes.length, recPerPage);
}

export const renderCategoryOutput = categories => {
    categories.forEach(renderCategory)
}

