
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as addTocartView from './views/addTocartView';
import * as LikesView from './views/LikesView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './views/base'
//import { stat } from 'fs';

const state = {}

window.state = state



const controlSearch = async () => {
    const categoryId = parseInt(elements.selectCategory.value);
    const cityValue = elements.searchInput.value;
    //if(categoryId === 0 || cityValue === ''){
    if(cityValue === ''){
        alert('please Select Category and enter City')
    } else {
        //1 get query from view
        const query = searchView.getInput()

        //2 new search object and add to state
        state.search = new Search()
        clearLoader();

        //3 prepare UI for result
        searchView.clearresult();
        renderLoader(elements.resultDiv);

        //4 search for recipies
        await state.search.getResults(query, categoryId);

        //5 render result on UI
        document.querySelector('.loader').remove();
        searchView.renderResults(state.search.restaurent)
        searchView.clearInput(); 
    }
    
        //console.log(state.search.restaurent[0].restaurant.location.city_id+ " my id")  
}

(async () => {
    const categoryId = parseInt(elements.selectCategory.value);
    //1 get query from view
    const query = searchView.getInput()

    //2 new search object and add to state
    state.search = new Search()
    clearLoader();

    //3 prepare UI for result
    //searchView.clearresult();
    renderLoader(elements.resultDiv);

    //4 search for recipies
    await state.search.getResults(query, categoryId);

    //5 render result on UI
    document.querySelector('.loader').remove();
    searchView.renderResults(state.search.restaurent)
    document.querySelector('.results__list li:first-child a').click()
    
    
})();

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();

    controlSearch()
});

//Testing function
//window.addEventListener('load', controlSearch)

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearresult();
        searchView.renderResults(state.search.restaurent, gotoPage)
    }
});

(async () => {
    const r = new Search();
    await r.getResults(); 
    searchView.renderCategoryOutput(r.getCategory);
})();



const controlrecipe = async () => { 
    const id = window.location.hash.replace('#', '')

    if(id){
        if(state.search) searchView.activeLink(id);
        
        //create new recipe object
        state.recipe = new Recipe(id);
        try{
            //get recipe data
            await state.recipe.getRecipe();

            recipeView.clearpage();
            //render recipe
            const getRe = state.recipe
            //console.log(state.recipe)
            recipeView.renderRecipePage(
                state.recipe,
                state.likes.isLiked(state.recipe.id)
            )
            
        } catch(err){
            console.log(err)
        }
    }
    
}
//window.addEventListener('hashchange', controlrecipe)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlrecipe))


const cartlist = async () => { 
    const id = window.location.hash.replace('#', '')
    if(id){
        //create new recipe object
        state.recipe = new Recipe(id);
        if(!state.list) state.list = new List()
        //state.list = new List()

        try{
            //get recipe data
            
            document.querySelector('.add__item').innerHTML = "Loading..."
            
            await state.recipe.getRecipe();
            await state.list.addItem(state.recipe.id, state.recipe.featured_img, state.recipe.title, state.recipe.average_cost, state.recipe.average_cost, 1)

            //render recipe
            addTocartView.clearListView();
            state.list.items.forEach(el => {
                addTocartView.addCart(el)
                //addTocartView.calculatetotal(el.average_cost)
            })
            addTocartView.calculatetotal(id)
            console.log(state.list)
            //addTocartView.calculatetotal(id, type)
            //addTocartView.addCart(state.recipe)
            //addTocartView.calculatetotal(state.recipe.average_cost)
            document.querySelector('.add__item').classList.add('added')
            document.querySelector('.add__item').innerHTML = "Added"
            //addTocartView.clearListView();

        } catch(err){
            console.log(err)
        }
    }

}

const controlLike = () => {
    if(!state.likes) state.likes = new Likes()
    const curId = state.recipe.id;
    //user has yyet not likeed current recipe
    if(!state.likes.isLiked(curId)){
        //add like to the state
        const newLike = state.likes.addLike(curId, state.recipe.featured_img, state.recipe.title, state.recipe.cuisines);
        
        //toggle the like button
        LikesView.toggleLikeBtn(true)

        // add like to UI list
        LikesView.renderLike(state.recipe)
    } else {
        // remove like from state
        state.likes.deleteLike(curId)

        //toggle like button
        LikesView.toggleLikeBtn(false)

        // remove like from UI list
        LikesView.delteLike(curId)
        //console.log(state.likes)
    }

    LikesView.toggleLikeMenu(state.likes.getNumLikes())
    LikesView.likeCount(state.likes.getNumLikes())
    
}



$('body').on('click', '.delete__item', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    state.list.deleteItem(id)

    if(state.list.items.length){
        addTocartView.calculatetotal(id)
    } else {
        document.querySelector('.rupee').textContent = "₹ 00.00"
    }
    
    addTocartView.deleteItem(id)


    console.log(state.list)
})



elements.cartOuter.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    const totalItems = document.querySelector(`[data-itemid="${id}"] .count`).value;
    const btn = e.target.closest('button');
    if(btn){
        const type = btn.className; 
        addTocartView.itemSpin(id, type)

        
    }

});

//Restore like recipe on page load
window.addEventListener('load', ()=> {
    state.likes = new Likes();

    //Store like
    state.likes.readStorage()

    //Toggle like menu button
    LikesView.toggleLikeMenu(state.likes.getNumLikes());
    LikesView.likeCount(state.likes.getNumLikes())

    // Render the exisiting likes
    state.likes.likes.forEach(like => LikesView.renderLike(like))
})

document.querySelector('.recipe').addEventListener('click', e => {
    if(e.target.matches('.add__item, .add__item *')){
        cartlist()
        
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike()
    }
})

$(document).ready(function(e) {
	lc_lightbox('.elem', {
		wrap_class: 'lcl_fade_oc',
		gallery : true,	
		thumb_attr: 'data-lcl-thumb', 
		
		skin: 'minimal',
		radius: 0,
		padding	: 0,
        border_w: 0,
        thumbs_w: 70,
        thumbs_h: 70,
	});	

});







