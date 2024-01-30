export class DeleteDocumentModel {
    constructor(
        public token: string,
        public storeloc: string,
        public id: number
    ) { }
}