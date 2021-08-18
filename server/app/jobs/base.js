const CronJob = require('cron').CronJob;

module.exports = class BaseJob {
  /**
   * @properties
   * Seconds: 0-59
   * Minutes: 0-59
   * Hours: 0-23
   * Day of Month: 1-31
   * Months: 0-11 (Jan-Dec)
   * Day of Week: 0-6 (Sun-Sat)
   */
  default = {
    time: {
      daily: {
        seconds: '0',
        minutes: '0',
        hours: '0',
        days: '*',
        months: '*',
        day_of_week: '*'
      },
      weekly: {
        seconds: '0',
        minutes: '0',
        hours: '0',
        days: '*',
        months: '*',
        day_of_week: '0'
      },
      monthly: {
        seconds: '0',
        minutes: '0',
        hours: '0',
        days: '1',
        months: '*',
        day_of_week: '*'
      },
      yearly: {
        seconds: '0',
        minutes: '0',
        hours: '0',
        days: '1',
        months: '0',
        day_of_week: '*'
      }
    },
    config: [null, true, 'Asia/Hong_Kong']
  };

  constructor() {}

  toTimeString(time) {
    return Object.values(time).join(' ');
  }

  custom(fn, time) {
    return new CronJob(this.toTimeString(time), fn, ...this.default.config);
  }

  daily(fn, time = this.default.time.daily) {
    return new CronJob(this.toTimeString(time), fn, ...this.default.config);
  }

  weekly(fn, time = this.default.time.weekly) {
    return new CronJob(this.toTimeString(time, fn, ...this.default.config));
  }

  monthly(fn, time = this.default.time.monthly) {
    return new CronJob(this.toTimeString(time, fn, ...this.default.config));
  }

  yearly(fn, time = this.default.time.yearly) {
    return new CronJob(this.toTimeString(time), fn, ...this.default.config);
  }
};
