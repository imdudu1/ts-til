export class Request {
  #url;
  #method;
  #body;

  constructor() {
    return Object.seal(this);
  }

  get url() {
    return this.#url;
  }

  set url(value) {
    this.#url = value;
  }

  get method() {
    return this.#method;
  }

  set method(value) {
    this.#method = value;
  }

  get body() {
    return this.#body;
  }

  set body(value) {
    this.#body = value;
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
