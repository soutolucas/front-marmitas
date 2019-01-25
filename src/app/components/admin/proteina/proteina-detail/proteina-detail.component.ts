import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProteinaService } from 'src/app/services/proteina.service';
import { AlertService } from 'src/app/services/alert.service';
import { Proteina } from 'src/app/models/proteina';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-proteina-detail',
  templateUrl: './proteina-detail.component.html',
  styleUrls: ['./proteina-detail.component.css']
})

export class ProteinaDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public id: string;
  public form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private alertService: AlertService,
    private formBuilder: FormBuilder, private proteinaService: ProteinaService, private loader: NgxSpinnerService) {
    this.form = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loader.show();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.proteinaService.get(id).subscribe(item => {
        if (item) {
          this.id = item.id;
          this.form.controls.id.setValue(item.id);
          this.form.controls.name.setValue(item.name);
          this.loader.hide();
          this.subscription.unsubscribe();
        } else {
          this.goBack();
        }
      });
    } else {
      this.loader.hide();
    }
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  delete(): void {
    this.loader.show();
    this.proteinaService.delete(this.id)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  save(formValue: any): void {
    this.loader.show();
    const local = new Proteina({
      id: this.id,
      name: formValue.name,
    });
    this.proteinaService.save(local)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  goBack(): void {
    this.router.navigate(['/', 'admin', Proteina.ROUTE]);
  }

}
