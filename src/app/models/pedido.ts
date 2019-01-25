import { Proteina } from './proteina';
import { Refeicao } from './refeicao';

export interface IPedido {
    id: string;
    openedAt: number;
    closedAt: number;
    isActive: boolean;
    proteinas: Proteina[];
    refeicoes: Refeicao[];
}

export class Pedido implements IPedido {
    public static ROUTE = 'pedidos';

    id: string;
    openedAt: number;
    closedAt: number;
    isActive: boolean;
    proteinas: Proteina[];
    refeicoes: Refeicao[];

    constructor(obj) {
        this.id = obj.id || '';
        this.isActive = obj.isActive || false;
        this.openedAt = obj.openedAt || null;
        this.closedAt = obj.closedAt || null;
        this.proteinas = obj.proteinas || [];
        this.refeicoes = obj.refeicoes || [];
    }
}
