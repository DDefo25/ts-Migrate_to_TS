const Comment = require('../model/Comment');

module.exports = (socket) => {
    const commentMessage = async (data) => {
      data.date = Date.now();
      data.bookId = socket.handshake.query.bookId;

      const comment = new Comment(data);

      try {
          await comment.save()
          socket.to(data.bookId).emit('comment message', comment);
          socket.emit('comment message', comment);
      } catch (e) {
          console.log(e)
      }
      
    }
  
    const disconnect = () => {
      console.log('user disconnected');
    }
 
    socket.on("comment message", commentMessage);
    socket.on("disconnect", disconnect);
  }