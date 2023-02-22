import {Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingrediants } from "../shared/ingrediants.model";

@Injectable({
  providedIn:"root"
})

export class ShoppingListService  {

    ingrediantChanged = new Subject<Ingrediants[]>();
    startedEditing = new Subject<number>() // to edit on select 

    private ingrediants: Ingrediants[]  = [
        new Ingrediants("Apple",5),
        new Ingrediants("Tomato",10)
      ]

      getIngrediants(){
          return this.ingrediants.slice();
      }

      addIngrediant(ingrediant:Ingrediants){

        this.ingrediants.push(ingrediant);
        //use it in shopping edit to add the ingrediet
        this.ingrediantChanged.next(this.ingrediants.slice());

      }


      getSelectedIngreduant(id:number){
        return this.ingrediants[id]
        // get the selectet ingrediant from ingrediants 
      }

      addIngrediants(ingrediants:Ingrediants[]){
        
        this.ingrediants.push(...ingrediants);
        console.log(this.ingrediants);

        this.ingrediantChanged.next(this.ingrediants.slice())
      }

      updateIngrediant(id:number,newIngrediant:Ingrediants){
        this.ingrediants[id] = newIngrediant
        this.ingrediantChanged.next(this.ingrediants.slice())
      }

      deleteIngrediant(id:number){
        this.ingrediants.splice(id,1);
        this.ingrediantChanged.next(this.ingrediants.slice())
      }
}