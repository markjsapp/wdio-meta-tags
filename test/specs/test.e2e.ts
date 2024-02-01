import { expect, browser, $ } from '@wdio/globals'
import { it } from '../../src/index'

describe('My Feature Tests', function() {
    before(async function() {
        await browser.url(`https://the-internet.herokuapp.com/login`);
    });
    
    it.meta({
        addTag: 'Regression',
        addEpic: 'User Authentication',
        addStory: 'Login Functionality',
        addDescription: { description: 'Testing the login feature', type: 'text' },
        jiraTicketId: 'DP-1234'
    })('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`)

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!')
    })

    it.meta({
        addDescription: { description: 'Dummy Test 2', type: 'text' },
    })('Dummy Test 2', async () => {
        console.log('potato');
    })
})

