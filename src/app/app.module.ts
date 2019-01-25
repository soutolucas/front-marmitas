// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// Loader
import { NgxSpinnerModule } from 'ngx-spinner';
// Environment
import { environment } from '../environments/environment';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';
// Guard
import { AuthGuard } from './guards/auth.guard';
// Service
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { LocalService } from './services/local.service';
import { PratoService } from './services/prato.service';
import { ProteinaService } from './services/proteina.service';
import { AcompanhamentoService } from './services/acompanhamento.service';
import { PedidoService } from './services/pedido.service';
// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';
import { LocalListComponent } from './components/admin/local/local-list/local-list.component';
import { LocalDetailComponent } from './components/admin/local/local-detail/local-detail.component';
import { PratoDetailComponent } from './components/admin/prato/prato-detail/prato-detail.component';
import { PratoListComponent } from './components/admin/prato/prato-list/prato-list.component';
import { ProteinaListComponent } from './components/admin/proteina/proteina-list/proteina-list.component';
import { ProteinaDetailComponent } from './components/admin/proteina/proteina-detail/proteina-detail.component';
import { AcompanhamentoListComponent } from './components/admin/acompanhamento/acompanhamento-list/acompanhamento-list.component';
import { AcompanhamentoDetailComponent } from './components/admin/acompanhamento/acompanhamento-detail/acompanhamento-detail.component';
import { PedidoCreateComponent } from './components/admin/pedido/pedido-create/pedido-create.component';
import { PedidoListComponent } from './components/admin/pedido/pedido-list/pedido-list.component';
import { PedidoDetailComponent } from './components/admin/pedido/pedido-detail/pedido-detail.component';
import { CreateRefeicaoComponent } from './components/user/refeicao/create-refeicao/create-refeicao.component';
import { RefeicaoOrderedComponent } from './components/user/refeicao/refeicao-ordered/refeicao-ordered.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AlertComponent,
    MenuComponent,
    AdminDashboardComponent,
    AcompanhamentoListComponent,
    AcompanhamentoDetailComponent,
    LocalListComponent,
    LocalDetailComponent,
    PratoDetailComponent,
    PratoListComponent,
    ProteinaListComponent,
    ProteinaDetailComponent,
    PedidoCreateComponent,
    PedidoListComponent,
    PedidoDetailComponent,
    CreateRefeicaoComponent,
    RefeicaoOrderedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule
  ],
  providers: [
    AuthService, AlertService, LocalService, PratoService, ProteinaService, AcompanhamentoService, AuthGuard,
    PedidoService,
    { provide: FunctionsRegionToken, useValue: 'us-central1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
