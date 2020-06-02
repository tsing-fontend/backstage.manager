export default class Breadcrumbmenu {
    
    static getBreadcrumbmenu(location: string): string {
        let map = new Map<string, string>();
        map.set('/','/控制面板');
        map.set('/cms/pigs','/产品维护/技术猪');
        if(map.get(location)){
            return map.get(location);
        }
        return '默认模版'
    }

}