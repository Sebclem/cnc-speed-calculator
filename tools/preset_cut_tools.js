const sequelize = require('../sequelize');

let edit = function (id, form_data){
    return new Promise(((resolve, reject) => {
        // TODO Add debug logs
        sequelize.models.preset_cut.findOne({ where: { id: id } }).then((preset) => {
            if (preset == null) {
                reject('NOT_FOUND');
            } else {
                preset.name = form_data.name;
                preset.cut_speed = form_data.cutting_speed;
                preset.feed_by_tooth_more_1 = form_data.feed_by_tooth_more_1;
                preset.feed_by_tooth_more_2 = form_data.feed_by_tooth_more_2;
                preset.feed_by_tooth_more_3 = form_data.feed_by_tooth_more_3;
                preset.feed_by_tooth_more_4 = form_data.feed_by_tooth_more_4;
                preset.feed_by_tooth_more_5 = form_data.feed_by_tooth_more_5;
                preset.feed_by_tooth_more_6 = form_data.feed_by_tooth_more_6;
                preset.feed_by_tooth_more_8 = form_data.feed_by_tooth_more_8;
                preset.save().then(() => {
                    resolve();
                }).catch((err) => {
                    reject('SAVE_FAIL')
                });
            }
        }).catch((err) => {
            reject('DB_ERROR');
        });
    }))
}

exports.edit = edit;