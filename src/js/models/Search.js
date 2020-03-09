import axios from "axios";
import { key, proxy } from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }
    
    async getResults(city, categoryID){
        const settings = {
            method: 'GET',
            headers: {
                'user-key': key,
                'Content-Type': 'application/json',
            }
        };
        
        try{
            /*const fetchResponse = await fetch(`${proxy}http://developers.zomato.com/api/v2.1/search?q=${city}`, settings);
            const res = await fetchResponse.json();
            this.result = await res.restaurants;*/

            const fetchcategory = await fetch(`https://developers.zomato.com/api/v2.1/categories`, settings);
            const resCategory = await fetchcategory.json();
            this.getCategory = resCategory.categories

            const restaurentURL = `${proxy}https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&category=${categoryID}&sort=rating`;
            const restaurentInfo = await fetch(restaurentURL, settings);
            const restaurentJSON = await restaurentInfo.json();
            this.restaurent = await restaurentJSON.restaurants;

            let cityID = 0;
            if(this.restaurent.length > 0){
                cityID = this.restaurent[0].restaurant.location.city_id;
            }   

        } catch(err){
            console.log(err)
        }
    }
}