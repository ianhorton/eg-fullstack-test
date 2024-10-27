import { SignInModel } from './sign-in.model';

export interface SignUpModel extends SignInModel {
  readonly name: string;
}
