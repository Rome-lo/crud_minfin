import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { IconRocket } from '../../shared/ui/icons/rocket';
import { IconBack } from '../../shared/ui/icons/back';
import { ClienteService } from '../data-access/clientes.service';
import { ClienteForm } from '../../interfaces/cliente.interface';

export interface CreateForm {
  nombreCompleto: FormControl<string>;
  correo: FormControl<string>;
  telefono: FormControl<string>;
  direccion?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-crear-cliente',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[600px] m-auto">
      <form [formGroup]="form" (ngSubmit)="createCliente()">
        <div class="mb-8">
          <label for="nombreCompleto" class="block mb-2 text-sm font-medium"
            >Nombre completo</label
          >
          <input
            type="text"
            id="nombreCompleto"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="nombre"
            formControlName="nombreCompleto"
          />
        </div>
        <div class="mb-8">
          <label for="correo" class="block mb-2 text-sm font-medium"
            >Correo</label
          >
          <input
            type="text"
            id="correo"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="romeo7mol@gmail.com"
            formControlName="correo"
          />
        </div>
        <div class="mb-8">
          <label for="telefono" class="block mb-2 text-sm font-medium"
            >Teléfono</label
          >
          <input
            type="text"
            id="telefono"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="+502 53288171"
            formControlName="telefono"
          />
        </div>
        <div class="mb-8">
          <label for="direccion" class="block mb-2 text-sm font-medium"
            >Dirección</label
          >
          <textarea
            rows="3"
            type="text"
            id="direccion"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Dirección completa"
            formControlName="direccion"
          ></textarea>
        </div>

        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            routerLink="/dashboard"
          >
            <app-icon-back />
            Regresar
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-gray-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            <app-icon-rocket />
            @if (clienteId) {
              Editar cliente
            } @else {
              Agregar cliente
            }
          </button>
        </div>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, IconRocket, IconBack, RouterLink],
})
export default class ClienteCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  private _clientesService = inject(ClienteService);

  private _clienteId = '';

  get clienteId(): string {
    console.log(this._clienteId);
    return this._clienteId;
  }

  @Input() set clienteId(value: string) {
    this._clienteId = value;
    this.setFormValues(this._clienteId);
  }

  form = this._formBuilder.group<CreateForm>({
    nombreCompleto: this._formBuilder.control('', Validators.required),
    correo: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    telefono: this._formBuilder.control('', Validators.required),
    direccion: this._formBuilder.control(''),
  });

  async createCliente() {
    if (this.form.invalid) return;

    try {
      const cliente = this.form.value as ClienteForm;
      !this.clienteId
        ? await this._clientesService.createCliente(cliente)
        : await this._clientesService.updateCliente(this.clienteId, cliente);
      this._router.navigate(['/dashboard']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  async setFormValues(id: string) {
    try {
      const cliente = await this._clientesService.getCliente(id);
      if (!cliente) return;
      this.form.setValue({
        nombreCompleto: cliente.nombreCompleto,
        correo: cliente.correo,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
      });
    } catch (error) {}
  }
}

