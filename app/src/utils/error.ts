export interface IBackendError {
  message: string;
  status?: number;
}

export class BackendError extends Error {
  status?: number;
  constructor({
    message,
    status = undefined,
  }: IBackendError) {
    super(message);
    this.status = status;
  }
}

export const NOT_FOUND: IBackendError = { status: 404, message: 'Not found.' }
export const COMPANY_NOT_FOUND: IBackendError = { status: 404, message: 'Company not found.' }

