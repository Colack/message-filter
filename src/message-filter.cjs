const natural = require('natural');
const sentiment = require('sentiment');

/**
 * A class for filtering messages based on keywords and sentiment
 * @class MessageFilter
 * @param {Object} options - Options for the message filter
 * @param {string[]} options.keywords - List of keywords to filter on
 * @param {number} options.minSentiment - Minimum sentiment score for a message to be accepted
 * @param {number} options.maxSentiment - Maximum sentiment score for a message to be accepted
 * @param {Function} options.onAccept - Function to call when a message is accepted
 * @param {Function} options.onReject - Function to call when a message is rejected
 * @example
 * const messageFilter = new MessageFilter({
 *  keywords: ['hello', 'world'],
 * minSentiment: 0,
 * maxSentiment: 10,
 * onAccept: (message) => {
 * console.log('Accepted message:', message);
 * },
 * onReject: (message) => {
 * console.log('Rejected message:', message);
 * }
 * });
 * @example
 * const messageFilter = new MessageFilter();
 * messageFilter.setKeywords(['hello', 'world']);
 * messageFilter.setSentimentRange(0, 10);
 * messageFilter.setCallbacks(
 * (message) => {
 * console.log('Accepted message:', message);
 * },
 * (message) => {
 * console.log('Rejected message:', message);
 * }
 * );
 */
class MessageFilter {
  constructor(options) {
    // Set default options
    this.options = Object.assign({
      // List of keywords to filter on
      keywords: [], 
      // Minimum sentiment score for a message to be accepted
      minSentiment: 0,
      // Maximum sentiment score for a message to be accepted
      maxSentiment: 10,
      // Function to call when a message is accepted
      onAccept: (message) => {},
      // Function to call when a message is rejected
      onReject: (message) => {}
    }, options);
    
    // Create a tokenizer for natural language processing
    this.tokenizer = new natural.WordTokenizer();
  }
  
  filter(message) {
    // Tokenize the message content
    const tokens = this.tokenizer.tokenize(message.content);
    
    // Check if the message contains any of the keywords
    const containsKeyword = this.options.keywords.some(keyword => tokens.includes(keyword));
    
    // Analyze the sentiment of the message
    const sentimentScore = sentiment(message.content).score;
    
    // Check if the sentiment score falls within the accepted range
    const isWithinSentimentRange = sentimentScore >= this.options.minSentiment && sentimentScore <= this.options.maxSentiment;
    
    if (containsKeyword && isWithinSentimentRange) {
      // Call the onAccept function if the message passes the filter
      this.options.onAccept(message);
    } else {
      // Call the onReject function if the message fails the filter
      this.options.onReject(message);
    }
  }
  
  // Add a function to set the list of keywords to filter on
  setKeywords(keywords) {
    this.options.keywords = keywords;
  }
  
  // Add a function to set the minimum and maximum sentiment scores
  setSentimentRange(minSentiment, maxSentiment) {
    this.options.minSentiment = minSentiment;
    this.options.maxSentiment = maxSentiment;
  }
  
  // Add a function to set the onAccept and onReject functions
  setCallbacks(onAccept, onReject) {
    this.options.onAccept = onAccept;
    this.options.onReject = onReject;
  }
  
  // Add a function to add a new filter function
  addFilter(name, filterFunction) {
    // Create a new property on the instance with the filter function
    this[name] = filterFunction;
  }
  
  // Add a function to remove a filter function
  removeFilter(name) {
    // Delete the property with the specified name
    delete this[name];
  }
}

function hasKeyword(message, keywords) {
  // Check if the message content contains any of the keywords
  return keywords.some(keyword => message.content.toLowerCase().includes(keyword.toLowerCase()));
}

function getSentiment(message) {
  // Use a sentiment analysis library to determine the sentiment score of the message content
  // This is just an example, you would need to install and import a real library to use this function
  return sentiment(message.content).score;
}

function filterMessages(messages, filterFunction) {
  // Filter an array of messages using a custom filter function
  return messages.filter(message => filterFunction(message));
}

function replaceKeywords(message, keywords, replacement) {
    let newContent = message.content;
    keywords.forEach(keyword => {
        newContent = newContent.replace(keyword, replacement);
    });
    return Object.assign({}, message, { content: newContent });
}

function categorizeMessages(messages, categoryFunction) {
  // Categorize an array of messages using a custom category function
  const categories = {};
  messages.forEach(message => {
    const category = categoryFunction(message);
    if (categories[category]) {
      categories[category].push(message);
    } else {
      categories[category] = [message];
    }
  });
  return categories;
}

function filterMessagesByKeyword(messages, keywords) {
  // Filter an array of messages to only include messages that contain any of the keywords
  return filterMessages(messages, message => hasKeyword(message, keywords));
}

module.exports = {
  MessageFilter: MessageFilter,
  hasKeyword: hasKeyword,
  getSentiment: getSentiment,
  filterMessages: filterMessages,
  replaceKeywords: replaceKeywords,
  categorizeMessages: categorizeMessages,
  filterMessagesByKeyword: filterMessagesByKeyword
};
