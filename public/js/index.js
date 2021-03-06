preset_cut = JSON.parse(preset_cut);
preset_step_down_factor = JSON.parse(preset_step_down_factor);

let preset_cut_elem = document.querySelector('#preset_cut');
let preset_step_down_factor_elem = document.querySelector('#preset_step_down_factor');
let tooth_nbr_elem = document.querySelector('#tooth_nbr');
let tool_diameter_elem = document.querySelector('#tool_diameter');
let max_rpm_elem = document.querySelector('#max_rpm')

let rpm_elem = document.querySelector('#rpm');
let feed_rate_elem = document.querySelector('#feed_rate');
let feed_rate_sec_elem = document.querySelector('#feed_rate_sec');
let step_down_elem = document.querySelector('#step_down');

let cutting_speed_elem = document.querySelector('#cutting_speed');
let feed_tooth_elem = document.querySelector('#feed_tooth');
let step_down_factor_elem = document.querySelector('#step_down_factor');

document.addEventListener("DOMContentLoaded", function (event) {
    load();
    onChange();
});


function onChange() {
    if (preset_cut_elem.value === "" || preset_step_down_factor_elem.value === "" || tool_diameter_elem.value === "0" || tooth_nbr_elem.value === "0" || max_rpm_elem.value === "0") {
        return;
    }
    save();
    let new_preset_cut = getPresetValue(preset_cut, parseInt(preset_cut_elem.value, 10));
    let new_preset_steep_down = getPresetValue(preset_step_down_factor, parseInt(preset_step_down_factor_elem.value, 10))
    let new_tool_diameter = parseFloat(tool_diameter_elem.value);
    let new_tooth_nbr = parseInt(tooth_nbr_elem.value);
    let max_rpm = parseInt(max_rpm_elem.value);

    let rpm = (1000 * new_preset_cut.cut_speed) / (3.14 * new_tool_diameter);
    if (rpm > max_rpm)
        rpm = max_rpm;
    let feed_rate = rpm * getFeedByTooth(new_tool_diameter, new_preset_cut) * new_tooth_nbr;
    let feed_rate_sec = feed_rate / 60;
    let step_down = new_tool_diameter * getStepDownFactor(new_tool_diameter, new_preset_steep_down);

    rpm = Math.round(rpm);
    feed_rate = Math.round(feed_rate);
    feed_rate_sec = feed_rate_sec.toFixed(2)
    step_down = step_down.toFixed(2);

    rpm_elem.value = rpm;
    feed_rate_elem.value = feed_rate;
    feed_rate_sec_elem.value = feed_rate_sec;
    step_down_elem.value = step_down;

    cutting_speed_elem.value = new_preset_cut.cut_speed;
    feed_tooth_elem.value = getFeedByTooth(new_tool_diameter, new_preset_cut);
    step_down_factor_elem.value = getStepDownFactor(new_tool_diameter, new_preset_steep_down);
}

function getPresetValue(list, id) {
    for (let elem of list) {
        if (elem.id === id) {
            return elem;
        }
    }
    return null
}

function getFeedByTooth(tool_diam, preset) {
    if (tool_diam >= 8)
        return preset.feed_by_tooth_more_8;
    if (tool_diam >= 6)
        return preset.feed_by_tooth_more_6;
    if (tool_diam >= 5)
        return preset.feed_by_tooth_more_5;
    if (tool_diam >= 4)
        return preset.feed_by_tooth_more_4;
    if (tool_diam >= 3)
        return preset.feed_by_tooth_more_3;
    if (tool_diam >= 2)
        return preset.feed_by_tooth_more_2;
    return preset.feed_by_tooth_more_1;
}

function getStepDownFactor(tool_diam, preset) {
    if (tool_diam >= 6)
        return preset.k_more_6;
    if (tool_diam >= 5)
        return preset.k_more_5;
    if (tool_diam >= 4)
        return preset.k_more_4;
    if (tool_diam >= 3)
        return preset.k_more_3;
    if (tool_diam >= 2)
        return preset.k_more_2;
    return preset.k_less_2;
}

function save(){
    let values = {
        preset_cut: preset_cut_elem.value,
        preset_step_down_factor: preset_step_down_factor_elem.value,
        tool_diameter: tool_diameter_elem.value,
        tooth_nbr: tooth_nbr_elem.value,
        max_rpm: max_rpm_elem.value
    }
    localStorage.setItem('previous_data', JSON.stringify(values));
}

function load(){
    let previous_data = localStorage.getItem('previous_data')
    if(previous_data === null)
        return;
    previous_data = JSON.parse(previous_data);
    preset_cut_elem.value = previous_data.preset_cut;
    preset_step_down_factor_elem.value = previous_data.preset_step_down_factor;
    tool_diameter_elem.value = previous_data.tool_diameter;
    tooth_nbr_elem.value = previous_data.tooth_nbr;
    max_rpm_elem.value = previous_data.max_rpm;
}
