import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediants } from '../shared/ingrediants.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  ingrediants!: Ingrediants[];
  ingreduantsChangeSupscription!:Subscription;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingrediants = this.shoppingListService.getIngrediants();
    this.ingreduantsChangeSupscription = this.shoppingListService.ingrediantChanged.subscribe(
      (ingrediant:Ingrediants[])=>{
        this.ingrediants = ingrediant;
    })
  }

  ngOnDestroy(): void{
    this.ingreduantsChangeSupscription.unsubscribe()
  }

  onEditItem(id:number){
        this.shoppingListService.startedEditing.next(id)
        // pass the index to the service to pass it to edit mode
  }

}
