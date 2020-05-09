## router
- 路由是目录路由,根据 pages 下的文件生成的路由.
    - pages 相当于 /
    - pages/index.tsx 是和上面的相等
    - pages/demo/index.tsx 相当于 /demo
- 如果想要从列表跳转到详情页面这种逻辑跳转的话就是,创建文件名称是 [id].txs 文件,路由拼上id即可. 示例: /demo/1 . 获取 id 是从 props 中获取