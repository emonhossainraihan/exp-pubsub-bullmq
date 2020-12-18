


// queue.js
const { Queue, QueueScheduler } = require('bullmq');
const scheduler = new QueueScheduler('links');
const linkQueue = new Queue('links');

async function getWaitingCount() {
    const waitingCount = await linkQueue.getWaitingCount();
    console.log({ waitingCount });
}

async function removeAllJobs() {
    await Promise.all(
        ['delayed', 'wait', 'active', 'completed', 'failed'].map((type) =>
            linkQueue.clean(0, 0, type)
        )
    );
    linkQueue.drain();
    linkQueue.drain(true);
}

; (async () => {
    await getWaitingCount();
    await removeAllJobs();
    await getWaitingCount();
    for (let i = 0; i < 10; i++) {
        await linkQueue.add(
            'example.com',
            { url: `https://example.com/?q=${i}` },
            { removeOnComplete: true }
        );
    }
})();