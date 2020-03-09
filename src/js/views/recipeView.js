import { elements } from "./base";

export const clearpage = () => {
    elements.resultPage.innerHTML = ""
}

export const renderRecipePage = (recipe, isLiked) => {
    const pageMarkup = `<div class="recipe__Box">
    <div class="recipe__fig" style="background: url(${recipe.featured_img};">
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
        <div class="gallery">
            ${galleryList(recipe.gallery_photo)}
        </div>
    </div>
    <div class="recipe__details">
        <h1 class="recipe__title">${recipe.title}</h1>
        <div class="price__box">
            <span class="price">Price: ₹${recipe.average_cost}</span>
            <a class="add__item" href="javascript:;">Add</a>
        </div>
        <div class="rating">
            <div class="ratingBox" style="background: #${recipe.rating_color}">${recipe.rating} <span>/ 5</span></div>
            <div class="votes">${recipe.reviewCounts} votes</div>
        </div>
        
    </div>

    <div class="restaurent__detail">
        <div class="box">
            <div class="block">
                <h3>Phone number</h3>
                <div class="phone">${recipe.number}</div>
                <div class="txt__gray">Table reservation required</div>
            </div>

            <div class="block">
                <h3>Cuisines</h3>
                <p>${recipe.cuisines}</p>
            </div>

            <div class="block">
                <h3>Average Cost </h3>
                <p>₹${recipe.average_cost} for two people (approx.)  with alcohol</p>
                <div class="txt__gray">Exclusive of applicable taxes and charges, if any</div>
            </div>
        </div><!--end  of bock-->

        <div class="box">
            <div class="block">
                <h3>Opening hours</h3>
                    <div class="opening">${recipe.timing}</div>    
            </div>

            <div class="block">
                <h3>${recipe.address}</h3>
                <a class="get__direction" href="https://www.google.co.in/maps/dir//${recipe.get_direction}/@${recipe.get_direction},17z" target="_blank">
                    <img src="https://maps.zomato.com/php/staticmap?center=${recipe.get_direction}&amp;size=340x210&amp;maptype=zomato&amp;markers=${recipe.get_direction},pin_res32&amp;sensor=false&amp;scale=2&amp;zoom=14&amp;language=en" alt="" />
                    <div>Get direction</div>
                </a>
            </div>
        </div>

        <div class="more__info box">
            <h3>More info</h3>
            <ul class="ul__list">
                ${hiList(recipe.highlights)}
            </ul>
        </div>
    </div>
    </div>
    `
    elements.resultPage.insertAdjacentHTML('beforeend', pageMarkup)
}

const hiList = list => {
   return list.map(data => `<li>${data}</li>`).join("");
}

const galleryList = list => {
    return list.map(item => `<a class="elem" href="${item.photo.url}" title="" data-lcl-txt="" data-lcl-author="" data-lcl-thumb="${item.photo.thumb_url}">
    <span class="thm" style="background-image: url(${item.photo.thumb_url});"></span>
<div>All photos</div></a>`).join("");
}