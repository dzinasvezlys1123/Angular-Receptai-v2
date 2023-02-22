import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageServiceService } from "../shared/data-storage-service.service";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipes.model";

@Injectable({providedIn:"root"})



export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService:DataStorageServiceService, private recipesService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipe = this.recipesService.getRecipes()
        if(recipe.length === 0){
            return this.dataStorageService.fetchRecipes()
        }else{
            return recipe
        }

    }
}