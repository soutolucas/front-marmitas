import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Acompanhamento } from 'src/app/models/acompanhamento';
import { Local } from 'src/app/models/local';
import { Prato } from 'src/app/models/prato';
import { Proteina } from 'src/app/models/proteina';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  public pedido: string;
  public local: string;
  public prato: string;
  public proteina: string;
  public acompanhamento: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.local = Local.ROUTE;
    this.acompanhamento = Acompanhamento.ROUTE;
    this.prato = Prato.ROUTE;
    this.proteina = Proteina.ROUTE;
    this.pedido = Pedido.ROUTE;
  }

  logout(): void {
    this.authService.logout();
  }
}
