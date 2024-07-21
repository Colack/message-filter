import { getSentiment, hasKeyword, listInappropriateWords } from './filters.js';

export function categorizeMessages(messages, categoryFunction) {
  const categories = {};
  messages.forEach((message) => {
    const category = categoryFunction(message);
    if (categories[category]) {
      categories[category].push(message);
    } else {
      categories[category] = [message];
    }
  });
  return categories;
}

export function categorizeMessagesBySentiment(messages) {
  return categorizeMessages(messages, (message) => {
    const sentimentScore = getSentiment(message);
    return sentimentScore < 0 ? 'negative' : sentimentScore > 0 ? 'positive' : 'neutral';
  });
}

export function categorizeMessagesByKeyword(messages, keywords) {
  return categorizeMessages(messages, (message) => (hasKeyword(message, keywords) ? 'contains keyword' : 'does not contain keyword'));
}

export function categorizeMessagesByInappropriateWords(messages, keywords) {
  return categorizeMessages(messages, (message) => (listInappropriateWords(message, keywords).length > 0 ? 'contains inappropriate words' : 'does not contain inappropriate words'));
}
