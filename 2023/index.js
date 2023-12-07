const { App } = require('@slack/bolt');
const open = require('open');
const CronJob = require('cron').CronJob;

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000
});

// 疎通確認
app.message(/ping/i, async ({ message, say }) => {
    await say('pong');
});

// オウム返し
app.event('app_mention', async ({ event, say }) => {
    let matches = event.text.match(/echo (.*)/i);
    let matches2 = event.text.match(/open <(https?:\/\/.*)>/i);
    if (matches) {
        await say(`<@${event.user}> ${matches[1]}`);
        return;
    } else if (matches2) {
        await open(matches2[1]);
        return;
    } else {
        await say(`<@${event.user}> そういうのはやってないです`);
    }
});

new CronJob('0 0 19 * * *', async () => {
    await open("https://twitter.com/home");
}, null, true, 'Asia/Tokyo');

(async () => {
    await app.start();
    console.log('⚡️ Bolt app is running!');
})();