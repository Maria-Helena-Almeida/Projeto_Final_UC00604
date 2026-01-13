import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Simulação de emails já cadastrados
const existingEmails = ['maria@example.com', 'joao@gmail.com'];

function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1); // +1 dia de antecedência

  return selectedDate < minDate ? { tooSoon: true } : null;
}

// Validador de email único (simulado)
function uniqueEmailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return existingEmails.includes(control.value.toLowerCase()) ? { emailTaken: true } : null;
}

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
      email: ['', [Validators.required, Validators.email, uniqueEmailValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      service: ['', Validators.required],
      date: ['', [Validators.required, futureDateValidator]],
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
