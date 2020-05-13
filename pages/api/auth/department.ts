import { get, post, put, deletes } from '../../../axios/client';
import * as config from '../../../axios/config';

export const getDeptTree = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const getDept = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const getDepts = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const removeDept = (url: string) => deletes({ url: config.OPEN_API + `${url}` });

export const updateDept = (url: string, params: any) => put({ url: config.OPEN_API + `${url}`,data: params});

export const saveDept = (url: string, params: any) => post({ url: config.OPEN_API + `${url}`,data: params});