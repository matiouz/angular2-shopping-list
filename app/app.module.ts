import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { CategoryComponent }   from './category.component';
import { ItemComponent }   from './item.component';
import { ItemCreatorComponent }   from './itemCreator.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CategoryComponent, ItemComponent, ItemCreatorComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

