import { AppErrorCodeEnum } from '@shared/errors/AppErrorCodeEnum';

class AppError {
  public readonly message: string;

  public readonly code: AppErrorCodeEnum;

  public readonly statusCode: number;

  constructor(
    message: string,
    statusCode = 400,
    errorCode = AppErrorCodeEnum.UNKNOWN,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = errorCode;
  }
}

export default AppError;
