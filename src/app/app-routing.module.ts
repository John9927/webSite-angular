import { DeleteComponent } from './component/delete/delete.component';
import { NewCardComponent } from './new-card/new-card.component';
import { UploadComponent } from './component/upload/upload.component';
import { GuardGuard } from './guard.guard';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [GuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard]  },
  { path: 'upload', component: UploadComponent },
  { path: 'new', component: NewCardComponent },
  { path: 'delete', component: DeleteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
