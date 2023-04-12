export interface IProduct {
    onUpdate(data: {
        products: IProduct[];
        onUpdate: (_id: number) => void;
        id: IProduct[];
        _id: string | number;
    }): unknown;
    _id: number | string;
    name: string;
    price: number;
    image?: string;
    desc?: string;
    catrgoryId?: number | string;
}
