import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector:"[colorDirective]"
})

export class ColorDirective implements OnInit{
    constructor(private element:ElementRef,private renderer: Renderer2){}

    ngOnInit(){
    }
    @HostListener("mouseenter") mouseover(){
        this.renderer.setStyle(this.element.nativeElement,"color","blue")
    }
    @HostListener("mouseleave") mouseaway(){
        this.renderer.setStyle(this.element.nativeElement,"color","black")
    }
}