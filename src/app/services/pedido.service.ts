import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pedido } from '../models/pedido';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Local } from '../models/local';
import { Prato } from '../models/prato';
import { Acompanhamento } from '../models/acompanhamento';
import { Refeicao } from '../models/refeicao';
import { PratoDia } from '../models/pratoDia';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  private pedidoCollection: AngularFirestoreCollection<Pedido>;
  private pedidos: Observable<Pedido[]>;

  constructor(private firestore: AngularFirestore, private functions: AngularFireFunctions) {
    this.pedidoCollection = this.firestore.collection<Pedido>(Pedido.ROUTE, ref => ref.orderBy('openedAt', 'desc').limit(5));
    this.pedidos = this.pedidoCollection.valueChanges();
  }

  getPratoDia(): Observable<PratoDia>{
    const request = this.functions.httpsCallable('getPratoDia');
    return request(null);
  }

  getAll(): Observable<Pedido[]> {
    return this.pedidos;
  }

  get(id: string): Observable<Pedido> {
    return this.pedidoCollection
      .doc<Pedido>(id)
      .valueChanges();
  }

  getOpened(): Observable<Pedido[]> {
    
    const request = this.functions.httpsCallable('getPedidoOpen');
    return request(null);
  }

  getLocais(): Observable<Local[]> {
    const request = this.functions.httpsCallable('getLocais');
    return request(null);
  }

  getPratos(): Observable<Prato[]> {
    const request = this.functions.httpsCallable('getPratos');
    return request(null);
  }

  getAcompanhamentos(): Observable<Acompanhamento[]> {
    const request = this.functions.httpsCallable('getAcompanhamentos');
    return request(null);
  }

  close(pedido: Pedido) {
    const request = this.functions.httpsCallable('closePedido');
    pedido.closedAt = Date.now();
    return request(pedido);
  }

  open(pedido: Pedido) {
    const request = this.functions.httpsCallable('openPedido');
    pedido.openedAt = Date.now();
    return request(pedido);
  }

  addRefeicao(pedido: Pedido, refeicao: Refeicao) {
    const request = this.functions.httpsCallable('addRefeicao');
    refeicao.orderedAt = Date.now();
    return request({ pedido, refeicao });
  }
}
