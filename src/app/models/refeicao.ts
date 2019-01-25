import { Prato } from './prato';
import { Local } from './local';
import { Proteina } from './proteina';
import { Acompanhamento } from './acompanhamento';

export interface IRefeicao {
    id: string;
    name: string;
    local: Local;
    prato: Prato;
    proteinas: Proteina[];
    acompanhamentos: Acompanhamento[];
    orderedAt: number;
}

export class Refeicao implements IRefeicao {
    public static ROUTE = 'refeicoes';

    id: string;
    name: string;
    local: Local;
    prato: Prato;
    proteinas: Proteina[];
    acompanhamentos: Acompanhamento[];
    orderedAt: number;

    constructor(obj) {
        this.id = obj.id || '';
        this.name = obj.name || '';
        this.local = obj.local || null;
        this.prato = obj.prato || null;
        this.proteinas = obj.proteinas || [];
        this.acompanhamentos = obj.acompanhamentos || [];
        this.orderedAt = obj.orderedAt || null;
    }
}
