export default abstract class Person {
  protected name: string;
  protected email: string;
  protected telefone: number;

  constructor(name: string, email: string, telefone: number = 0) {
    this.name = name;
    this.email = email;
    this.telefone = telefone;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getTelefone(): number {
    return this.telefone;
  }

  public setTelefone(telefone: number): void {
    this.telefone = telefone;
  }

  public abstract showInfo(): void;
}
