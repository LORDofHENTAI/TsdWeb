export class EditProductModel {
    constructor(
        public token: string,
        public storeLoc: string,
        public id: number,
        public count: number,
        public numb: number
    ) { }
}