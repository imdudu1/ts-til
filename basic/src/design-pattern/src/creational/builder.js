export class Request {
  constructor(method, url, body) {
    this.method = method;
    this.url = url;
    this.body = body;
    return Object.seal(this);
  }
}

export class RequestBuilder {
  #request;

  constructor() {
    this.#request = new Request();
  }

  method(method) {
    this.#request.method = method;
    return this;
  }

  url(url) {
    this.#request.url = url;
    return this;
  }

  body(body) {
    this.#request.body = body;
    return this;
  }

  build() {
    return this.#request;
  }
}
