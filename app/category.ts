import { Item }   from './item';
export class Category {

    constructor(
        public name: string, 
        public items: Item[]
    ) { } 
}