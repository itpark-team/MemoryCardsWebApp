import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasserService {

  private _openedDeckId: number = -1

  private _errorTypeId: number = -1;

  constructor() {
  }

  getOpenedDeckId(): number {
    return this._openedDeckId
  }

  setOpenedDeckId(openedDeckId: number) {
    this._openedDeckId = openedDeckId
  }

  getErrorTypeId(): number {
    return this._errorTypeId;
  }

  setErrorTypeId(errorTypeId: number) {
    this._errorTypeId = errorTypeId;
  }
}
