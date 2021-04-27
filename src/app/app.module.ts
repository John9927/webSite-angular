import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { LoadingComponent } from './component/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './component/upload/upload.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NewCardComponent } from './new-card/new-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    LoadingComponent,
    UploadComponent,
    NewCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
