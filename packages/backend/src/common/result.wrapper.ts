export interface ResultWrapper<T> {
  readonly success: boolean;
  readonly payload?: T | undefined;
  readonly message?: string | undefined;
}
