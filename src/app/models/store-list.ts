export class StoreListModel {
    constructor(
        public id: number,
        public storeloc: string,
        public name: string,
        public price_type: string,
        public dat_path: string,
        public excel_path: string,
        public txt_path: string,
        public db_name: string
    ) { }
}