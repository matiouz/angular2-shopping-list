import { Component, Input } from '@angular/core'
import { Item } from '../model/item'
import { ListService } from '../list.service'

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input({ required: true })
  item!: Item

  constructor (public listService: ListService) {
  }
}
