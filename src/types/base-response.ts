export interface BaseResponse<T> {
  code: string;
  message?: string; // api 호출 실패시에만 존재함
  result: T;
}
