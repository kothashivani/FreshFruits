import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService, ToastMessage } from '../../services/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations'; // For animations

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({ transform: 'translateY(100%) translateX(-50%)', opacity: 0, bottom: '-20px' })), // Start off-screen below
      state('*', style({ transform: 'translateY(0) translateX(-50%)', opacity: 1, bottom: '20px' })),    // End on-screen
      transition('void => *', [animate('0.3s ease-out')]), // Enter animation
      transition('* => void', [animate('0.3s ease-in')])  // Leave animation
    ])
  ]
})
export class NotificationComponent implements OnInit {
  messages$: Observable<ToastMessage[]>;

  constructor(public notificationService: NotificationService) { // Make public to access remove in template
    this.messages$ = this.notificationService.toastMessages$;
  }

  ngOnInit(): void {}

  // Optional: trackBy function for *ngFor for performance with many toasts
  trackByFn(index: number, item: ToastMessage): number {
    return item.id;
  }
}
