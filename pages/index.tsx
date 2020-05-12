import React from 'react';
import { Row, Col, Card } from 'antd';
// 自定义组件
import Bar from './charts/bar';
import Pie from './charts/pie';

export default class Index extends React.Component {
    render() {
        return (
            <div className="gutter-example">
                <Row gutter={[16, 16]}>
                    <Col className="gutter-row" md={10}>
                        <div className="gutter-box">
                            <Card 
                                hoverable={true}>
                                <Card.Grid
                                    hoverable= {true}
                                    style={{
                                        width: '100%',
                                        textAlign: 'center'
                                      }}> 
                                    <Bar/>
                                </Card.Grid>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={14}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Card.Grid
                                    hoverable= {true}
                                    style={{
                                        width: '100%',
                                        textAlign: 'center'
                                      }}> 
                                    <Pie/>
                                </Card.Grid>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
