import { getSentiment, hasKeyword, listInappropriateWords } from './filters.js';

export function isKeyword(keyword) {
  return (message) => hasKeyword(message, [keyword]);
}

export function isCategory(category) {
  return (message) => message.category === category;
}

export function isSentiment(minSentiment, maxSentiment) {
  return (message) => {
    const sentimentScore = getSentiment(message);
    return sentimentScore >= minSentiment && sentimentScore <= maxSentiment;
  };
}

export function isMessage(message) {
  return (otherMessage) => message === otherMessage;
}

export function isMessageObject(message) {
  return (otherMessage) => message.content === otherMessage.content;
}

export function isMessageArray(messages) {
  return (message) => messages.some((otherMessage) => message === otherMessage);
}

export function isMessageString(message) {
  return (otherMessage) => message.content === otherMessage;
}
