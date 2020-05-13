import { get, post, put, deletes } from '../../../axios/client';
import * as config from '../../../axios/config';

export const getRoles = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const removeRole = (url: string) => deletes({ url: config.OPEN_API + `${url}` });

export const updateRole = (url: string, params: any) => put({ url: config.OPEN_API + `${url}`,data: params});

export const saveRole = (url: string, params: any) => post({ url: config.OPEN_API + `${url}`,data: params});