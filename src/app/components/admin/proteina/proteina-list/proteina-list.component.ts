import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proteina } from 'src/app/models/proteina';
import { ProteinaService } from 'src/app/services/proteina.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-proteina-list',
  templateUrl: './proteina-list.component.html',
  styleUrls: ['./proteina-list.component.css']
})

export class ProteinaListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public proteinas: Proteina[];

  constructor(private proteinaService: ProteinaService, private router: Router, private loader: NgxSpinnerService) { }

  ngOnInit() {
    this.loader.show();
    this.subscription = this.proteinaService.getAll().subscribe(list => {
      this.proteinas = list;
      this.loader.hide();
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  create(): void {
    this.router.navigate(['/', 'admin', Proteina.ROUTE, 'novo']);
  }

  detail(id: string): void {
    this.router.navigate(['/', 'admin', Proteina.ROUTE, id]);
  }
}
