import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storageRef;
  dateSuccess = false;
  inputText: string = '';
  url = 'webSite/';



  constructor(private fb: FormBuilder, public firebaseAuth: AngularFireAuth, public router: Router, private firestore: AngularFirestore) { }

  getSiteWeb() {
    return this.firestore.collection<any>("webSite", ref => ref.orderBy("date", "desc")).get();
  }

  // Filter
  onClickNome() {
    return this.firestore.collection<any>("webSite", ref => ref.orderBy("nome")).get();
  }

  onClickDark() {
    return this.firestore.collection<any>("webSite", ref => ref.where('dark', '==', 'yes')).get();
  }

  // Logout
  logout() {
    this.firebaseAuth.signOut().then(() => {
      this.router.navigateByUrl('login');
      localStorage.removeItem('user')
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Code:', errorCode + 'Message:', errorMessage);
      alert(error);
    });
  }

  form = this.fb.group({
    id: ['', Validators.required],
    selectDark: ['', Validators.required],
    date: ['', Validators.required],
    img: ['', Validators.required],
    nome: ['', Validators.required],
    urlGit: [''],
    urlSite: [''],
  });


  // Add Data
  creataData(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("webSite")
        .add(data)
        .then(res => {
          this.dateSuccess = true;
        }, err => reject(err));
    });
  }
  deleteDocument(url: string, id: string):
    Promise<any> {
      return this.getDocumentRef(`${this.url}${id}`).delete()
      .then(() => {
        return null;
      })
      .catch((error) => {
        return error;
      });
  }

  getDocumentRef(path: string): AngularFirestoreDocument {
    return this.firestore.doc(path);
  }

  getCollection(path: string, sortBy?: string): Observable<any[]> {
    return this.getCollectionSnapshot(path, sortBy).pipe(
      map(changes => {
        return changes.map(change => {
          const data = change.payload.doc.data();
          const id = change.payload.doc.id;
          return { id, ...data };
        });
      }
      ));
  }

  getCollectionSnapshot(
    path: string,
    sortBy?: string
  ): Observable<any[]> {
    return this.getCollectionRef(path, sortBy).snapshotChanges();
  }

  getCollectionRef(path: string, sortBy?: string):
    AngularFirestoreCollection {
    if (sortBy === undefined) {
      return this.firestore.collection(path);
    } else {
      return this.firestore.collection(path, ref => ref.orderBy(sortBy));
    }
  }

  getDocumentSnapshot(
    path: string,
  ): Observable<any> {
    return this.getDocumentRef(path).snapshotChanges();
  }
}
