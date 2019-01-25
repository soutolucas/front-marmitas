import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Local } from 'src/app/models/local';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})

export class LocalListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public locais: Local[];

  constructor(private localService: LocalService, private router: Router, private loader: NgxSpinnerService) { }

  ngOnInit() {
    this.loader.show();
    this.subscription = this.localService.getAll().subscribe(list => {
      this.locais = list;
      this.loader.hide();
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  create(): void {
    this.router.navigate(['/', 'admin', Local.ROUTE, 'novo']);
  }

  detail(id: string): void {
    this.router.navigate(['/', 'admin', Local.ROUTE, id]);
  }
}
