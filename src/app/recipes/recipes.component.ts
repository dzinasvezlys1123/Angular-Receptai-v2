import { Component, OnInit } from '@angular/core';
import { DataStorageServiceService } from '../shared/data-storage-service.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit{


  constructor(private date:DataStorageServiceService) { }

  ngOnInit(): void {
  }


}
