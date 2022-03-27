export interface ErrorResponseType extends Error {
  statusCode: number;
}
class ErrorResponse extends Error implements ErrorResponseType {
  constructor(message: string, statusCode: number, value?: string | number) {
    super(message);
    this.statusCode = statusCode;
    this.value = value;
  }
  statusCode;
  value;
}

export default ErrorResponse;
