import TypeOfVideos from "./TypeOfVideos";

export default class Video {
  private name: string;
  private preco_base: number;
  private duracao_maxima: Date;
  private tipo: TypeOfVideos;

  constructor(name: string, preco_base: number, duracao_maxima: Date, tipo: TypeOfVideos) {
    this.name = name;
    this.preco_base = preco_base;
    this.duracao_maxima = duracao_maxima;
    this.tipo = tipo;
  }

  // Getters e Setters
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPrecoBase(): number {
    return this.preco_base;
  }

  public setPrecoBase(preco_base: number): void {
    this.preco_base = preco_base;
  }

  public getDuracaoMaxima(): Date {
    return this.duracao_maxima;
  }

  public setDuracaoMaxima(duracao_maxima: Date): void {
    this.duracao_maxima = duracao_maxima;
  }

  public getTipo(): TypeOfVideos {
    return this.tipo;
  }

  public setTipo(tipo: TypeOfVideos): void {
    this.tipo = tipo;
  }
}
