import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pipe, switchMap, tap } from 'rxjs';

import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  // UI
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServiceService
  ) {}

  ngOnInit(): void {
      this.regiones = this.paisesService.regiones;

      this.miFormulario.get('region')?.valueChanges
          .pipe(
            tap(_ => {
              this.miFormulario.get('pais')?.reset('');
              this.cargando = true;
            }),
            switchMap((region: string) => this.paisesService.getPaisesPorRegion(region))
          )
          .subscribe( paises => {
            this.paises = paises
            this.cargando = false;
          })

      this.miFormulario.get('pais')?.valueChanges
          .pipe(
            tap(_ => {
              this.fronteras = [];
              this.miFormulario.get('frontera')?.reset('');
              this.cargando = true;
            }),
            switchMap((codigo: string) => this.paisesService.getPaisesPorCodigo(codigo))
          )
          .subscribe( pais => {
            if (pais && pais.length > 0) {
              this.fronteras = pais[0]?.borders || [];
            }
            this.cargando = false;
          })
  }


  guardar() {
    console.log('guardar...');
  }
}
