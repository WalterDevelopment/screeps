const roleBuilder = require('roles_builder');
const roleHarvester = require('roles_harvester');
const roleUpgrader = require('roles_upgrader');

module.exports = [
    {
        count: 2,
        job: roleBuilder.run,
        role: 'builder',
        generations: [
            {
                generation: 1,
                body: [WORK, CARRY, MOVE]
            }
        ]
    },
    {
        count: 2,
        job: roleHarvester.run,
        role: 'gatherer',
        generations: [
            {
                generation: 1,
                body: [WORK, CARRY, MOVE]
            }
        ]
    },
    {
        count: 1,
        job: roleUpgrader.run,
        role: 'upgrader',
        generations: [
            {
                generation: 1,
                body: [WORK, CARRY, MOVE]
            }
        ]
    }
];
