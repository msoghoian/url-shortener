export interface Response<T> {
  /** The HTTP response status code */
  statusCode: number;
  headers?: {
    [key: string]: string;
  };
  /** The requested entity */
  body?: T;
}

export interface Shortlink {
  originalUrl: string;
  baseUrl: string;
  code: string;
  shortlink: string;
}

export interface CreateShortlinkRequest {
  url: string;
}
