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
  booksCollectionRef;
  books;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
    this.getData();
  }




  getData() {
    this.auth.getSiteWeb().subscribe(res => {
      res.docs.map(doc => {
        this.siteWeb = doc.data();
        this.arraySiteWeb.push(this.siteWeb);
      })
    });
  }





}
