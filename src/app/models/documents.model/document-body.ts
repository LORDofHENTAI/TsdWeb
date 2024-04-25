export class DocumentBodyModel {
    constructor(
        public id: number,
        public docId: number,
        public article: string,
        public barcode: string,
        public name: string,
        public count_e: string,
        public numb: number,
        public price?: string
    ) { }
}