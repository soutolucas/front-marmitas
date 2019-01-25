export interface ILocal {
    id: string;
    name: string;
}

export class Local implements ILocal {
    public static ROUTE = 'locais';

    id: string;
    name: string;

    constructor(obj) {
        this.id = obj.id || '';
        this.name = obj.name || '';
    }
}
