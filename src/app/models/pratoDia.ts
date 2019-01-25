import { Prato } from './prato';
import { Local } from './local';
import { Acompanhamento } from './acompanhamento';
import { Pedido } from './pedido';

export interface IPratoDia {
    pedido: Pedido[];
    local: Local[];
    pratos: Prato[];
    acompanhamentos: Acompanhamento[];
}

export class PratoDia implements IPratoDia {
    pedido: Pedido[];
    local: Local[];
    pratos: Prato[];
    acompanhamentos: Acompanhamento[];

    constructor(obj) {
        this.pedido = obj.pedido || [];
        this.local = obj.local || null;
        this.pratos = obj.prato || null;
        this.acompanhamentos = obj.acompanhamentos || [];
    }
}
