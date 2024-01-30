export class TokenRequest {
    constructor(
        public token: string,
        public storeloc?: string,
        public id?: number
    ) { }
}