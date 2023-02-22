import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageServiceService } from 'src/app/shared/data-storage-service.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id!:number
  editMode:boolean = false;
  recipeForm!:FormGroup

  constructor(private data:DataStorageServiceService,private route:ActivatedRoute, private reciprService:RecipeService, private router:Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params["id"]
        this.editMode = params["id"] !=null // to check if we are resive param we recive param we on Edit mode
        //else we are on new mode /new or /:id/edit
        console.log(this.editMode+ " edit mode");   
        this.initForm()     // we call it her t o re call it when the Id changed
      }
    )
  } // end of ngOnInIt

  onSubmit(){ // start on submit
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //  this.recipeForm.value['path'], 
    //  this.recipeForm.value['discription'],
    //  this.recipeForm.value['ingrediants'])
    // or use this.recipeForm.value    
    if(this.editMode){
      this.reciprService.updateRecipe(this.id,this.recipeForm.value)
    }else{
      this.reciprService.addRecipe(this.recipeForm.value)
    }
    console.log(this.recipeForm.value);
    
    this.onCancle()
  } // end on submit

  onCancle(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }


    private initForm(){ //start

      let recipeName = "",
          url = "",
          discription = "",
          recipeIngrediants = new FormArray([]);

      const recipe = this.reciprService.getRecipe(this.id)      

      if(this.editMode){
        recipeName = recipe.name
        url = recipe.imgPath
        discription = recipe.discription
        if(recipe['ingrediants']){
          for (let ingrediant of recipe.ingrediants){
            recipeIngrediants.push(
              new FormGroup({
                'name': new FormControl(ingrediant.name,Validators.required) ,
                'amount': new FormControl(ingrediant.amount,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
          } 
        }
      }

      this.recipeForm = new FormGroup({
        'name' : new FormControl(recipeName,Validators.required),
        'discription': new FormControl(discription, Validators.required),
        'imgPath': new FormControl(url, Validators.required),
        'ingrediants':recipeIngrediants

      })

      
      
    } // end
    
    get controls(){ // to get the controlers from the array of the controlers to use them on the for loop
      return (<FormArray>this.recipeForm.get('ingrediants')).controls
    }

    addNewIngrediant(){ //add new ingrediant input control
      (<FormArray>this.recipeForm.get('ingrediants')).push(
        new FormGroup({
          'name':new FormControl(null,Validators.required),
          'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      )      
    }

   RemoveIngrediantControl (i:number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(i)
      }
      
      onAdd(){
        console.log("aza");
        
        this.data.storeRecipes
      }


}
