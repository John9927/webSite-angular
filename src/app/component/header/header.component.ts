import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  filter__container = document.getElementById('filter__container');
  @Output() isLogout = new EventEmitter<void>()
  constructor(public authService: AuthService, public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  inputText = this.fb.group({
    text: ''
  });

  applyFilter(event: Event) {
    this.authService.inputText = (event.target as HTMLInputElement).value;
  }

  logout() {
    this.authService.logout()
    this.isLogout.emit();
  }

  onClickSearch() {
    document.getElementById('filter__container').style.position = 'absolute';
    document.getElementById('filter__container').style.display = 'flex';
    document.getElementById('filter__container').style.width = '100%';
    document.getElementById('filter__container').style.marginTop = '3px';
    document.getElementById('container__filter').style.marginTop = '74px';
  }

  onClickClose() {
    document.getElementById('filter__container').style.display = 'none';
    document.getElementById('container__filter').style.marginTop = '20px';
    this.authService.inputText = '';
    this.inputText.controls['text'].setValue('');
  }

}
