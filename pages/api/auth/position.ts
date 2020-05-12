import { get, post, put, deletes } from '../../../axios/client';
import * as config from '../../../axios/config';

export const getPositions = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const removePosition = (url: string) => deletes({ url: config.OPEN_API + `${url}` });

export const updatePosition = (url: string, params: any) => put({ url: config.OPEN_API + `${url}`,data: params});

export const savePosition = (url: string, params: any) => post({ url: config.OPEN_API + `${url}`,data: params});