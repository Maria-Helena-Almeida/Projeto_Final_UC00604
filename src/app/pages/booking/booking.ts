import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking {
  bookingForm: FormGroup;

  services = [
    'Corte de cabelo',
    'Coloração',
    'Tratamento capilar',
    'Penteados e styling',
    'Extensões',
    'Alisamento e permanente'
  ];

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Form submitted:', this.bookingForm.value);
      alert('Agendamento enviado com sucesso!');
      this.bookingForm.reset();
    }
  }
}
