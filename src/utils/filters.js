import sentiment from 'sentiment';

export function hasKeyword(message, keywords) {
  return keywords.some((keyword) => message.content.toLowerCase().includes(keyword.toLowerCase()));
}

export function getSentiment(message) {
  return sentiment(message.content).score;
}

export function filterMessages(messages, filterFunction) {
  return messages.filter((message) => filterFunction(message));
}

export function replaceKeywords(message, keywords, replacement) {
  let newContent = message.content;
  keywords.forEach((keyword) => {
    newContent = newContent.replace(keyword, replacement);
  });
  return { ...message, content: newContent };
}

export function filterMessagesByKeyword(messages, keywords) {
  return filterMessages(messages, (message) => hasKeyword(message, keywords));
}

export function filterMessagesBySentiment(messages, minSentiment, maxSentiment) {
  return filterMessages(messages, (message) => {
    const sentimentScore = getSentiment(message);
    return sentimentScore >= minSentiment && sentimentScore <= maxSentiment;
  });
}
