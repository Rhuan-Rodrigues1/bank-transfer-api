class RequestError extends Error {
  constructor(message, code, error) {
    this.error = error;
    this.code = code;

    super(message);
    this.name = this.contructor.name;
    Error.captureStackTrace(this, this.contructor);
  }
}

module.exports = RequestError;
