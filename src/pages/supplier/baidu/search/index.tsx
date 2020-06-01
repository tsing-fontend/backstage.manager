import React from 'react';
import axios from  'axios';

export default class Index extends React.Component {

    componentDidMount() {
        this.loadImage();
    }

    private loadImage = async () => {
       const images = await axios.get('http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E9%AB%98%E6%B8%85%E5%8A%A8%E6%BC%AB&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&word=%E5%88%98%E5%BE%B7%E5%8D%8E&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&expermode=&force=&pn=60&rn=30');
       console.log(images);
    };

    render() {
        return (
            <div>
                百度检索
            </div>
        )
    }
}
