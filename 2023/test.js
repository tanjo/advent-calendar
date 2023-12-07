const open = require('open');
const CronJob = require('cron').CronJob;

let date = new Date();
date.setSeconds(date.getSeconds() + 10);
new CronJob(date, async () => {
    // await open("https://qiita.com/");
    await open("/Applications/Slack.app");
}, null, true, 'Asia/Tokyo');