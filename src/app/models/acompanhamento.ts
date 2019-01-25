export interface IAcompanhamento {
    id: string;
    name: string;
    options: string[];
}

export class Acompanhamento implements IAcompanhamento {
    public static ROUTE = 'acompanhamentos';

    id: string;
    name: string;
    options: string[];

    constructor(obj) {
        this.id = obj.id || '';
        this.name = obj.name || '';
        this.options = obj.options || [];
    }
}
