import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent {
  formAuth: FormGroup = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  error!: string;

  constructor(private form: FormBuilder, private service: AuthService) {}

  submitForm() {
    if (this.formAuth.valid) {
      this.service.sign(this.formAuth.value).subscribe({
        next: (response) => response,
        error: (e) => (this.error = e),
      });
    }
  }
}
