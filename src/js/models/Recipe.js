//import axios from "axios";
import { key, proxy } from '../config';


export default class Recipe {
    constructor(id){
        this.id = id
    }

    async getRecipe() {
        const settings = {
            method: 'GET',
            headers: {
                'user-key': 'c603f6ae55e30894be92c10f25bb564e',
                'Content-Type': 'application/json',
            }
        };
        
        try{
            const fetchrecipe = await fetch(`${proxy}https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.id}`, settings);
            const resRecipe = await fetchrecipe.json();
            this.id = resRecipe.R.res_id
            this.title = resRecipe.name
            this.cuisines = resRecipe.cuisines
            this.featured_img = resRecipe.featured_image
            this.url = resRecipe.url
            this.average_cost = resRecipe.average_cost_for_two
            this.rating = resRecipe.user_rating.aggregate_rating
            this.rating_color = resRecipe.user_rating.rating_color
            this.reviewCounts = resRecipe.all_reviews_count
            this.gallery_photo = resRecipe.photos
            this.address = resRecipe.location.address
            this.highlights = resRecipe.highlights
            this.timing = resRecipe.timings
            this.number = resRecipe.phone_numbers
            this.get_direction = resRecipe.location.latitude+ ',' + resRecipe.location.longitude;
            //this.getReci = resRecipe.categories
            //console.log(resRecipe);
            //console.log(this.gallery_photo[1].photo.thumb_url)
            //console.log(`https://www.google.co.in/maps/dir//${this.getDirection}/@${this.getDirection},17z`)
            
        } catch(err){
            console.log(err);
        }
    }
}