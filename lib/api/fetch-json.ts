export class ResponseError extends Error {
  response: Response;
  data?: any;

  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: any;
  }) {
    super(message);
    this.name = 'ResponseError';
    this.response = response;
    this.data = data;
  }
}

export default async function fetchJson(
  input: RequestInfo,
  init?: RequestInit | undefined,
) {
  try {
    const response = await fetch(input, init);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new ResponseError({
      message: response.statusText,
      response,
      data,
    });
    throw error;
  } catch (error: any) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
