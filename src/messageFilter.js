import natural from 'natural';
import sentiment from 'sentiment';

/**
 * A class for filtering messages based on keywords and sentiment.
 * @class MessageFilter
 */
export class MessageFilter {
  constructor(options = {}) {
    this.options = {
      keywords: [],
      minSentiment: 0,
      maxSentiment: 10,
      onAccept: (message) => {},
      onReject: (message) => {},
      ...options,
    };

    this.tokenizer = new natural.WordTokenizer();
  }

  filter(message) {
    const tokens = this.tokenizer.tokenize(message.content);
    const containsKeyword = this.options.keywords.some((keyword) => tokens.includes(keyword));
    const sentimentScore = sentiment(message.content).score;
    const isWithinSentimentRange = sentimentScore >= this.options.minSentiment && sentimentScore <= this.options.maxSentiment;

    if (containsKeyword && isWithinSentimentRange) {
      this.options.onAccept(message);
    } else {
      this.options.onReject(message);
    }
  }

  setKeywords(keywords) {
    this.options.keywords = keywords;
  }

  setSentimentRange(minSentiment, maxSentiment) {
    this.options.minSentiment = minSentiment;
    this.options.maxSentiment = maxSentiment;
  }

  setCallbacks(onAccept, onReject) {
    this.options.onAccept = onAccept;
    this.options.onReject = onReject;
  }

  addFilter(name, filterFunction) {
    this[name] = filterFunction;
  }

  removeFilter(name) {
    delete this[name];
  }
}
