import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { Local } from 'src/app/models/local';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-local-detail',
  templateUrl: './local-detail.component.html',
  styleUrls: ['./local-detail.component.css']
})

export class LocalDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public id: string;
  public form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private localService: LocalService,
    private formBuilder: FormBuilder, private alertService: AlertService, private loader: NgxSpinnerService) {
    this.form = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loader.show();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.localService.get(id).subscribe(item => {
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
    this.localService.delete(this.id)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  save(formValue: any): void {
    this.loader.show();
    const local = new Local({
      id: this.id,
      name: formValue.name,
    });
    this.localService.save(local)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  goBack(): void {
    this.router.navigate(['/', 'admin', Local.ROUTE]);
  }
}
