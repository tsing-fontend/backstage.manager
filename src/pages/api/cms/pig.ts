import { get, post, put, deletes } from '../../../axios/client';
import * as config from '../../../axios/config';

export const savePig = (url: string, params: any) => post({ url: config.OPEN_API + `${url}`,data: params});

export const removePig = (url: string) => deletes({ url: config.OPEN_API + `${url}` });

export const updatePig = (url: string, params: any) => put({ url: config.OPEN_API + `${url}`,data: params});

export const getPigs = (url: string) => get({ url: config.OPEN_API + `${url}` });

