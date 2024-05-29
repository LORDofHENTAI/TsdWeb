import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from './components/menu.component/menu.component';
import { WorkSpaceComponent } from './components/work-space.component/work-space.component';
import { InfoComponent } from './components/info.component/info.component';
import { DocumentsComponent } from './components/documents.component/documents.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectModule } from '@angular/material/select';
import { CreateDocumentDialog } from './components/menu.component/menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { DocumentItemsComponent } from './components/document-items.component/document-items.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgreeDialogComponent } from './components/dialog-window/agree.dialog.component';
import { UrlImgPipe } from './pipes/url-img.pipe';
import { ExitDialog } from './components/menu.component/menu.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    WorkSpaceComponent,
    InfoComponent,
    DocumentsComponent,
    CreateDocumentDialog,
    DocumentItemsComponent,
    AgreeDialogComponent,
    UrlImgPipe,
    ExitDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
