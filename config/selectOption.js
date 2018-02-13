const stat_type = {
    1: "实时值", 
    2: "时间段累计值"
}

const acquisition_type = {
    1: "接口采集", 
    2: "ES查询"
}

const es_ext_rule_type = {
    0: '请选择', 
    1: "求总次数", 
    2: "百分比计算", 
    3: "平均值计算"
}

const is_last_compare = {
    1: "是", 
    0: "否"
}

const alarm_rules = {
    "==": "==", 
    "!=": "!=", 
    ">": ">", 
    "<": "<", 
    ">=": ">=", 
    "<=": "<="
}

module.exports = {stat_type, acquisition_type, es_ext_rule_type, is_last_compare, alarm_rules}