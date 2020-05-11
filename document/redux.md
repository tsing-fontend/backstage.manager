## insert dependency
```bash
    yarn add redux && yarn add react-redux
```


## 创建 action-type.ts
```bash
        export const INCREMENT = 'INCREMENT';
        export const DECREMENT = 'DECREMENT';
```

## 创建 action.ts
```bash
        import { INCREMENT, DECREMENT } from '../action-type/counter';

        export function increment (number) {
            return {
                type : INCREMENT,
                number
            }
        }

        export function decrement (number) {
            return {
                type : DECREMENT,
                number
            }
        }
```

## 创建 reducers.ts
```
        import { INCREMENT, DECREMENT } from '../action-type/counter';


        const counter  = (state = 0,action) => {
            switch (action.type) {
                case INCREMENT:
                    state = state + action.number;
                    return state;
                case DECREMENT:
                    state = state - action.number;
                    return state;
                default:
                    return state;
            }
        }

        export default counter;
```

## 整合多个reducers -- index.ts
```bash
        import { combineReducers } from 'redux';
        import counter from './counter';

        const rootReducer =  combineReducers({
            counter
        });

        export default rootReducer;

```

## 在自己的组件中使用 redux
```tsx

    import React, { Component } from 'react'
    import { connect } from 'react-redux';
    import * as counterActions from '../../actions/counter';
    import { bindActionCreators } from 'redux';

    interface Props {
        counter: number,
        counterActions: any,
    }

    class Index extends React.Component<Props> {

        static async getInitialProps() {
            return { props: { name: 'dong' } }
        }

        render() {
            return (
                <div>
                    <h1>html页面渲染</h1>
                    <div>{this.props.counter} </div>
                    <button onClick={ () => this.props.counterActions.increment(10) }>增加</button>
                    <button onClick={ () => this.props.counterActions.decrement(10)}>减少</button>
                </div>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            counter: state.counter
        }
    };

    const mapDispatchToProps = (despatch) => {
            return {
                counterActions: bindActionCreators(counterActions,despatch)
            }
    };

    export default connect(mapStateToProps,mapDispatchToProps)(Index);

```


## 修改 _app.tsx
```tsx
    ① 引入相关的依赖
        import { Provider } from 'react-redux';
        import { createStore } from 'redux';
        import rootReducer from '../reducers/index';
        const store = createStore(rootReducer);
    ② 将组件包裹
        <Provider store= {store}>
                <LayoutComponent  //自定义组件
                    Component={Component}
                    pageProps={pageProps}
                    router={router}/>
        </Provider>
```



