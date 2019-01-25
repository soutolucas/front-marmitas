import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Acompanhamento } from 'src/app/models/acompanhamento';

@Injectable({
  providedIn: 'root'
})

export class AcompanhamentoService {
  private acompanhamentoCollection: AngularFirestoreCollection<Acompanhamento>;
  private acompanhamentos: Observable<Acompanhamento[]>;

  constructor(private firestore: AngularFirestore) {
    this.acompanhamentoCollection = this.firestore.collection<Acompanhamento>(Acompanhamento.ROUTE, ref => ref.orderBy('name'));
    this.acompanhamentos = this.acompanhamentoCollection.valueChanges();
  }

  getAll(): Observable<Acompanhamento[]> {
    return this.acompanhamentos;
  }

  get(id: string): Observable<Acompanhamento> {
    return this.acompanhamentoCollection
      .doc<Acompanhamento>(id)
      .valueChanges();
  }

  delete(id: string): Promise<void> {
    return this.acompanhamentoCollection
      .doc<Acompanhamento>(id)
      .delete();
  }

  save(acompanhamento: Acompanhamento): Promise<void> {
    acompanhamento.id = acompanhamento.id || this.firestore.createId();
    return this.acompanhamentoCollection
      .doc<Acompanhamento>(acompanhamento.id)
      .set({ ...acompanhamento });
  }
}
