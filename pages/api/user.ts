import { get, post, put } from '../../axios/client';
import * as config from '../../axios/config';

export const getUserDeptTree = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const findUser = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const getUsers = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const removeUser = (url: string) => get({ url: config.OPEN_API + `${url}` });

export const updateUser = (url: string, params: any) => put({ url: config.OPEN_API + `${url}`,data: params});

export const saveUser = (url: string, params: any) => post({ url: config.OPEN_API + `${url}`,data: params});

export const loginUser = (url: string, params: any) => post({ url: config.OPEN_API + `${url}`,data: params});

export const userRoleMenus = (url: string) => get({ url: config.OPEN_API + `${url}` });