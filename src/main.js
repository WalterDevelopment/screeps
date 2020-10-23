module.exports.loop = function () {
  const creepSettings = require('./config/creepSettings');
  const currentCreepCounts = [];

  // 1. See how many creeps of each role exist
  creepSettings.forEach(creepSetting => {
    currentCreepCounts.push({
      role: creepSetting.role,
      count: getNumberOfCreepsWithRole(creepSetting.role),
    });
  });

  // 2. Make more creeps if needed and delete unused memory
  creepSettings.forEach(creepSetting => {
    var currentCreepCount = currentCreepCounts.find(c => c.role == creepSetting.role).count;
    if (currentCreepCount < creepSetting.count) {
      var newName = `${creepSetting.role} - ${creepSetting.generations[0].generation} - ${Game.time}`;
      console.log(`Existing: ${newName}`);
      Game.spawns['Spawn1'].spawnCreep(creepSetting.generations[0].body, newName, {
        memory: { role: creepSetting.role },
      });
    }
  });

  // 3. Run creeps behavior
  creepSettings.forEach(creepSetting => {
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      if (creep.memory.role == creepSetting.role) {
        creepSetting.job(creep, 0);
      }
    }
  });
};

/**
 * Gets the number of creeps currently alive with the indicated role.
 * @param {string} role - The role to get the count for.
 */
const getNumberOfCreepsWithRole = role => {
  return _(Game.creeps)
    .filter({ memory: { role: role } })
    .size();
};
