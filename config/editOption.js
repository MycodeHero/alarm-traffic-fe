const ruleOption = {
    "name": "指标名称",
    "source_app": "来源系统",
    "stat_type": "统计类型",
    "acquisition_type": "数据采集方式",
    "es_ext_rule_type": "扩展计算规则",
    "is_last_compare": "是否环比",
    "stat_frequency": "频率(分钟)",
    "start_time": "开始时间",
    "end_time": "结束时间",
    "alarm_rules": "报警阈值",
    "priority": "报警级别"
}

const falOption = {
    "source_app": "来源系统",
    "user_list": "警报人员"
}

module.exports ={falOption, ruleOption}