export interface RouterInterface {
  use(path: string, controller: Controller): void;
  get(path: string, handler: RequestHandler): void;
  post(path: string, handler: RequestHandler): void;
  put(path: string, handler: RequestHandler): void;
  delete(path: string, handler: RequestHandler): void;
}