import Person from "./Person";
import IShowInfo from "../interfaces/IShowInfo";

export default class Editor extends Person implements IShowInfo {
  private expertise: string;

  constructor(name: string, email: string, expertise: string, telefone: number = 0) {
    super(name, email, telefone);
    this.expertise = expertise;
  }

  public getExpertise(): string {
    return this.expertise;
  }

  public setExpertise(expertise: string): void {
    this.expertise = expertise;
  }

  public showInfo(): void {
    console.log(`Editor: ${this.getName()}, Especialidade: ${this.expertise}, Email: ${this.getEmail()}`);
  }
}
