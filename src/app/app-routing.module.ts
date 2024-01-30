import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component/login.component';
import { MenuComponent } from './components/menu.component/menu.component';
import { WorkSpaceComponent } from './components/work-space.component/work-space.component';
import { DocumentsComponent } from './components/documents.component/documents.component';
import { InfoComponent } from './components/info.component/info.component';
import { DocumentItemsComponent } from './components/document-items.component/document-items.component';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [loginGuard] },
  { path: 'work-space/:docId', component: WorkSpaceComponent, canActivate: [loginGuard] },
  { path: 'document-items/:docId', component: DocumentItemsComponent, canActivate: [loginGuard] },
  { path: 'documents', component: DocumentsComponent, canActivate: [loginGuard] },
  { path: 'info', component: InfoComponent, canActivate: [loginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
