import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { map, tap, take,exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageServiceService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    if(!this.recipeService.getRecipes()?.length)            
    return; // to prevent add null to the database 
    this.http
      .put(
        'https://recipe-angular-89b6a-default-rtdb.firebaseio.com/recipes.json',
        this.recipeService.getRecipes()
      )
      .subscribe((recipes) => {
        console.log(recipes);
      });
  }
  fetchRecipes() {
     
        return this.http.get<Recipe[]>(
          'https://recipe-angular-89b6a-default-rtdb.firebaseio.com/recipes.json'
        ).pipe(         
          map((recipes) => {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingrediants: recipe.ingrediants ? recipe.ingrediants : [],
              };
            });
          }),
          tap((recipes) => {
            this.recipeService.setRecipes(recipes);
          })
        );
}}
