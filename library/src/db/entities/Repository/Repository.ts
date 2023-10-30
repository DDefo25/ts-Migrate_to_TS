import "reflect-metadata";
import { IBook } from '../../interfaces/Book/Book.interfaces'
import { IRepository } from '../../interfaces/Repository/Repository.interfaces'
import { inject, injectable } from "inversify";
import { Model, UpdateQuery } from "mongoose";
import { TYPES } from "../../types/types";
import { IComment } from "../../interfaces/Comment/Comment.interfaces";

@injectable()
export abstract class AbstractRepository<T> implements IRepository<T> {
  private _repository: Model<T>
  constructor(
    repository: Model<T>
  ) {
    this._repository = repository
  }

  async add(doc: T): Promise<T> {
    return await this._repository.create(doc);
  }

  async get(id: string): Promise<T | null> {
    return await this._repository.findById(id)
  }

  async getAll(): Promise<T[]> {
    return await this._repository.find()
  }

  async getAllByKey(key: string, value: string): Promise<T[]> {
    const filter: Object = {
      [key]: value
    }
    return await this._repository.find(filter)
  }

  async update(id: string, doc: UpdateQuery<T> ): Promise<T | null> {
    return await this._repository.findByIdAndUpdate(id, doc)
  }

  async remove(id: string): Promise<T | null>  {
    return await this._repository.findByIdAndDelete(id)
  }
}

@injectable()
export class BooksRepository extends AbstractRepository<IBook> { 
  constructor(
    @inject(TYPES.BookModel) repository: Model<IBook>
  ) {
    super(repository)
  }
}

@injectable()
export class CommentsRepository extends AbstractRepository<IComment> { 
  constructor(
    @inject(TYPES.CommentModel) repository: Model<IComment>
  ) {
    super(repository)
  }
 }