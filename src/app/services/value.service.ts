import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private valueMap: Map<String, any> | undefined;

  private currentValue = new BehaviorSubject<Map<String, any>>(new Map());
  values = this.currentValue.asObservable();

  private currentUpdate = new BehaviorSubject<
    { name: string; value: any; index?: number } | undefined
  >(undefined);
  update = this.currentUpdate.asObservable();

  constructor() {}

  addEntry(entry: { name: string; value: any }, index?: number) {
    if (this.valueMap == null) {
      this.valueMap = new Map();
    }
    if (index != null) {
      let valueArr: Array<any>;
      if (this.valueMap.has(entry.name)) {
        valueArr = this.valueMap.get(entry.name);
      } else {
        valueArr = new Array();
      }
      valueArr[index] = entry.value;
      this.valueMap.set(entry.name, valueArr);
    } else {
      this.valueMap.set(entry.name, entry.value);
    }
    this.currentValue.next(this.valueMap);
  }

  reset() {
    this.valueMap?.clear();
  }

  updateEntry(entry: { name: string; value: any; index?: number }) {
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
          newArray[index] = val;
        });
        this.valueMap.set(name, newArray);
      }
    });
    this.currentValue.next(this.valueMap);
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
    this.currentValue.next(this.valueMap);
  }

  removeSetEntry(setName: string, rowId: string | number) {
    if (this.valueMap != null) {
      if (this.valueMap.has(setName)) {
        const setValue = this.valueMap.get(setName);
        delete setValue[rowId];
        console.log();
      }
      this.currentValue.next(this.valueMap);
    }
  }
}
