import { HostBinding, HostListener,Directive, ElementRef } from "@angular/core";



@Directive({
    selector:"[appDropdown]"
})

export class DropdownDirective{

    constructor(private elRef:ElementRef){}

    @HostBinding("class.show") isOpen = false;

    @HostListener('document:click',["$event.target"]) toggleOpen(e:Event){
        
        this.isOpen = this.elRef.nativeElement ? !this.isOpen:false
    }
}