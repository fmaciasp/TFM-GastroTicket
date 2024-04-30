export class UserDTO{
    id!: number;
    token: string;
    role: string;

    constructor(id: number, token: string, role: string){
        this.id = id;
        this.token = token;
        this.role = role;
    }
}