import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

// import { emailPattern, noPuedeSerStrider } from '../../../shared/validators/validaciones';
// import { nombreApellidoPattern } from 'src/app/shared/validators/validaciones';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';
import { ValidatorService } from '../../../shared/validators/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['',
      [Validators.required, Validators.pattern(this.validatorService.emailPattern)],
      [this.emailValidator]
    ],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required ]],
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2')]
  });

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.['required']) {
      return 'Email es obligatorio';
    }
    if (errors?.['pattern']) {
      return 'Email no tiene el formato de correo';
    }
    if (errors?.['emailTomado']) {
      return 'El email ya fue tomado';
    }

    return '';
  }


  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Don quijote',
      email: 'test1@test.com',
      username: 'test1',
      password: '123456',
      password2: '123456',
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
          && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.['required']
  //         && this.miFormulario.get('email')?.touched;
  // }
  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //         && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //         && this.miFormulario.get('email')?.touched;
  // }


  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }
}
