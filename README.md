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
    chromedriver

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

## 🎸 Report Example 🎸
![Report](https://i.imgur.com/vVyXsfr.jpg)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.