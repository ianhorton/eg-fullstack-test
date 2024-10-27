import { combineEpics } from 'redux-observable';

import authEpic from './auth.epic';
//import { expenseEpic } from "./expense";

const rootEpic = combineEpics(authEpic);

export { rootEpic };
