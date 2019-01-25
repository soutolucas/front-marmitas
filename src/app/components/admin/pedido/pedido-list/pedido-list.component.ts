import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})

export class PedidoListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private pedidos: Pedido[];
  public pedidosOpened: Pedido[];
  public pedidosClosed: Pedido[];

  constructor(private pedidoService: PedidoService, private loader: NgxSpinnerService, private router: Router) {
    this.pedidos = [];
    this.pedidosOpened = [];
    this.pedidosClosed = [];
  }

  ngOnInit() {
    this.loader.show();
    this.subscription = this.pedidoService.getAll()
      .subscribe(pedidos => {
        this.pedidos = pedidos;
        this.pedidosOpened = pedidos.filter(pedido => pedido.isActive === true);
        this.pedidosClosed = pedidos.filter(pedido => pedido.isActive === false);
        this.loader.hide();
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  create(): void {
    this.router.navigate(['/', 'admin', Pedido.ROUTE, 'novo']);
  }

  detail(id: string): void {
    this.router.navigate(['/', 'admin', Pedido.ROUTE, id]);
  }

  formatDate(date) {
    return moment(new Date(date)).format('DD/MM/YYYY HH:mm');
  }
}
