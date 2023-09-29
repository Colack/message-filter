# Message Filter

Message Filter is an NPM package that provides tools for filtering and categorizing incoming messages based on content, sentiment, or other criteria. This enables bots to more effectively manage and respond to user messages.

## Installation

To install the Message Filter package, use NPM:

```npm install message-filter```

You will also need to install all of the requirements to run the package, using NPM:

```npm install```

## Usage

Here is an example of how to use the Message Filter package to filter and categorize messages:

```javascript
const { MessageFilter, hasKeyword, getSentiment, filterMessages, categorizeMessages } = require('message-filter');

const messages = [  { content: 'Can you help me with something urgent?', sender: 'user123' },  { content: 'I need help with my account', sender: 'user456' },  { content: 'This product is amazing!', sender: 'user789' },  { content: 'I have a question about your service', sender: 'user123' }];

const messageFilter = new MessageFilter();

messageFilter.addFilter((message) => {
  return hasKeyword(message, ['urgent', 'important']) && getSentiment(message) > 0;
});

messageFilter.addCategory((message) => {
  if (hasKeyword(message, ['urgent', 'important']) && getSentiment(message) > 0) {
    return 'urgent';
  } else if (hasKeyword(message, ['help', 'support'])) {
    return 'support';
  } else {
    return 'other';
  }
});

const filteredMessages = messageFilter.filter(messages);
const categorizedMessages = messageFilter.categorize(messages);

console.log(filteredMessages);
// Output: [{ content: 'Can you help me with something urgent?', sender: 'user123' }]

console.log(categorizedMessages);
// Output: {
//   urgent: [{ content: 'Can you help me with something urgent?', sender: 'user123' }],
//   support: [
//     { content: 'Can you help me with something urgent?', sender: 'user123' },
//     { content: 'I need help with my account', sender: 'user456' },
//     { content: 'I have a question about your service', sender: 'user123' }
//   ],
//   other: [{ content: 'This product is amazing!', sender: 'user789' }]
// }
```

First, we import the necessary functions and class from the `message-filter` package. Then, we create a new `MessageFilter` instance and add a filter and a category function using the `addFilter` and `addCategory` methods. Finally, we use the `filter` and `categorize` methods to filter and categorize the messages.

## Final Notes

Message Filter is a powerful tool for filtering and categorizing incoming messages in a way that enables bots and other software applications to more effectively manage and respond to user messages. By using the functions and methods provided by this package, you can quickly and easily filter messages based on content, sentiment, or other criteria, and categorize them for further processing. Whether you're building a chatbot, an email filtering system, or any other application that involves processing user messages, Message Filter can help you save time and increase efficiency.
