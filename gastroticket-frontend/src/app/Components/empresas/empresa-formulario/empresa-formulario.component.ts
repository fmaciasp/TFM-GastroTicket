import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { EmpresaService } from 'src/app/Services/empresa.service';

@Component({
  selector: 'app-empresa-formulario',
  templateUrl: './empresa-formulario.component.html',
  styleUrls: ['./empresa-formulario.component.css']
})
export class EmpresaFormularioComponent implements OnInit {

  /*empresa: EmpresaDTO;
  empresaId: number;
  nombre: FormControl;
  email: FormControl;
  empresaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router
  ){
    this.empresaId = this.activatedRoute.snapshot.paramMap.get('id');

    this.empresa = 
    this.nombre = new FormControl(this.)
  }*/

  ngOnInit(): void {
    /*this.nombre = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);

    this.empresaForm = this.formBuilder.group({
      nombre: this.nombre,
      email: this.email
    });*/
  }



}
