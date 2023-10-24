import "reflect-metadata";
import { IBook } from '../../interfaces/Book/Book.interfaces'
import { IRepository } from '../../interfaces/Repository/Repository.interfaces'
import { inject, injectable } from "inversify";
import { Model, UpdateQuery } from "mongoose";
import { TYPES } from "../../types/types";

@injectable()
export abstract class AbstractRepository<T> implements IRepository<T> {
  private _repository: Model<T>
  constructor(
    @inject(TYPES.Repo) repository: Model<T>
  ) {
    this._repository = repository
  }

  async add(doc: T) {
    try {
        const newDoc = await this._repository.create( doc );
        return newDoc;
    } catch (e) {
        return e;
    }
  }

  async get(id: string) {
    try {
        const doc = await this._repository.findById(id).select('-__v');
        return doc;
    } catch (e) {
        return e;
    }
  }

  async getAll() {
    try {
        const docs = await this._repository.find().select('-__v');
        return docs;
    } catch (e) {
        return e;
    }
  }

  async update(id: string, doc: UpdateQuery<T> ) {
    try {
        const docFind = await this._repository.findByIdAndUpdate(id, doc)
        return docFind;
    } catch (e) {
        return e;
    }
  }

  async remove(id: string) {
    try {
        const doc =  await this._repository.deleteOne({_id: id})
        return doc;
    } catch (e) {
        return e;
    }
  }
}

@injectable()
export class BooksRepository extends AbstractRepository<IBook> { }
