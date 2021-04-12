import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth, public router: Router,) { }

  /* Sign up */
  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.isLoggedIn = true
        this.router.navigateByUrl('dashboard');
        localStorage.setItem('user', JSON.stringify(credential.user))
      }, error => {
        alert(error.message);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Code:', errorCode + 'Message:', errorMessage);
        alert(error);
      });
  }

  // Sign In
  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(credential => {
      this.isLoggedIn = true
      this.router.navigateByUrl('dashboard');
      localStorage.setItem('user', JSON.stringify(credential.user))
      }, error => {
          alert(error.message);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Code: ', errorCode + 'Message:', errorMessage);
        alert(error);
      });
  }

    // SignUp & Sign In with Google

    async createUserViaGoogle() {
      await this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(credential => {
            this.isLoggedIn = true
            this.router.navigateByUrl('dashboard');
            localStorage.setItem('user', JSON.stringify(credential.user))
        }, error => {
            alert(error.message);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('Code: ', errorCode + 'Message:', errorMessage);
          alert(error);
        });
    }

    // Sign with Facebook

    FacebookAuth() {
      return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
    }

      // Auth logic to run auth providers
    AuthLogin(provider) {
      return this.firebaseAuth.signInWithPopup(provider)
        .then((result) => {
            this.isLoggedIn = true
            this.router.navigateByUrl('dashboard');
            localStorage.setItem('user', JSON.stringify(result.user))
            console.log('You have been successfully logged in!')
            this.isLoggedIn = true;
            this.router.navigateByUrl("dashboard");
        }).catch((error) => {
          console.log(error)
          alert(error);
        })
    }
}
