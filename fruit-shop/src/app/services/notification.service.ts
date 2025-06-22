import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastMessagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toastMessages$: Observable<ToastMessage[]> = this.toastMessagesSubject.asObservable();
  private nextId = 0;

  constructor() { }

  show(message: string, type: ToastMessage['type'] = 'info', duration: number = 3000): void {
    const newToast: ToastMessage = {
      id: this.nextId++,
      message,
      type,
      duration
    };
    // Add to the beginning of the array to show newest on top (if styling supports it)
    this.toastMessagesSubject.next([newToast, ...this.toastMessagesSubject.value]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(newToast.id);
      }, duration);
    }
  }

  remove(id: number): void {
    this.toastMessagesSubject.next(
      this.toastMessagesSubject.value.filter(toast => toast.id !== id)
    );
  }

  success(message: string, duration: number = 3000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 5000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration: number = 3000): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration: number = 4000): void {
    this.show(message, 'warning', duration);
  }
}
