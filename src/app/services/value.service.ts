import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
 
  private valueMap: Map<String, any> | undefined;

  private currentValue = new BehaviorSubject<Map<String, any>>(new Map());
  values = this.currentValue.asObservable();

  constructor() {}

  addEntry(entry: { name: string; value: any }) {
    if (this.valueMap == null) {
      this.valueMap = new Map();
    }
    this.valueMap.set(entry.name, entry.value);
    this.currentValue.next(this.valueMap);
  }

  reset() {
    this.valueMap?.clear()
  }
}
