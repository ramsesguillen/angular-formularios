import { Component, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initialForm = {
    producto: '',
    precio: 10,
    existencias: 10,
  }


  nombreValido(): boolean {
    return this.miFormulario?.controls['producto']?.invalid
        && this.miFormulario?.controls['producto']?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.controls['precio']?.value < 0
          && this.miFormulario?.controls['precio']?.touched;
  }

  guardar(): void {
    // this.miFormulario.resetForm();
    this.miFormulario.resetForm({
      producto: '',
      precio: 0,
      existencias: 0,
    });
  }
}
