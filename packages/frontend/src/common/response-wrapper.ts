export interface ResponseWrapper<T = void> {
  readonly success: boolean;
  readonly payload?: T | undefined;
  readonly message?: string;
}