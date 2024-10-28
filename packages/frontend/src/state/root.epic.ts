import { combineEpics } from 'redux-observable';

import authEpic from './auth.epic';
import homeEpic from './home.epic';

const rootEpic = combineEpics(authEpic, homeEpic);

export { rootEpic };
