import Person from "./Person";

export default class Editor extends Person{

     private expertise : string;

    constructor(expertise: string,email: string){
      super(email) 
      this.expertise = expertise;

    }

    public getExpertise(): string {
      return this.expertise;
    }

    public setExpertie(expertise:string): void {
      this.expertise = expertise;
    }

}