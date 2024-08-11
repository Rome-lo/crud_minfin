import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Cliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-card-cliente',
  template: `
    <div class="border border-gray-500/50 rounded-md p-4 flex flex-row gap-x-4">
      <div class="flex-1">
        <h4 class="text-black mb-2 font-bold">{{ cliente.nombreCompleto }}</h4>
        <small class="text-blue-500 mb-2">{{ cliente.telefono }}</small>
        <p class="text-black-300 mb-2">{{ cliente.correo }}</p>
        <p class="text-black-400 text-sm">
          {{
            !cliente.direccion ? '' : cliente.direccion
          }}
        </p>
      </div>
      <div>
        <app-menu
          (onEditCliente)="onEditCliente(cliente)"
          (onDeleteCliente)="onDeleteCliente(cliente)"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [MenuComponent],
})
export class CardClienteComponent {
  @Input({ required: true }) cliente!: Cliente;

  @Output() editCliente = new EventEmitter<Cliente>();

  @Output() deleteCliente = new EventEmitter<string>();

  onEditCliente(cliente: Cliente) {
    console.log(cliente);
    this.editCliente.emit(cliente);
  }

  onDeleteCliente(cliente: Cliente) {
    this.deleteCliente.emit(cliente.id);
  }
}
