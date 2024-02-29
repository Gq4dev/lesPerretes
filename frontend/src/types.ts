// types.ts
export interface Dog {
    id: string;
    name: string;
    breed: string;
    age: number;
    owner: Owner
}

export interface Owner {
    id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    dogs: Dog[];
}
