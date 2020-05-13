import { get, post, put, deletes } from '../../../axios/client';
import * as config from '../../../axios/config';

export const getMenuTree = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const getMenu = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const removeMenu = (url: string) => deletes({ url: config.OPEN_API + `${url}` });

export const updateMenu = (url: string, params: any) => put({ url: config.OPEN_API + `${url}`,data: params});

export const saveMenu = (url: string, params: any) => post({ url: config.OPEN_API + `${url}`,data: params});