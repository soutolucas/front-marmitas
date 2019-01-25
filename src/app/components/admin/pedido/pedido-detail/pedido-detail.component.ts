import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pedido } from 'src/app/models/pedido';
import { Subscription } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';
import * as moment from 'moment';
import { Proteina } from 'src/app/models/proteina';
import { Acompanhamento } from 'src/app/models/acompanhamento';

declare var jsPDF: any; // Important

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css']
})

export class PedidoDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public pedido: Pedido;
  constructor(private route: ActivatedRoute, private router: Router, private loader: NgxSpinnerService,
    private pedidoService: PedidoService) { }

  ngOnInit() {
    this.loader.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.pedidoService.get(id).subscribe((pedido) => {
      if (pedido) {
        this.pedido = pedido;
        this.loader.hide();
      } else {
        this.goBack();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  close(pedido: Pedido): void {
    this.loader.show();
    this.pedidoService.close(pedido)
      .toPromise()
      .then();
    
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/', 'admin', Pedido.ROUTE]);
  }

  formatDate(date) {
    return moment(new Date(date)).format('DD/MM/YYYY HH:mm');
  }

  proteinasToString(arr: Array<Proteina>): string {
    return arr.length !== 0 ? arr.map(p => p.name).reduce((acc, cur) => `${acc} | ${cur}`) : '';
  }

  acompanhamentosToString(arr: Array<Acompanhamento>): string {
    return arr.length !== 0 ? arr.map(a => `${a.name}: ${a.options[0]}`).reduce((acc, cur) => `${acc} | ${cur}`) : '';
  }

  parseAll(pedidos: Pedido) {
    return pedidos.refeicoes.map(p =>
      [p.name, p.local.name, p.prato.name, this.proteinasToString(p.proteinas), this.acompanhamentosToString(p.acompanhamentos)]
    )
  }

  print() {
    var doc = new jsPDF('l', 'pt');
    doc.autoTable(['Nome', 'Local', 'Opção', 'Proteina', 'Acompanhamento'], this.parseAll(this.pedido), { showHeader: 'everyPage', styles: { valign: 'middle', overflow: 'linebreak' } });
    doc.save(`${moment().format('DD_MM_YYYY HH:mm')}.pdf`);
  }
}
