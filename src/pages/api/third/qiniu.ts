import { get } from '../../../axios/client';
import * as config from '../../../axios/config';

export const qinNiuToken = (url: string) => get({ url: config.OPEN_API + `${url}` });
