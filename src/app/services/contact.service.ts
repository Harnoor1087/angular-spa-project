import { Injectable } from '@angular/core';
import { Observable, delay, of, tap, BehaviorSubject } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private messagesSubject = new BehaviorSubject<ContactMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor() { }

  sendMessage(data: { name: string; email: string; message: string }): Observable<boolean> {
    // Simulate API call with 1.5s delay
    return of(true).pipe(
      delay(1500),
      tap(() => {
        const newMessage: ContactMessage = {
          ...data,
          date: new Date()
        };
        const currentMessages = this.messagesSubject.getValue();
        this.messagesSubject.next([newMessage, ...currentMessages]);
      })
    );
  }
}
