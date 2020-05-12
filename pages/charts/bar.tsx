import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends React.Component {
    render() {
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        return (
            <div>
                 <ReactEcharts
                    option={option}
                    style={{ height: '250px', width: '100%' }}
                    className={'react_for_echarts'}
                />
            </div>
        )
    }
}
