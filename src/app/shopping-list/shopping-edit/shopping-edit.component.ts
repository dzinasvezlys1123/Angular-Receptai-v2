import { Component, OnInit, Output,EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Ingrediants} from "../../shared/ingrediants.model";
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy {


  constructor(private shoppingListService:ShoppingListService) { }

  subscribeToEdit!:Subscription
  @ViewChild("form",{static:false}) shopingListForm!:NgForm
  editMode:boolean = false;
  itemId!: number;
  editedItem!: Ingrediants;



  ngOnInit(): void {

   this.subscribeToEdit = this.shoppingListService.startedEditing.subscribe(
      (id:number)=>{
        this.itemId = id
        this.editMode= true
         this.editedItem = this.shoppingListService.getSelectedIngreduant(id)
        
        this.shopingListForm.setValue(
          {
            name: this.editedItem.name,
            amount: this.editedItem.amount
        }
        )
      }
    )
  }

  onAddItem(form:NgForm){ //start on add fun
  const value = form.value
   const newIngredient = new Ingrediants(value.name,value.amount);
   if(this.editMode){
     
     this.shoppingListService.updateIngrediant(this.itemId,newIngredient)
  } else{

    this.shoppingListService.addIngrediant(newIngredient); //from shoppingService     
  }

   form.reset()
   this.editMode=false

  } // end on add fun

  onClear(){
    this.shopingListForm.reset();
    this.editMode = false
  }

  onDelete(){ //start onDelet
    this.shoppingListService.deleteIngrediant(this.itemId);
    this.onClear
  } // end onDelete
 

  ngOnDestroy(): void {
      this.subscribeToEdit.unsubscribe()
  }


}

