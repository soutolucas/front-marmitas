import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PratoService } from 'src/app/services/prato.service';
import { Prato } from 'src/app/models/prato';

@Component({
  selector: 'app-prato-detail',
  templateUrl: './prato-detail.component.html',
  styleUrls: ['./prato-detail.component.css']
})

export class PratoDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public id: string;
  public form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private pratoService: PratoService,
    private formBuilder: FormBuilder, private alertService: AlertService, private loader: NgxSpinnerService) {
    this.form = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      price: ['', Validators.required],
      maxProtein: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loader.show();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.pratoService.get(id).subscribe(item => {
        if (item) {
          this.id = item.id;
          this.form.controls.id.setValue(item.id);
          this.form.controls.name.setValue(item.name);
          this.form.controls.price.setValue(item.price);
          this.form.controls.maxProtein.setValue(item.maxProtein);
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
    this.pratoService.delete(this.id)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  save(formValue: any): void {
    this.loader.show();
    const prato = new Prato({
      id: this.id,
      name: formValue.name,
      price: formValue.price,
      maxProtein: formValue.maxProtein
    });
    this.pratoService.save(prato)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  goBack(): void {
    this.router.navigate(['/', 'admin', Prato.ROUTE]);
  }
}
