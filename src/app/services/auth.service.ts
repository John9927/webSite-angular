import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storageRef;
  dateSuccess = false;
  inputText: string = '';
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
    dark: ['', Validators.required],
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
}
