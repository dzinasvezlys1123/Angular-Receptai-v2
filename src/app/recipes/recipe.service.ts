import { Injectable } from "@angular/core";
import { from, Subject } from "rxjs";
import { Ingrediants } from "../shared/ingrediants.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";


@Injectable({
    providedIn: "root"
})
export class RecipeService{
    recipeUpdated = new Subject<Recipe[]>()

    private recipes:Recipe[] = [
        // new Recipe("test","test descriptain","https://www.bbcgoodfoodme.com/wp-content/uploads/2021/11/channa-bhatura.png",
        // [
        //     new Ingrediants("tomato",2),
        //     new Ingrediants("Cheken",1)
        // ]),
        // new Recipe("test","test descriptain","https://th.bing.com/th/id/OIP.4Cg8BdDAgjKrtQQ92KYoLQHaE8?pid=ImgDet&rs=1",
        // [
        //     new Ingrediants("botato",2),
        //     new Ingrediants("chees",1)
        // ]),
        // new Recipe("test","test descriptain","https://www.bbcgoodfoodme.com/wp-content/uploads/2021/11/channa-bhatura.png",
        // [
        //     new Ingrediants("tomato",2),
        //     new Ingrediants("Meat",1)
        // ]
        // )
     ]

     constructor(private shoppingLS:ShoppingListService){}

     setRecipes(recipes:Recipe[]){
         this.recipes = recipes;
         this.recipeUpdated.next(this.recipes.slice())
     }
     getRecipes(){
         return this.recipes.slice()
     }
     getRecipe(index:number){
         return this.recipes[index];
     }
     AddIngrediantToShoppingList(ingredients:Ingrediants[]){
        this.shoppingLS.addIngrediants(ingredients);
        console.log("from AddIngrediantToShoppingList");
        
     }

     addRecipe(newRecipe:Recipe){
        this.recipes.push(newRecipe)
        this.recipeUpdated.next(this.recipes.slice())
     }

     updateRecipe(id:number,newRecipe:Recipe){
         this.recipes[id] = newRecipe;
        this.recipeUpdated.next(this.recipes.slice())
     }

     deleteRecipe(id:number){
         this.recipes.splice(id,1)
         this.recipeUpdated.next(this.recipes.slice())
        }
}