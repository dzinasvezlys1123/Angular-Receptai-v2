import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DataStorageServiceService } from 'src/app/shared/data-storage-service.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

 @Output() recipeWasSelected = new EventEmitter<Recipe>()


  constructor(private data:DataStorageServiceService,private recipeService:RecipeService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeUpdated.subscribe(
      (recipe:Recipe[])=>{
        this.recipes = recipe
        console.log(recipe);
        
      }
    )
    this.recipes = this.recipeService.getRecipes()
    this.data.fetchRecipes().subscribe()

  }

  onNewRecipe(){
    this.router.navigate(["new"],{relativeTo:this.activedRoute})
    // to navegate to /new and know there was a relative path
  }

}
