import { Injectable } from '@angular/core';
import { Prato } from 'src/app/models/prato';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PratoService {
  private pratoCollection: AngularFirestoreCollection<Prato>;
  private pratos: Observable<Prato[]>;

  constructor(private firestore: AngularFirestore) {
    this.pratoCollection = this.firestore.collection<Prato>(Prato.ROUTE, ref => ref.orderBy('name'));
    this.pratos = this.pratoCollection.valueChanges();
  }

  getAll(): Observable<Prato[]> {
    return this.pratos;
  }

  get(id: string): Observable<Prato> {
    return this.pratoCollection
      .doc<Prato>(id)
      .valueChanges();
  }

  delete(id: string): Promise<void> {
    return this.pratoCollection
      .doc<Prato>(id)
      .delete();
  }

  save(prato: Prato): Promise<void> {
    prato.id = prato.id || this.firestore.createId();
    return this.pratoCollection
      .doc<Prato>(prato.id)
      .set({ ...prato });
  }
}
