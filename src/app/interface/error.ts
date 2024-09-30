export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: TErrorSources;
}
