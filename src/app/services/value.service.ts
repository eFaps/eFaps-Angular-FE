import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Entry } from '../model/value';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private valueMap: Map<String, any> | undefined;

  values = signal<Map<String, any>>(new Map());

  private currentUpdate = new BehaviorSubject<Entry | undefined>(undefined);
  update = this.currentUpdate.asObservable();

  addEntry(entry: Entry) {
    if (this.valueMap == null) {
      this.valueMap = new Map();
    }
    if (typeof entry.index === 'undefined') {
      this.valueMap.set(entry.name, entry.value);
    } else {
      let valueArr: Array<any>;
      if (this.valueMap.has(entry.name)) {
        valueArr = this.valueMap.get(entry.name);
      } else {
        valueArr = new Array();
      }
      valueArr[entry.index] = entry.value;
      this.valueMap.set(entry.name, valueArr);
    }

    this.values.set(this.valueMap);
  }

  reset() {
    this.valueMap?.clear();
  }

  updateEntry(entry: Entry) {
    this.currentUpdate.next(entry);
  }

  resize(length: number, fieldNames: string[]) {
    if (this.valueMap == null) {
      this.valueMap = new Map();
    }
    fieldNames.forEach((name) => {
      if (this.valueMap?.has(name)) {
        const currentArray = this.valueMap.get(name) as Array<any>;
        const newArray = new Array<any>(length);
        currentArray.forEach((val, index) => {
          if (index < length) {
            newArray[index] = val;
          }
        });
        this.valueMap.set(name, newArray);
      }
    });
    this.values.set(this.valueMap);
  }

  addSetEntry(entry: {
    setName: String;
    rowId: number;
    name: string;
    value: any;
  }) {
    if (this.valueMap == null) {
      this.valueMap = new Map();
    }
    if (!this.valueMap.has(entry.setName)) {
      this.valueMap.set(entry.setName, {});
    }
    const setValue = this.valueMap.get(entry.setName);
    if (setValue[entry.rowId] == null) {
      setValue[entry.rowId] = new Map();
    }
    setValue[entry.rowId][entry.name] = entry.value;
    this.values.set(this.valueMap);
  }

  removeSetEntry(setName: string, rowId: string | number) {
    if (this.valueMap != null) {
      if (this.valueMap.has(setName)) {
        const setValue = this.valueMap.get(setName);
        delete setValue[rowId];
        console.log();
      }
      this.values.set(this.valueMap);
    }
  }
}
