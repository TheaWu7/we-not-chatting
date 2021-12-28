export interface IBaseResponseModel<T> {
  code: number;
  msg?: string;
  data?: T;
}