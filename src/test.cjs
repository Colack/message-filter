const messageFilter = require('./message-filter.cjs');

const messageFilter = new MessageFilter({
    keywords: ['hello', 'world'],
    minSentiment: 0,
    maxSentiment: 10,
    onAccept: (message) => {
        console.log('Accepted message:', message);
    },
    onReject: (message) => {
        console.log('Rejected message:', message);
    }
});

messageFilter.filter({
    content: 'Hello world!'
});

// Path: src/message-filter.cjs