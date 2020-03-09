import { key, proxy } from '../config';

export default class List {
    constructor(){
        this.items = []
    }

    addItem(id, thumb, title, price, total, quantity){
        let item = {
            id,
            thumb,
            title,
            price,
            total,
            quantity
        }
        
        this.items.push(item)
        return item
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id)
        this.items.splice(index, 1)
        
    }

    
}