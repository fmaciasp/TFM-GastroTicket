export interface Registro{
    token: string;
    role: Role;
    id: number;
    mensaje: string;
}

export enum Role {
    EMPRESA = 'EMPRESA',
    RESTAURANTE = 'RESTAURANTE'
}