## 自定义app
- 主要解决页面嵌套的问题

- 在 pages 目录下创建 _app.tsx 文件, 文件内容如下:
```jsx
    import React from 'react';
    import App, {Container} from 'next/app';
    import "antd/dist/antd.css";

    export default class MyApp extends App {
        render() {
            const { Component, pageProps } = this.props;
            return  <Container>
                <Component {...pageProps} />
            </Container>
        }
    }
```