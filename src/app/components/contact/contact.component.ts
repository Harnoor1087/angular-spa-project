import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, ContactMessage } from '../../services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  
  messages$!: Observable<ContactMessage[]>;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.messages$ = this.contactService.messages$;
  }

  // Getter for easy access in template
  get f() { return this.contactForm.controls; }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';

    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Your message has been sent successfully!';
        this.contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: () => {
        this.isSubmitting = false;
        // Handle error here if needed
      }
    });
  }
}
