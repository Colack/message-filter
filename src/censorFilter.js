import { MessageFilter } from './MessageFilter.js';

/**
 * A class for censoring messages based on keywords.
 * @class CensorFilter
 * @extends MessageFilter
 */
export class CensorFilter extends MessageFilter {
  constructor(options = {}) {
    super(options);
    this.addFilter('censor', this.censor);
  }

  censor(message, word) {
    const newContent = message.content.replace(word, '*'.repeat(word.length));
    return { ...message, content: newContent };
  }
}
