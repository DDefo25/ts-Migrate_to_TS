import { Container } from "inversify";
import { BooksRepository } from "./entities/BookRepository/BooksRepository";
import { TYPES } from "./types/types";
import { BookModel } from "./entities/Book/Book.model";

const container = new Container();
container.bind(TYPES.BooksRepository).to(BooksRepository);
container.bind(TYPES.Repo).toConstantValue(BookModel)

export { container };