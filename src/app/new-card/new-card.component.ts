import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {
  ref: AngularFireStorageReference;
  image: string;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  download;
  selectedAlgorithm;
  constructor(public authService: AuthService, private afStorage: AngularFireStorage) { }
  @ViewChild('myDiv') myDiv: ElementRef;

  ngOnInit() {

  }

  onSubmit() {
    this.authService.creataData(this.authService.form.value);
    console.log(this.authService.form.value)
    this.authService.dateSuccess = true;
    if(this.authService.dateSuccess == true) {
        document.getElementById('modal__success__container').style.display = 'flex';
        document.getElementById('modal__success__container').style.justifyContent = 'center';
        document.getElementById('modal__success__container').style.width = '100%';
        document.getElementById('modal__success__container').style.position = 'absolute';
        document.getElementById('modal__success__container').style.top = '10%';
        document.getElementById('modal__success__container').style.zIndex = '10';
        document.getElementById('modal__success__container').addEventListener('click', () => {
          document.getElementById('modal__success').style.display = 'none';
        })
    } else {
      alert("Errore Creazione Card");
    }
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.snapshotChanges().pipe
      (map(s => (s.bytesTransferred / s.totalBytes) * 100));
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => (this.image = url));
      })
    )
    .subscribe();
    setTimeout(()=>{
      this.download = this.myDiv.nativeElement.innerHTML;
      this.authService.form.controls['img'].setValue(this.download);
 }, 3000);
  }
}


