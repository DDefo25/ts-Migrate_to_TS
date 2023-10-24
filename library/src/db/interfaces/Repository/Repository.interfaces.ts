export type Query<T> = {
    [P in keyof T]?: T[P] | { $regex: RegExp };
};

export interface IRepository<T> {
    add(doc: T): Awaited< Promise<T>> | unknown,
    get(id: string): Awaited< Promise<T>> | unknown,
    getAll(): Awaited< Promise< Array<T>>> | unknown, 
    update(id: string, doc: Query<T>):  Awaited< Promise< Array<T>>> | unknown,
    remove(id: string): Awaited< Promise< T>> | unknown,
}