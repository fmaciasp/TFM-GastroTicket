import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private successMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private errorMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  sendSuccessMessage(message: string): void {
    this.successMessageSubject.next(message);
  }

  getSuccessMessage(): Observable<string> {
    return this.successMessageSubject.asObservable();
  }

  sendErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }

  getErrorMessage(): Observable<string> {
    return this.errorMessageSubject.asObservable();
  }
}
