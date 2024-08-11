import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Cliente, ClienteForm } from '../../interfaces/cliente.interface';


const PATH = 'cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  getClientes() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Cliente[]>;
  }

  async getCliente(id: string) {
    try {
      console.log(id);
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Cliente;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async searchClienteByQuery(nombreCompleto: string) {
    const q = query(
      this._collection,
      where('nombreCompleto', '>=', nombreCompleto),
      where('nombreCompleto', '<=', nombreCompleto + '\uf8ff'),
    );
    //console.log(q);
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot);
    let Clientes: Cliente[] = [];
    querySnapshot.forEach((doc) => {
      Clientes = [...Clientes, { id: doc.id, ...doc.data() } as Cliente];
    });
    return Clientes;
  }

  createCliente(Cliente: ClienteForm) {
    return addDoc(this._collection, Cliente);
  }

  updateCliente(id: string, Cliente: ClienteForm) {
    //console.log(id);
    //console.log(Cliente);
    return updateDoc(this.document(id), { ...Cliente });
  }

  deleteCliente(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
