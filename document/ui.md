## install antd

```bash
    # 安装依赖
    yarn add @zeit/next-css  antd  babel-plugin-import

    # 在根目录下创建 next.config.ts 内容如下 - touch next.config.ts
   const withCss = require("@zeit/next-css");
    if (typeof require !== "undefined") {
        require.extensions[".css"] = file => {};
    }
    module.exports=withCss({})

    # 在根目录下创建 .babelrc 文件, 内容如下 - touch .babelrc
    {
    "presets": [
        "next/babel"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd"
            }
        ]
    ]
    }

    # 在 _app.ts 中引入 css , 添加一个按钮,测试是否成功引入
    import "antd/dist/antd.css";
    import {Button} from 'antd';

    # 这个放在函数的内部,或者放在 class 内部
    <Button>1</Button>
```