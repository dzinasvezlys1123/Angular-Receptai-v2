import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageServiceService } from "../shared/data-storage-service.service";

@Component({
    selector: "app-header",
    templateUrl:"./header.component.html",
    styleUrls:["./header.component.css"]

})

export class HeaderComponent implements OnInit , OnDestroy{

    dropdowenIsOpen:boolean = false;
    isAuthantecated:boolean = false;
    private userSub!:Subscription; // to be easy to unsubscripe

    constructor(private data:DataStorageServiceService,private authService:AuthService, 
                private router:Router){}

    ngOnInit(): void {
       this.userSub =  this.authService.user.subscribe(user=>{
           this.isAuthantecated = !!user
       })
    }

    changeIsOpen(){
        this.dropdowenIsOpen = !this.dropdowenIsOpen;
    }

    onSaveData(){
        this.data.storeRecipes()

    }

    onFetchData(){
        this.data.fetchRecipes().subscribe()
    }

    onLogout(){
        this.authService.logout()
        this.router.navigate(['/auth'])
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }

    redirect(){
        if(!this.isAuthantecated){            
            this.router.navigate(["/auth"])
        }else{
            this.router.navigate(["/"])
        }

    }
}