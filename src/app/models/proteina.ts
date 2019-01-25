export interface IProteina {
    id: string;
    name: string;
}

export class Proteina implements IProteina {
    public static ROUTE = 'proteinas';

    id: string;
    name: string;

    constructor(obj) {
        this.id = obj.id || '';
        this.name = obj.name || '';
    }
}
