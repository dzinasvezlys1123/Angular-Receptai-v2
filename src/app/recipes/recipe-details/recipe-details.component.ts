import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!:Recipe;
  id!:number;
  constructor(private recipeService:RecipeService,private router:Router, private route:ActivatedRoute) { }

  isDropdownOpen:boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params["id"]
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
    
  }
  toggleIsOpen(){
    this.isDropdownOpen = ! this.isDropdownOpen
  }

  onAddToShoppingList(){
    this.recipeService.AddIngrediantToShoppingList(this.recipe.ingrediants)
    
    console.log("from onAddToShoppingList");    
  }

  onEdite(){
    this.router.navigate(["edit"],{relativeTo:this.route})
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['./recipes'])
  }

}
