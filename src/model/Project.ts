// src/model/Project.ts
import Client from "./Client";
import Editor from "./Editor";
import TypeOfVideos from "./TypeOfVideos";

export default class Projeto {
  private id: number;
  private name: string;
  private tipo_video: TypeOfVideos | null = null;
  private data_inicial: Date | null = null;
  private data_final: Date | null = null;
  private status: boolean = false;
  private brinde_recebido: boolean = false;
  private client: Client;
  private editor: Editor | null;
  private preco: number = 0;
  private ehRecompensa: boolean = false;

  constructor(id: number, name: string, client: Client, editor: Editor | null, preco: number = 0) {
    this.id = id;
    this.name = name;
    this.client = client;
    this.editor = editor;
    this.preco = preco;
  }

  // Getters e Setters
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getTipo_video(): TypeOfVideos | null {
    return this.tipo_video;
  }

  public setTipo_video(tipo_video: TypeOfVideos): void {
    this.tipo_video = tipo_video;
  }

  // Sobrecarga: aceitar (dataInicial) ou (dataInicial, dataFinal)
  public setDatas(dataInicial: Date): void;
  public setDatas(dataInicial: Date, dataFinal: Date): void;
  public setDatas(a: Date, b?: Date): void {
    if (b) {
      this.data_inicial = a;
      this.data_final = b;
    } else {
      this.data_inicial = a;
    }
  }

  public getData_inicial(): Date | null {
    return this.data_inicial;
  }

  public setData_inicial(data_inicial: Date): void {
    this.data_inicial = data_inicial;
  }

  public getData_final(): Date | null {
    return this.data_final;
  }

  public setData_final(data_final: Date): void {
    this.data_final = data_final;
  }

  public getStatus(): boolean {
    return this.status;
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }

  public getBrinde_recebido(): boolean {
    return this.brinde_recebido;
  }

  public setBrinde_recebido(brinde_recebido: boolean): void {
    this.brinde_recebido = brinde_recebido;
  }

  public getClient(): Client {
    return this.client;
  }

  public getEditor(): Editor | null {
    return this.editor;
  }

  public getPreco(): number {
    return this.preco;
  }

  public setPreco(preco: number): void {
    this.preco = preco;
  }

  public getEhRecompensa(): boolean {
    return this.ehRecompensa;
  }

  public setEhRecompensa(ehRecompensa: boolean): void {
    this.ehRecompensa = ehRecompensa;
  }
}
