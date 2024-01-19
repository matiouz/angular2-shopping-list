export interface Item {
  isNeeded: boolean;
  name: string;
}

export interface ItemToAdd {
  item: Item;
  categoryName: string;
}
