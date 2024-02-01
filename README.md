<h1 align="center"> 🤖 WDIO-META-TAGS 🤖 </h1>

## **Table of Contents**
- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Report Example](#report-example)
- [Running the App](#running-the-App)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)

## 📓 Purpose 📓
"Damn I wish that WDIO supported using a simple .meta() that I could use for either GREPing tests or easily appending stuff to an Allure report". Wish granted.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G3TQC7N)

## 📢 Prerequisites 📢
In order to use this package you'll need to install the following:

        A. Git 
        B. NodeJs (v20.11)
        C. Chrome, Firefox and IE browsers latest versions
        D. VS Code
        E. GitBash

It is assumed that you have the following dependencies installed in your project:
    @types/mocha
    @types/node
    @wdio/cli
    @wdio/local-runner
    @wdio/mocha-framework
    @wdio/spec-reporter
    mocha
    ts-node
    typescript
    @wdio/allure-reporter
    @wdio/globals
    @wdio/junit-reporter

## 🔌 Installation 🔌
 
Run the below command on terminal to install the library:
```npm i wdio-meta-tags``` 
or 
```npm install wdio-meta-tags```

## 🧰 Usage 🧰
Test file and usage example:

```
import { it } from '../../tagHelper';

describe('My Feature Tests', function() {
    it.meta({
        addTag: 'Regression',
        addEpic: 'User Authentication',
        addStory: 'Login Functionality',
        addDescription: { description: 'Testing the login feature', type: 'text' },
        jiraTicketId: 'DP-1234'
    })('should perform a specific task', async function() {
        //test logic
    });
});
```

This probably goes without saying but you'll also need to update your WDIO config file and change the reporter to Allure.

## 🧠 Supported Allure API Commands 🧠
@wdio/allure-reporter documentation can be found ![here](https://webdriver.io/docs/allure-reporter/#supported-allure-api).

* ```addLabel(name, value)``` - assign a custom label to test

* ```addFeature(featureName)``` – assign features to test

* ```addStory(storyName)``` – assign user story to test

* ```addSeverity(value)``` – assign severity to test, accepts one of these values: blocker, - critical, normal, minor, trivial

* ```addTag(value)``` – assign a tag label to test

* ```addEpic(value)``` – assign an epic label to test

* ```addOwner(value)``` – assign an owner label to test

* ```addSuite(value)``` – assign a suite label to test

* ```addSubSuite(value)``` – assign a sub suite label to test

* ```addParentSuite(value)``` – assign a parent suite label to test

* ```addIssue(value)``` – assign issue id to test

* ```addAllureId(value)``` – assign allure test ops id label to test

* ```addTestId(value)``` – assign TMS test id to test

* ```addArgument(name, value)``` - add an additional argument to test

* ```addDescription(description, [type])``` – add description to test

    - ```description (String)``` - description of the test

    - ```type (String, optional)``` – description type, text by 
    default. Values ['text', 'html','markdown']

## 🎸 Report Example 🎸
![Report](https://i.imgur.com/vVyXsfr.jpg)

## 🗯️ Troubleshooting 🗯️
You may need to ![download](https://www.oracle.com/java/technologies/downloads/) the latest Java SDK if you have problems launching allure.

## 💫 License 💫
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.