import Mocha from 'mocha';
import allureReporter from '@wdio/allure-reporter';

interface AllureConfig {
    addTag?: string | string[];
    addFeature?: string;
    addStory?: string;
    addSeverity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
    addEpic?: string;
    addOwner?: string;
    addSuite?: string;
    addSubSuite?: string;
    addParentSuite?: string;
    addIssue?: string;
    addAllureId?: string;
    addTestId?: string;
    addArgument?: { name: string; value: string }[];
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
        const tags = Array.isArray(allureConfig.addTag) ? allureConfig.addTag : [allureConfig.addTag];
        tags.forEach(tag => {
          allureReporter.addLabel('tag', tag);
        });
      }
    if (allureConfig.addFeature) {
      allureReporter.addFeature(allureConfig.addFeature);
    }
    if (allureConfig.addStory) {
      allureReporter.addStory(allureConfig.addStory);
    }
    if (allureConfig.addSeverity) {
      allureReporter.addSeverity(allureConfig.addSeverity);
    }
    if (allureConfig.addEpic) {
      allureReporter.addEpic(allureConfig.addEpic);
    }
    if (allureConfig.addOwner) {
      allureReporter.addOwner(allureConfig.addOwner);
    }
    if (allureConfig.addSuite) {
      allureReporter.addSuite(allureConfig.addSuite);
    }
    if (allureConfig.addSubSuite) {
      allureReporter.addSubSuite(allureConfig.addSubSuite);
    }
    if (allureConfig.addParentSuite) {
      allureReporter.addParentSuite(allureConfig.addParentSuite);
    }
    if (allureConfig.addIssue) {
      allureReporter.addIssue(allureConfig.addIssue);
    }
    if (allureConfig.addAllureId) {
      allureReporter.addAllureId(allureConfig.addAllureId);
    }
    if (allureConfig.addTestId) {
      allureReporter.addTestId(allureConfig.addTestId);
    }
    if (allureConfig.addArgument) {
      allureConfig.addArgument.forEach(argument => {
        allureReporter.addArgument(argument.name, argument.value);
      });
    }
    if (allureConfig.addDescription) {
      allureReporter.addDescription(allureConfig.addDescription.description, allureConfig.addDescription.type || 'text');
    }
    if (allureConfig.jiraTicketId) {
      const jiraBaseUrl = 'https://example.atlassian.net/browse/';
      const fullJiraLink = jiraBaseUrl + allureConfig.jiraTicketId;
      allureReporter.addLink(fullJiraLink, 'Jira Ticket', 'issue');
    }
}

// Export the wrapper function
export { itWithMeta as it };
