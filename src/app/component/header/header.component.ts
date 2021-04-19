import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>()
  constructor(public authService: AuthService, public fb: FormBuilder) { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    document.getElementById('search__container').style.display = 'none';
    document.getElementById('container__filter').style.marginTop = '25px';
  }

  ngOnInit(): void {  }

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
    document.getElementById('open__filter__container').style.display = 'none';
    document.getElementById('search__container').style.position = 'absolute';
    document.getElementById('search__container').style.display = 'flex';
    document.getElementById('search__container').style.width = '100%';
    document.getElementById('search__container').style.marginTop = '3px';
    document.getElementById('card__container').style.marginTop = '74px';
  }

  onClickClose() {
    document.getElementById('search__container').style.display = 'none';
    document.getElementById('card__container').style.marginTop = '25px';
    this.authService.inputText = '';
    this.inputText.controls['text'].setValue('');
  }

  onClickFilter() {
    document.getElementById('search__container').style.display = 'none';
    document.getElementById('open__filter__container').style.position = 'absolute';
    document.getElementById('open__filter__container').style.display = 'flex';
    document.getElementById('open__filter__container').style.width = '100%';
    document.getElementById('open__filter__container').style.marginTop = '3px';
    document.getElementById('card__container').style.marginTop = '74px';
  }

}
