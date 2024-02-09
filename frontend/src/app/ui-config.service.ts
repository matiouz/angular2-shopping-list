import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiConfigService {
  constructor() {}

  itemNameFilterExpression: string | null = null;
  isEditionMode: boolean = false;
  isDisplayNotNeededItems: boolean = false;
}
