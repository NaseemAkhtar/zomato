import { elements } from "./base";
import {limitRcpTitle} from './searchView'

export const clearpage = () => {
    elements.resultPage.innerHTML = ""
}

export const clearListView = () => {
    elements.cartOuter.innerHTML = ""
}

export const addCart = cart => {
    
    const cartMarkup = `
        <li class="shopping__item" data-itemid="${cart.id}">
            <span class="delete__item">x</span>
            <div class="thumb" style="background: url(${cart.thumb}) no-repeat center;"></div>
            <div class="card__detail">
                <h5>${limitRcpTitle(cart.title)}</h5>
                <div class="price">₹${cart.price}</div>
                <div class="counter">
                    <button class="dec" disabled>-</button>
                    <input class="count" type="text" value="${cart.quantity}" readonly>
                    <button class="inc">+</button>
                </div>
                <div class="totalCost">₹${cart.total}</div>
            </div>
        </li>
    `
    elements.cartOuter.insertAdjacentHTML('beforeend', cartMarkup)

    //console.log(cart.average_cost)
}

export const deleteItem = id =>{
    const item = document.querySelector(`[data-itemid="${id}"]`)
    
    item.parentElement.removeChild(item)
}

export const calculatetotal = (id) =>{
    var value = parseInt(document.querySelector(`[data-itemid="${id}"] .count`).value, 10);
    value = isNaN(value) ? 0 : value;

    const getTotal = state.list.items.map((pr) => {
        return pr.total
    })

    state.list.items.forEach((el) => {
        el.id
        el.quantity = value
        el.total = el.price * el.quantity
        document.querySelector(`[data-itemid="${el.id}"] .totalCost`).innerHTML = "₹"+el.total
    })

    

    function myFunc(total, num) {
        return total + num;
    }
    document.querySelector('.rupee').innerHTML =  '₹ '+ getTotal.reduce(myFunc)
    console.log(getTotal)

}

export const itemSpin = (id, type) => {
    const item = document.querySelector(`[data-itemid="${id}"]`)
    var value = parseInt(document.querySelector(`[data-itemid="${id}"] .count`).value, 10);
    value = isNaN(value) ? 0 : value;
    if(type === 'dec'){
        value--;
        if(value === 1){
            document.querySelector(`[data-itemid="${id}"] .dec`).disabled = true;
        } else{
            document.querySelector(`[data-itemid="${id}"] .inc`).disabled = false;
            document.querySelector(`[data-itemid="${id}"] .dec`).disabled = false;
        }
        
    } else if(type === 'inc'){
        value++;
        if(value === 10){
            document.querySelector(`[data-itemid="${id}"] .inc`).disabled = true;
        } else{
            document.querySelector(`[data-itemid="${id}"] .inc`).disabled = false;
            document.querySelector(`[data-itemid="${id}"] .dec`).disabled = false;
        }
    }

    //calculatetotal(id, value)
    calculatetotal(id)
    document.querySelector(`[data-itemid="${id}"] .count`).value = value;
    
}

