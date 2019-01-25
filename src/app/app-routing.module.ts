import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';
import { Acompanhamento } from './models/acompanhamento';
import { AcompanhamentoListComponent } from './components/admin/acompanhamento/acompanhamento-list/acompanhamento-list.component';
import { AcompanhamentoDetailComponent } from './components/admin/acompanhamento/acompanhamento-detail/acompanhamento-detail.component';
import { Local } from './models/local';
import { LocalDetailComponent } from './components/admin/local/local-detail/local-detail.component';
import { LocalListComponent } from './components/admin/local/local-list/local-list.component';
import { Prato } from './models/prato';
import { PratoListComponent } from './components/admin/prato/prato-list/prato-list.component';
import { PratoDetailComponent } from './components/admin/prato/prato-detail/prato-detail.component';
import { Proteina } from './models/proteina';
import { ProteinaListComponent } from './components/admin/proteina/proteina-list/proteina-list.component';
import { ProteinaDetailComponent } from './components/admin/proteina/proteina-detail/proteina-detail.component';
import { Pedido } from './models/pedido';
import { PedidoListComponent } from './components/admin/pedido/pedido-list/pedido-list.component';
import { PedidoCreateComponent } from './components/admin/pedido/pedido-create/pedido-create.component';
import { PedidoDetailComponent } from './components/admin/pedido/pedido-detail/pedido-detail.component';
import { CreateRefeicaoComponent } from './components/user/refeicao/create-refeicao/create-refeicao.component';
import { RefeicaoOrderedComponent } from './components/user/refeicao/refeicao-ordered/refeicao-ordered.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CreateRefeicaoComponent },
  { path: 'success', component: RefeicaoOrderedComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', component: AdminDashboardComponent, canActivate: [AuthGuard] },
      { path: `${Acompanhamento.ROUTE}`, component: AcompanhamentoListComponent, canActivate: [AuthGuard] },
      { path: `${Acompanhamento.ROUTE}/novo`, component: AcompanhamentoDetailComponent, canActivate: [AuthGuard] },
      { path: `${Acompanhamento.ROUTE}/:id`, component: AcompanhamentoDetailComponent, canActivate: [AuthGuard] },
      { path: `${Local.ROUTE}`, component: LocalListComponent, canActivate: [AuthGuard] },
      { path: `${Local.ROUTE}/novo`, component: LocalDetailComponent, canActivate: [AuthGuard] },
      { path: `${Local.ROUTE}/:id`, component: LocalDetailComponent, canActivate: [AuthGuard] },
      { path: `${Prato.ROUTE}`, component: PratoListComponent, canActivate: [AuthGuard] },
      { path: `${Prato.ROUTE}/novo`, component: PratoDetailComponent, canActivate: [AuthGuard] },
      { path: `${Prato.ROUTE}/:id`, component: PratoDetailComponent, canActivate: [AuthGuard] },
      { path: `${Proteina.ROUTE}`, component: ProteinaListComponent, canActivate: [AuthGuard] },
      { path: `${Proteina.ROUTE}/novo`, component: ProteinaDetailComponent, canActivate: [AuthGuard] },
      { path: `${Proteina.ROUTE}/:id`, component: ProteinaDetailComponent, canActivate: [AuthGuard] },
      { path: `${Pedido.ROUTE}`, component: PedidoListComponent, canActivate: [AuthGuard] },
      { path: `${Pedido.ROUTE}/novo`, component: PedidoCreateComponent, canActivate: [AuthGuard] },
      { path: `${Pedido.ROUTE}/:id`, component: PedidoDetailComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
