import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { Acompanhamento } from 'src/app/models/acompanhamento';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acompanhamento-detail',
  templateUrl: './acompanhamento-detail.component.html',
  styleUrls: ['./acompanhamento-detail.component.css']
})

export class AcompanhamentoDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public id: string;
  public form: FormGroup;
  public formArray: FormArray;

  constructor(private route: ActivatedRoute, private router: Router, private acompanhamentoService: AcompanhamentoService,
    private formBuilder: FormBuilder, private alertService: AlertService, private loader: NgxSpinnerService) {
    this.form = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      options: this.formBuilder.array([this.optionsFields()])
    });
    this.formArray = <FormArray>this.form.controls.options;
  }

  ngOnInit() {
    this.loader.show();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.acompanhamentoService.get(id).subscribe(item => {
        if (item) {
          this.id = item.id;
          this.form.controls.id.setValue(item.id);
          this.form.controls.name.setValue(item.name);
          item.options.forEach((opt, index) => {
            if (index === 0) {
              (<FormGroup>this.formArray.controls[index]).controls.name.setValue(opt);
            } else {
              this.formArray.push(this.optionsFields(opt));
            }
          });
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

  optionsFields(str: string = ''): FormGroup {
    return this.formBuilder.group({
      name: [str, Validators.required]
    });
  }

  delete(): void {
    this.loader.show();
    this.acompanhamentoService.delete(this.id)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  save(formValue: any): void {
    this.loader.show();
    const acompanhamento = new Acompanhamento({
      id: this.id,
      name: formValue.name,
      options: formValue.options.map(obj => obj.name)
    });
    this.acompanhamentoService.save(acompanhamento)
      .then(() => this.goBack())
      .catch(err => this.alertService.error(err))
      .finally(() => this.loader.hide());
  }

  goBack(): void {
    this.router.navigate(['/', 'admin', Acompanhamento.ROUTE]);
  }

  addNewOption(): void {
    this.formArray.push(this.optionsFields());
  }

  removeOption(i: number): void {
    this.formArray.removeAt(i);
  }
}
