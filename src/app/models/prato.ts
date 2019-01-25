export interface IPrato {
    id: string;
    name: string;
    maxProtein: number;
    price: number;
}

export class Prato implements IPrato {
    public static ROUTE = 'pratos';

    id: string;
    name: string;
    price: number;
    maxProtein: number;

    constructor(obj) {
        this.id = obj.id || '';
        this.name = obj.name || '';
        this.price = obj.price || 0;
        this.maxProtein = obj.maxProtein || 0;
    }
}
