export class FindInfoReq {
    constructor(
        public article?: string,
        public barcode?: string,
        public storeID?: string
    ) { }
}