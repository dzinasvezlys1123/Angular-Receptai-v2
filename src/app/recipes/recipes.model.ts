import { Ingrediants } from "../shared/ingrediants.model";

export class Recipe{
    public name:string;
    public discription: string;
    public imgPath: string;
    public ingrediants:Ingrediants[];

    constructor(name:string,dis:string,path:string,ingrediants:Ingrediants[]){
        this.name = name;
        this.discription = dis;
        this.imgPath = path;
        this.ingrediants = ingrediants;
    }

}