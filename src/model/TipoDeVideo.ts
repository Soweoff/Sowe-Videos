
export default class Projeto {

    private name!: string;
    private preco_base!: number;
    private duracao_maxima!: Date;
 
    public setName(name: string): void {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }

     public setPreco_base(preco_base: number): void {
        this.preco_base = preco_base;
    }
    public getPreco_base(): number {
        return this.preco_base;
    }

     public setDuracao_maxima(duracao_maxima: Date): void {
        this.duracao_maxima = duracao_maxima;
    }
    public getDuracao_maxima(): Date {
        return this.duracao_maxima;
    }


}