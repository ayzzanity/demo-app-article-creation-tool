/**
 * This is a catch wrapper/guard to lessen code on wrapping try and catch block on
 * every method on a controller
 */

module.exports = (fn) => (req, res, next) => {
  const payload = req.route.path.includes(':')
    ? [req.params, req.body, [req, res, next]]
    : [req.body, [req, res, next]];

  /**
   * @IMPORTANT
   * When sending files, always send in by stream or binary via res.send!
   * res.sendFile won't catch the status of 'res.headersSent', resulting in to a double send from the res.sendFile and res.send from this wrapper.
   */

  fn(...payload)
    .then((data) => {
      // Only send if headers are not sent (Case only happens when trying to send files to the client)
      if (!res.headersSent) res.send(data);
    })
    .catch(next);
};
