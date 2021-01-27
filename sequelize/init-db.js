const logger = require('../config/winston')
const sequelize = require('./index')

async function reset() {
    logger.warn('Reset database...');
    await sequelize.sync({ force: true });
    logger.info('...Done');
    logger.info('Populating with default value...');
    await sequelize.models.preset_cut.bulkCreate([
        {
            name: "Wood, Plywood",
            cut_speed: 500,
            feed_by_tooth_more_1: 0.025,
            feed_by_tooth_more_2: 0.03,
            feed_by_tooth_more_3: 0.035,
            feed_by_tooth_more_4: 0.06,
            feed_by_tooth_more_5: 0.07,
            feed_by_tooth_more_6: 0.09,
            feed_by_tooth_more_8: 0.1,
        },
        {
            name: "Hard Wood",
            cut_speed: 450,
            feed_by_tooth_more_1: 0.02,
            feed_by_tooth_more_2: 0.025,
            feed_by_tooth_more_3: 0.030,
            feed_by_tooth_more_4: 0.055,
            feed_by_tooth_more_5: 0.065,
            feed_by_tooth_more_6: 0.085,
            feed_by_tooth_more_8: 0.095,
        },
        {
            name: "MDF",
            cut_speed: 450,
            feed_by_tooth_more_1: 0.050,
            feed_by_tooth_more_2: 0.070,
            feed_by_tooth_more_3: 0.100,
            feed_by_tooth_more_4: 0.150,
            feed_by_tooth_more_5: 0.200,
            feed_by_tooth_more_6: 0.300,
            feed_by_tooth_more_8: 0.400,
        },
        {
            name: "Expanded PVC",
            cut_speed: 300,
            feed_by_tooth_more_1: 0.040,
            feed_by_tooth_more_2: 0.060,
            feed_by_tooth_more_3: 0.150,
            feed_by_tooth_more_4: 0.200,
            feed_by_tooth_more_5: 0.250,
            feed_by_tooth_more_6: 0.350,
            feed_by_tooth_more_8: 0.400,
        },
        {
            name: "PMMA, PC, POM, ...",
            cut_speed: 250,
            feed_by_tooth_more_1: 0.015,
            feed_by_tooth_more_2: 0.020,
            feed_by_tooth_more_3: 0.025,
            feed_by_tooth_more_4: 0.050,
            feed_by_tooth_more_5: 0.060,
            feed_by_tooth_more_6: 0.080,
            feed_by_tooth_more_8: 0.090,
        },
        {
            name: "Aluminum (2017A, 5083, ...) ",
            cut_speed: 125,
            feed_by_tooth_more_1: 0.010,
            feed_by_tooth_more_2: 0.010,
            feed_by_tooth_more_3: 0.010,
            feed_by_tooth_more_4: 0.015,
            feed_by_tooth_more_5: 0.015,
            feed_by_tooth_more_6: 0.020,
            feed_by_tooth_more_8: 0.030,
        }
    ]);
    await sequelize.models.preset_step_down_factor.bulkCreate([
        {
            name: "Soft",
            k_less_2: 0.5,
            k_more_2: 0.5,
            k_more_3: 0.8,
            k_more_4: 1,
            k_more_5: 1,
            k_more_6: 1
        },
        {
            name: "Hard (Nonferrous) ",
            k_less_2: 0.2,
            k_more_2: 0.2,
            k_more_3: 0.4,
            k_more_4: 0.5,
            k_more_5: 0.6,
            k_more_6: 1
        },
        {
            name: "Aluminium",
            k_less_2: 0.1,
            k_more_2: 0.1,
            k_more_3: 0.2,
            k_more_4: 0.25,
            k_more_5: 0.35,
            k_more_6: 0.35
        },
    ])
    await sequelize.models.need_init.create({name: 'init'})
    logger.info('...Done')
}

async function check_database() {
    await sequelize.sync();
    let val = await sequelize.models.need_init.findAll({where: {name: 'init'}});
    if(val.length === 0){
        logger.info('Need init !');
        await reset();
        logger.info('Done')
    }

}

exports.check_database = check_database;
