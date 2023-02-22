import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routeing.module";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRouteingModule } from "./recipe.routeing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations:[
        RecipeDetailsComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipesComponent
    ],
    imports:[AppRoutingModule,ReactiveFormsModule,RecipeRouteingModule,SharedModule]
})
export class RecipesModule{}