const ruleConfig = {
    "id": "",
    "name": "",
    "metric": "",
    "url": "",
    "es_index": "",
    "source_app": "", 
    "stat_type": "1", 
    "acquisition_type": "1",
    "es_ext_rule_type": "0",
    "es_ext_rule": {
    }, 
    "is_last_compare": "0",
    "stat_frequency": "", 
    "start_time": "00:00:00",
    "end_time": "24:00:00",
    "alarm_rules": {
        "op": "==",
        "right_value": ""
    },
    "priority": "",
};

const falConfig = {
    "id": "",
    "source_app": "",
    "user_list": ""
};

module.exports = {ruleConfig, falConfig}