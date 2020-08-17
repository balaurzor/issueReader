export interface IUser {
    login: string;
}

export class User {
    username: string;

    constructor(user?: IUser) {
        if (user) {
            this.username = user.login;
        }
    }
}
