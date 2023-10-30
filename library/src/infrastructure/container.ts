import { Container } from "inversify";
import { BooksRepository, CommentsRepository } from "../db/entities/Repository/Repository";
import { TYPES } from "../db/types/types";
import { BookModel } from "../db/entities/Book/Book.model";
import { CommentModel } from "../db/entities/Comment/Comment.model";

const container = new Container();
container.bind(TYPES.BooksRepository).to(BooksRepository).inSingletonScope();
container.bind(TYPES.CommentsRepository).to(CommentsRepository).inSingletonScope();
container.bind(TYPES.BookModel).toConstantValue(BookModel)
container.bind(TYPES.CommentModel).toConstantValue(CommentModel)

export { container };