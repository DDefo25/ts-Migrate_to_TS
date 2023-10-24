import { Model, model } from "mongoose"; 
import { IBookDocument } from "../../interfaces/Book/Book.interfaces"; 
import { BookSchema } from "./Book.schema"
  
export const BookModel: Model<IBookDocument> = model<IBookDocument>("Book", BookSchema)