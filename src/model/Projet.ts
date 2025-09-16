import Client from "./Client";
import Editor from "./Editor";
import TypeOfVideos from "./TypeOfVideos";

export default class Projeto {

    private name!: string;
    private tipo_video!: TypeOfVideos;
    private data_inicial!: Date;
    private data_final!: Date;
    private status!: boolean;
    private brinde_recebido!: boolean;
    private client: Client;
    private editor: Editor;

    constructor (client:Client, editor: Editor) {
      this.client = client;
      this.editor = editor;
    }

    public setName(name: string): void {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }

     public setTipo_video(tipo_video: TypeOfVideos): void {
        this.tipo_video = tipo_video;
    }
    public getTipo_video(): TypeOfVideos {
        return this.tipo_video;
    }
    
     public setData_inicial(data_inicial: Date): void {
        this.data_inicial = data_inicial;
    }
    public getData_inicial(): Date {
        return this.data_inicial;
    }

     public setData_final(data_final: Date): void {
        this.data_final = data_final;
    }
    public getData_final(): Date {
        return this.data_final;
    }

     public setStatus(status: boolean): void {
        this.status = status;
    }
    public getStatus(): boolean {
        return this.status;
    }


     public setBrinde_recebido(brinde_recebido: boolean): void {
        this.brinde_recebido = brinde_recebido;
    }
    public getBrinde_recebido(): boolean {
        return this.brinde_recebido;
    }

}

