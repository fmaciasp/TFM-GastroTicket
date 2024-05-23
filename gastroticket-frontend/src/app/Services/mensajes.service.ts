import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private successMessageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private errorMessageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  sendSuccessMessage(message: string): void {
    this.successMessageSubject.next(message);
  }

  getSuccessMessage(): Observable<string | null> {
    return this.successMessageSubject.asObservable();
  }

  clearSuccessMessage(): void {
    this.successMessageSubject.next(null);
  }

  sendErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }

  getErrorMessage(): Observable<string | null> {
    return this.errorMessageSubject.asObservable();
  }

  clearErrorMessage(): void {
    this.errorMessageSubject.next(null);
  }
}
