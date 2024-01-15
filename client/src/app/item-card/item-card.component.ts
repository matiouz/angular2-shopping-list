import { Component, Input } from '@angular/core'
import { Item } from '../model/item'
import { ListService } from '../list.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input({ required: true })
  item!: Item

  constructor (public listService: ListService) {
  }

  saveItem() {
  }
}
