export default class Breadcrumbmenu {
    
    static getBreadcrumbmenu(location: string): string {
        let map = new Map<string, string>();
        map.set('/','/控制面板');
        map.set('/about','/关于我');
        map.set('/auth/user/list','权限管理/用户列表');
        map.set('/auth/position/positions', '权限管理/职位列表');
        map.set('/auth/department/list', '权限管理/部门列表');
        map.set('/auth/menu/list', '权限管理/菜单管理');
        map.set('/auth/menu/role', '权限管理/角色管理');
        if(map.get(location)){
            return map.get(location);
        }
        return '默认模版'
    }

}