import { Document, Model } from "mongoose"; 
  
export interface IComment {
    bookId: string,
    name: string,
    text: string,
    date: number,
}

export interface ICommentDocument extends IComment, Document { } 
export interface ICommentModel extends Model<ICommentDocument> { }