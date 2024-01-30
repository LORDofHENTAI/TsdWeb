export class UserModel {
    constructor(
        public id: number,
        public login: string,
        public token: string
    ) { }
}