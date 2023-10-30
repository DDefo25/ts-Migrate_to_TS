import { Model, model } from "mongoose"; 
import { ICommentDocument } from "../../interfaces/Comment/Comment.interfaces"; 
import { CommentSchema } from "./Comment.schema";
  
export const CommentModel: Model<ICommentDocument> = model<ICommentDocument>("Comment", CommentSchema)