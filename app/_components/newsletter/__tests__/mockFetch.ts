/**
 * Gets a baseline fake Reponse object, representing a 200 response.
 */
export function mockSuccessResponse(): Response {
  return {
    headers: new Headers(),
    ok: true,
    status: 200,
    statusText: 'OK',
    type: 'cors',
    url: '',
    redirected: false,
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    json: () => Promise.resolve([]),
    text: () => Promise.resolve(''),
    clone: () => mockSuccessResponse(),
  };
}

/**
 * Gets a baseline fake Reponse object, representing a 404 response.
 */
export function mock404Response(): Response {
  return {
    headers: new Headers(),
    ok: false,
    status: 404,
    statusText: 'Not Found',
    type: 'cors',
    url: '',
    redirected: false,
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    json: () => Promise.resolve([]),
    text: () => Promise.resolve(''),
    clone: () => mock404Response(),
  };
}
