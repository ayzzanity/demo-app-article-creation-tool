const path = require('path');
const exec = require('child_process').exec;
const { MKDIRNotExist, CurrentDate } = require('../../utils');
const { NODE_ENV } = require('../../config/environment');
const BaseJob = require('./base');

let config = require('../../config/database');
const backupPath = config.backupPath;
config = config[NODE_ENV];

module.exports = class DatabaseBackup extends BaseJob {
  name = 'Database Backup';
  jobs = [];

  constructor(time = { daily: true, weekly: true, monthly: true, yearly: true }) {
    super();
    this.time = Object.entries(time).reduce((a, b) => a.concat(b[1] ? b[0] : []), []);

    MKDIRNotExist(backupPath);

    console.log(`📀 Initializing ${this.name} jobs. . .`);
    // initialize job backups
    this.time.forEach((t) => {
      this.executeBackup(t);
    });
  }

  executeBackup(time) {
    const dirPath = path.join(backupPath, time);
    const filename = `db_backup-(${CurrentDate.init()}).sql`;

    MKDIRNotExist(dirPath);

    this[time](() => {
      exec(
        `mysqldump -h ${config.host} -u ${config.username} --password=${config.password} ${
          config.database
        } > ${path.join(dirPath, filename)}`
      );
    });

    console.log(`✅ (${time}) \t ${this.name}`);
  }

  start() {
    if (this.time.length) {
      console.log(`🚀 ${this.name} [Running]`);
      this.jobs.forEach((job) => job.start());

      return;
    }

    console.log('No backups to run.');
  }
};
