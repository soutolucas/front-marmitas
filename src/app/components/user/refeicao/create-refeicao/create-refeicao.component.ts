import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Local } from 'src/app/models/local';
import { Prato } from 'src/app/models/prato';
import { Acompanhamento } from 'src/app/models/acompanhamento';
import { reject } from 'q';
import { Proteina } from 'src/app/models/proteina';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { PratoDia } from 'src/app/models/pratoDia';

@Component({
  selector: 'app-create-refeicao',
  templateUrl: './create-refeicao.component.html',
  styleUrls: ['./create-refeicao.component.css']
})

export class CreateRefeicaoComponent implements OnInit {
  public pedido: Pedido;
  public locais: Local[];
  public pratos: Prato[];
  public proteinas: Proteina[];
  public acompanhamentos: Acompanhamento[];
  public acompanhamentosList: Acompanhamento[];
  public form: FormGroup;

  constructor(private loader: NgxSpinnerService, private pedidoService: PedidoService, private formBuilder: FormBuilder,
    private alertService: AlertService, private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      local: [null, Validators.required],
      prato: [null, Validators.required],
      proteinas: []
    });
  }

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    this.loader.show();
    this.pedidoService.getPratoDia()
    .toPromise()
    .then((pratoDia: PratoDia) =>{
      if(pratoDia != null) {
          this.pedido = pratoDia.pedido[0];
          this.locais = pratoDia.local;
          this.pratos = pratoDia.pratos;
          this.proteinas = this.pedido.proteinas;
          this.acompanhamentos = pratoDia.acompanhamentos;
          this.acompanhamentosList = this.acompanhamentos.map(({ options, ...body }) => {
            return { options: [], ...body };
          });
      }
      })
      .finally(() => {
        this.loader.hide();
      });
    }

  submit(data) {
    this.loader.show();
    data.acompanhamentos = this.acompanhamentosList.filter(a => a.options.length !== 0);
    this.pedidoService.addRefeicao(this.pedido, data)
      .toPromise().then(response => {
        if (response.details) {
          this.alertService.error(response.details, true);
          this.loader.hide();
          this.router.navigate(['/', 'error']);
        } else {
          this.loader.hide();
          this.router.navigate(['/', 'success']);
        }
      })
      .finally(() => {
        this.loader.hide();
      });
  }

  acompanhamentoChange(event, index) {
    this.acompanhamentosList[index].options = event ? [event] : [];
  }

  clearProteinas() {
    this.form.controls.proteinas.reset([]);
  }
}
