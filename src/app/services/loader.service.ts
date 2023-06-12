import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private currentStatus = new BehaviorSubject<boolean>(false);
  isLoading = this.currentStatus.asObservable();

  constructor() {}

  show() {
    this.currentStatus.next(true);
  }

  hide() {
    this.currentStatus.next(false);
  }
}
