const falCol = [{
    key: 'id',
    title: '编号',
    dataIndex: 'key',
    wkeyth: '5%',
}, {
    key: 'source_app',
    title: '来源系统',
    dataIndex: 'source_app',
    wkeyth: '10%',
}, {
    key: 'user_list',
    title: '报警人员',
    dataIndex: 'user_list',
    wkeyth: '10%',  
}, {
    title: '操作',
    dataIndex: 'operation'
}]
    
const ruleCol = [{
    key: 'id',
    title: '编号',
    dataIndex: 'key',
    wkeyth: '5%',
}, {
    key: 'name',
    title: '指标名称',
    dataIndex: 'name',
    wkeyth: '10%',
}, {
    key: 'source_app',
    title: '来源系统',
    dataIndex: 'source_app',
    wkeyth: '10%',
}, {
    key: 'stat_type',
    title: '统计类型',
    dataIndex: 'stat_type',
    wkeyth: '10%',
    key: 'acquisition_type',
    title: '数据采集方式',
    dataIndex: 'acquisition_type',
    wkeyth: '10%',
}, {
    key: 'es_ext_rule_type',
    title: '扩展计算规则',
    dataIndex: 'es_ext_rule_type',
    wkeyth: '10%',
}, {
    key: 'is_last_compare',
    title: '是否环比',
    dataIndex: 'is_last_compare',
    wkeyth: '8%',
}, {
    key: 'stat_frequency',
    title: '频率',
    dataIndex: 'stat_frequency',
    wkeyth: '5%',
}, {
    key: 'start_time',
    title: '开始时间',
    dataIndex: 'start_time',
    wkeyth: '10%',

}, {
    key: 'end_time',
    title: '结束时间',
    dataIndex: 'end_time',
    wkeyth: '10%',
},
{
    key: 'alarm_rules',
    title: '报警阈值',
    dataIndex: 'alarm_rules',
    wkeyth: '8%',
}, {
    key: 'priority',
    title: '报警级别',
    dataIndex: 'priority',
    wkeyth: '8%',
},{
    title: '操作',
    dataIndex: 'operation'
}];

module.exports = {falCol, ruleCol}