import { Injectable } from '@angular/core';
import { Proteina } from 'src/app/models/proteina';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProteinaService {
  private proteinaCollection: AngularFirestoreCollection<Proteina>;
  private proteinas: Observable<Proteina[]>;

  constructor(private firestore: AngularFirestore) {
    this.proteinaCollection = this.firestore.collection<Proteina>(Proteina.ROUTE, ref => ref.orderBy('name'));
    this.proteinas = this.proteinaCollection.valueChanges();
  }

  getAll(): Observable<Proteina[]> {
    return this.proteinas;
  }

  get(id: string): Observable<Proteina> {
    return this.proteinaCollection
      .doc<Proteina>(id)
      .valueChanges();
  }

  delete(id: string): Promise<void> {
    return this.proteinaCollection
      .doc<Proteina>(id)
      .delete();
  }

  save(proteina: Proteina): Promise<void> {
    proteina.id = proteina.id || this.firestore.createId();
    return this.proteinaCollection
      .doc<Proteina>(proteina.id)
      .set({ ...proteina });
  }
}
