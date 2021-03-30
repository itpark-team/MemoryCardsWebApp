import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getData(key: string): string {
    return localStorage.getItem(key);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  hasData(key: string): boolean {
    return localStorage.getItem(key) != null;
  }
}
