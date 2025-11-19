export default interface IRepository<T, K = number> {
  insert(item: T): void;
  update(id: K, partial: Partial<T>): void;
  findById(id: K): T | undefined;
  getAll(): T[];
}
