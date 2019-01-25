import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ProteinaService } from 'src/app/services/proteina.service';
import { Proteina } from 'src/app/models/proteina';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styleUrls: ['./pedido-create.component.css']
})

export class PedidoCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public proteinasForm: FormArray;
  public proteinas: Proteina[];
  public formatedList = {};
  private subscription: Subscription;

  constructor(private pedidoService: PedidoService, private proteinaService: ProteinaService, private router: Router,
    private formBuilder: FormBuilder, private loader: NgxSpinnerService, private alertService: AlertService) {
    this.form = this.formBuilder.group({
      proteinas: this.formBuilder.array([], minSelectedCheckboxes(1))
    });
    this.proteinasForm = <FormArray>this.form.controls.proteinas;
  }

  ngOnInit() {
    this.loader.show();
    this.pedidoService.getOpened()
      .toPromise()
      .then(openedPedidos => {
        if (openedPedidos.length === 0) {
          this.subscription = this.proteinaService.getAll()
            .subscribe(proteinas => {
              this.proteinas = proteinas;
              proteinas.forEach(() => {
                this.proteinasForm.push(new FormControl(false));
              });
              this.loader.hide();
            });
        } else {
          this.alertService.error('Já existe um pedido aberto', true);
          this.loader.hide();
          this.goBack();
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  submit(data): void {
    this.loader.show();
    const proteinas = [];

    data.proteinas.forEach((v, i) => {
      if (v) { proteinas.push(this.proteinas[i]); }
    });

    this.pedidoService.open(new Pedido({ proteinas }))
      .toPromise()
      .then(result => {
        if (result.code) {
          this.alertService.error(result.details, true);
        }
        this.loader.hide();
        this.goBack();
      });
  }

  goBack(): void {
    this.router.navigate(['/', 'admin', Pedido.ROUTE]);
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);
    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
