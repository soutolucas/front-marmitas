import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Acompanhamento } from 'src/app/models/acompanhamento';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-acompanhamento-list',
  templateUrl: './acompanhamento-list.component.html',
  styleUrls: ['./acompanhamento-list.component.css']
})

export class AcompanhamentoListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public acompanhamentos: Acompanhamento[];

  constructor(private acompanhamentoService: AcompanhamentoService, private router: Router, private loader: NgxSpinnerService) { }

  ngOnInit() {
    this.loader.show();
    this.subscription = this.acompanhamentoService.getAll()
      .subscribe(list => {
        this.acompanhamentos = list;
        this.loader.hide();
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  create(): void {
    this.router.navigate(['/', 'admin', Acompanhamento.ROUTE, 'novo']);
  }

  detail(id: string): void {
    this.router.navigate(['/', 'admin', Acompanhamento.ROUTE, id]);
  }

  arrayToString(arr: Array<string>): string {
    return arr.reduce((acc, cur) => `${acc} | ${cur}`);
  }
}
