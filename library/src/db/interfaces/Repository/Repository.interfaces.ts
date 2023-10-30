export type Query<T> = {
    [P in keyof T]?: T[P] | { $regex: RegExp };
};

export interface IRepository<T> {
    add(doc: T): Promise<T>,
    get(id: string): Promise<T | null>,
    getAll(): Promise<T[]>,
    getAllByKey(key: string, value: string): Promise<T[]>, 
    update(id: string, doc: Query<T>):  Promise<T | null>,
    remove(id: string): Promise<T | null>,
}