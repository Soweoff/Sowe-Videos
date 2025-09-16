import Person from "./Person";

export default class Client extends Person{

    private quant_proj_comprados!: number;
    private projetos_comprados!: number;
    private cpf: number;

    constructor(cpf: number, email: string){
      super(email) 
      this.cpf = cpf;
    }

    public getCpf():number {
        return this.cpf;
    }

    public setCpf(cpf: number): void {
      this.cpf = cpf;
    }

    public getQuant_proj_comprados(): number{
        return this.quant_proj_comprados;
    }
    public setQuant_proj_comprados(quant_proj_comprados: number): void{
       this.quant_proj_comprados = quant_proj_comprados;
    }

      public getProjetos_comprados(): number{
        return this.projetos_comprados;
    }
    public setProjetos_comprados(projetos_comprados: number): void{
       this.projetos_comprados= projetos_comprados;
    }


}