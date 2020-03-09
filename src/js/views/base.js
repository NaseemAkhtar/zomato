export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    resultDiv: document.querySelector('.results'),
    resultList: document.querySelector('.results__list'),
    searchResultPages: document.querySelector('.results__pages'),
    selectCategory: document.querySelector('#selectCategory'),
    resultLinkBtn: document.querySelector('.results__link'),
    resultPage: document.querySelector('.recipe'),
    cartOuter: document.querySelector('.shopping__list'),
    addCartBtn: document.querySelector('.add__item'),
    deleteItem: document.querySelector('.delete__item'),
    spinBtn: document.querySelector('.spinBtn'),
    likeMenuBtn: document.querySelector('.likes__field')
};

export const elementStr = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStr.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',  loader)
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStr.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader)
    }
}