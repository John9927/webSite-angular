import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  siteWeb: any;
  arraySiteWeb = [];
  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
    this.getData();
  }

  getData() {
    this.removeArray();
    this.auth.getSiteWeb().subscribe(res => {
      res.docs.map(doc => {
        this.siteWeb = doc.data();
        this.arraySiteWeb.push(this.siteWeb);
      })
    });
  }

  onClickClose() {
    document.getElementById('open__filter__container').style.display = 'none';
    document.getElementById('card__container').style.marginTop = '25px';
    this.auth.inputText = '';
  }

  onClickNome() {
    this.removeArray();
    this.auth.onClickNome().subscribe(res => {
      res.docs.map(doc => {
        this.siteWeb = doc.data();
        this.arraySiteWeb.push(this.siteWeb);
      })
    });
  }

  removeArray() {
    this.arraySiteWeb = [];
  }





}
