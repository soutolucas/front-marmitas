import { Injectable } from '@angular/core';
import { Local } from 'src/app/models/local';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalService {
  private localCollection: AngularFirestoreCollection<Local>;
  private locais: Observable<Local[]>;

  constructor(private firestore: AngularFirestore) {
    this.localCollection = this.firestore.collection<Local>(Local.ROUTE, ref => ref.orderBy('name'));
    this.locais = this.localCollection.valueChanges();
  }

  getAll(): Observable<Local[]> {
    return this.locais;
  }

  get(id: string): Observable<Local> {
    return this.localCollection
      .doc<Local>(id)
      .valueChanges();
  }

  delete(id: string): Promise<void> {
    return this.localCollection
      .doc<Local>(id)
      .delete();
  }

  save(local: Local): Promise<void> {
    local.id = local.id || this.firestore.createId();
    return this.localCollection
      .doc<Local>(local.id)
      .set({ ...local });
  }
}
