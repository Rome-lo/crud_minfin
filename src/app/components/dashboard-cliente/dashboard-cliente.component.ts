import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { of } from 'rxjs';
import { ClienteService } from '../data-access/clientes.service';
import { CardClienteComponent } from '../layout/card-cliente/card-cliente.component';
import { SearchBarComponent } from '../layout/search-bar/search-bar.component';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-dashboard-cliente',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[1200px] m-auto">
      <app-search-bar (changeQuery)="changeQuery($event)" />
      <section class="grid grid-cols-3 gap-8 mt-8">
        @for (cliente of clientes$ | async; track cliente.id) {
          <app-card-cliente
            [cliente]="cliente"
            (deleteCliente)="deleteCliente($event)"
            (editCliente)="editCliente($event)"
          />
        }
      </section>
    </div>
  `,
  standalone: true,
  imports: [CardClienteComponent, SearchBarComponent, AsyncPipe],
})
export default class ClienteDashboardComponent {
  private _clientesService = inject(ClienteService);

  private _router = inject(Router);

  clientes$ = this._clientesService.getClientes();

  async deleteCliente(id: string) {
    try {
      await this._clientesService.deleteCliente(id);
    } catch (error) {}
  }

  editCliente(cliente: Cliente) {
    console.log(cliente.id);
    this._router.navigate(['/dashboard/edit', cliente.id]);
  }

  async changeQuery(query: string) {
    try {
      const clientes = await this._clientesService.searchClienteByQuery(query);
      this.clientes$ = of(clientes);
    } catch (error) {console.log(error)}
  }
}
