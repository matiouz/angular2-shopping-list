import { Item }   from './item';
export class Category {

    public name: string;
    public items: Item[];

    constructor(name: string, items?: Item[]) {
        this.name = name;
        if (items==null){
            this.items = new Array<Item>();
        } else {
            this.items = items;
        }
    }  
}