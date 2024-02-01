import Mocha from 'mocha';
import allureReporter from '@wdio/allure-reporter';

interface AllureConfig {
  addTag?: string;
  addEpic?: string;
  addStory?: string;
  addDescription?: { description: string; type?: string };
  jiraTicketId?: string;
}

// Define a wrapper function for `it` that includes the `.meta` functionality
function itWithMeta(title: string, fn: (this: Mocha.Context) => Promise<void>, allureConfig?: AllureConfig): Mocha.Test {
  return it(title, async function () {
    if (allureConfig) {
      applyAllureConfig(allureConfig);
    }
    await fn.call(this);
  });
}

itWithMeta.meta = (allureConfig?: AllureConfig) => (title: string, fn: (this: Mocha.Context) => Promise<void>): Mocha.Test => {
  return itWithMeta(title, fn, allureConfig);
};

function applyAllureConfig(allureConfig: AllureConfig) {
  if (allureConfig.addTag) {
    allureReporter.addLabel('tag', allureConfig.addTag);
  }
  if (allureConfig.addEpic) {
    allureReporter.addLabel('epic', allureConfig.addEpic);
  }
  if (allureConfig.addStory) {
    allureReporter.addLabel('story', allureConfig.addStory);
  }
  if (allureConfig.addDescription) {
    allureReporter.addDescription(allureConfig.addDescription.description, allureConfig.addDescription.type || 'text');
  }
  if (allureConfig.jiraTicketId) {
    const jiraBaseUrl = 'https://example.atlassian.net/browse/';
    const fullJiraLink = jiraBaseUrl + allureConfig.jiraTicketId;
    allureReporter.addLink( fullJiraLink,'Jira Ticket', 'issue');
  }
}

// Export the wrapper function
export { itWithMeta as it };
