import {elements} from './base'
import {limitRcpTitle} from './searchView'

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = numLike => {
    elements.likeMenuBtn.style.visibility = numLike > 0 ? 'visible' : 'hidden';
}

export const likeCount = num => {
    document.querySelector('.likesCount').innerHTML = num
}

export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.featured_img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${limitRcpTitle(like.cuisines)}</p>
            </div>
        </a>
    </li>`;

    document.querySelector('.likes__list').insertAdjacentHTML('beforeend', markup)
}

export const delteLike = id => {
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el)
}