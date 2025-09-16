export default class Person{

    private name!: string;
    private email: string;
    private telefone!: number;


    constructor(email: string){
       this.email = email;
    }

    public getName(): string{
        return this.name;
    }
    public setName(name: string): void{
       this.name = name;
    }

    public getEmail(): string{
        return this.email;
    }
    public setEmail(email: string): void{
       this.email = email;
    }

    public getTelefone(): number{
        return this.telefone;
    }
    public setTelefone(telefone: number): void{
       this.telefone = telefone;
    }

}