import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Validador para datas futuras com +1 dia
function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1);

  return selectedDate < minDate ? { tooSoon: true } : null;
}

// Validador para horários dentro do expediente (09:00 - 18:00)
function workingHoursValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const [hour, minute] = control.value.split(':').map(Number);
  if (hour < 9 || hour > 18 || (hour === 18 && minute > 0)) {
    return { outOfHours: true };
  }
  return null;
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
  lastBooking: any = null;

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
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      service: ['', Validators.required],
      date: ['', [Validators.required, futureDateValidator]],
      time: ['', [Validators.required, workingHoursValidator]],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.lastBooking = this.bookingForm.value; // guarda o agendamento para mostrar
      console.log('Form submitted:', this.bookingForm.value);
      alert('Agendamento enviado com sucesso!');
      this.bookingForm.reset();
    }
  }
}
