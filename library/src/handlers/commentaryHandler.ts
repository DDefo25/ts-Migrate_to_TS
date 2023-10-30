import { container } from '../infrastructure/container';
import { TYPES } from '../db/types/types';
import { IRepository } from '../db/interfaces/Repository/Repository.interfaces';
import { IComment } from '../db/interfaces/Comment/Comment.interfaces';
import { errorHandler } from './errorHandler';
import { Socket } from 'socket.io';

const commentsRepository = container.get<IRepository<IComment>>(TYPES.CommentsRepository)

export default function (socket: Socket) {
    const commentMessage = async (data: IComment) => {
      const { bookId } = socket.handshake.query
      data.bookId =  typeof bookId === 'string' ? bookId : ''
      data.date = Date.now();

      const comment = await commentsRepository.add(data).catch(errorHandler);
      socket.to(data.bookId).emit('comment message', comment);
      socket.emit('comment message', comment);
    }
  
    const disconnect = () => {
      console.log('user disconnected ' + socket.id);
    }
 
    socket.on("comment message", commentMessage);
    socket.on("disconnect", disconnect);
  }