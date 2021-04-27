import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasserService {

  private _openedDeckId: number = -1

  constructor() {
  }

  getOpenedDeckId(): number {
    return this._openedDeckId
  }

  setOpenedDeckId(openedDeckId: number) {
    this._openedDeckId = openedDeckId
  }
}
