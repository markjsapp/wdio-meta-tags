import Mocha from 'mocha';
import allureReporter from '@wdio/allure-reporter';
import * as dotenv from 'dotenv';

dotenv.config();

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

interface ItFunctionWithMeta extends Mocha.TestFunction {
  meta: (allureConfig?: AllureConfig) => (title: string, fn: Mocha.AsyncFunc) => Mocha.Test;
}

interface ItWithMeta extends ItFunctionWithMeta {
  skip: ItFunctionWithMeta;
  only: ItFunctionWithMeta;
}

type FlexibleTestFunction = Mocha.TestFunction & {
  skip: Mocha.PendingTestFunction;
  only: Mocha.ExclusiveTestFunction;
};

const extendWithMeta = (base: FlexibleTestFunction) => {
  const extended = (title: string, fn: Mocha.AsyncFunc) => base(title, async function() {
    await fn.apply(this);
  }) as Mocha.Test;

  extended.meta = (allureConfig: AllureConfig) => (title: string, fn: Mocha.AsyncFunc) => base(title, async function() {
    applyAllureConfig(allureConfig);
    await fn.apply(this);
  }) as Mocha.Test;

  return extended;
};

const itWithMeta = (title: string, fn: Mocha.AsyncFunc) => it(title, async function() {
  await fn.apply(this);
}) as Mocha.Test;

itWithMeta.meta = (allureConfig: AllureConfig) => (title: string, fn: Mocha.AsyncFunc) => it(title, async function() {
  applyAllureConfig(allureConfig);
  await fn.apply(this);
}) as Mocha.Test;

itWithMeta.skip = extendWithMeta(it.skip as FlexibleTestFunction);
itWithMeta.only = extendWithMeta(it.only as FlexibleTestFunction);

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
      const jiraBaseUrl = process.env.WDIO_META_TAGS_JIRA_BASE_URL || 'https://example.atlassian.net/browse/';
      const fullJiraLink = jiraBaseUrl + allureConfig.jiraTicketId;
      allureReporter.addLink(fullJiraLink, fullJiraLink, 'issue');
    }
}

// Export the wrapper function
export { itWithMeta as it };
