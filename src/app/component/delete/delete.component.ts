import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  siteWeb: any;
  arraySiteWeb = [];
  items;
  site;
  myEventList: Observable<any>;

  constructor(public auth: AuthService, private firestore: AngularFirestore) { }

  firestoreData: Observable<any[]>;
  dataPath = 'webSite/';

  ngOnInit() {
    this.getData();
    this.firestoreData = this.auth.getCollection(this.dataPath);

    this.firestoreData.subscribe(firestoreData => {
      console.log(firestoreData);
      console.log(firestoreData[0].id);
    } );
  }

  getData() {
    this.removeArray();
    this.auth.getSiteWeb().subscribe(res => {
      res.docs.map(doc => {
        this.siteWeb = doc;
        this.arraySiteWeb.push(this.siteWeb.data());
      })
    });
  }

  onClickClose() {
    document.getElementById('open__filter__container').style.display = 'none';
    this.auth.inputText = '';
    this.removeArray();
    this.getData();
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

  onClickDark() {
    this.removeArray();
    this.auth.onClickDark().subscribe(res => {
      res.docs.map(doc => {
        this.siteWeb = doc.data();
        this.arraySiteWeb.push(this.siteWeb);
      })
    });
  }

  removeArray() {
    this.arraySiteWeb = [];
  }

  deleteTutorial(id: string) {
    this.auth.deleteDocument(this.dataPath,`${id}`);
  }


}
