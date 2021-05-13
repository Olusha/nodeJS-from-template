// eslint-disable-next-line max-classes-per-file
class BadRequest extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 400;
  }
}

class NotFound extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 404;

  }
}

module.exports = {BadRequest, NotFound};
