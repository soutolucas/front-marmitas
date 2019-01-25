import { Component, OnInit, OnDestroy } from '@angular/core';
import { PratoService } from 'src/app/services/prato.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Prato } from 'src/app/models/prato';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prato-list',
  templateUrl: './prato-list.component.html',
  styleUrls: ['./prato-list.component.css']
})

export class PratoListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public pratos: Prato[];

  constructor(private pratoService: PratoService, private router: Router, private loader: NgxSpinnerService) { }

  ngOnInit() {
    this.loader.show();
    this.subscription = this.pratoService.getAll().subscribe(list => {
      this.pratos = list;
      this.loader.hide();
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  create(): void {
    this.router.navigate(['/', 'admin', Prato.ROUTE, 'novo']);
  }

  detail(id: string): void {
    this.router.navigate(['/', 'admin', Prato.ROUTE, id]);
  }
}
