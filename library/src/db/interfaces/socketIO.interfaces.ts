import { IComment } from "./Comment/Comment.interfaces";

export interface ServerToClientEvents  {
    'comment message': (message: IComment) => void;
}
  
export interface ClientToServerEvents {
    'comment message': (message: IComment) => void;
}
  
export interface InterServerEvents { }
  
export interface SocketData { }
