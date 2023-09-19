const error404Custom = (err, req, res) => {
  res.status(404).render('../views/errors/404', {
    title: err.message,
  });
};

module.exports = error404Custom;
