export type Error = {
  [string]: [{
    predicate: string,
    variables: {}
  }]
};

export type ResponseType = {
  data: any
};

export interface IHttpService {
  get(url: string, filter?: any): Promise<ResponseType | Error>,
  post(url: string, data?: any): Promise<ResponseType | Error>,
  postForm(url: string, data?: any): Promise<ResponseType | Error>,
  put(url: string, data: {}): Promise<ResponseType | Error>,
  delete(url: string): Promise<ResponseType | Error>,
  dataHandler(response: any): any
}
