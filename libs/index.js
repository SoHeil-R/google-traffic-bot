const webDriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = new chrome.ServiceBuilder(require('chromedriver').path)

const auto = require('./autobot')
const loadproxy = require('./proxy')
const spoofing = require('./spoofing')

const PERMISSIONS = [
    "--headless",
    "--mute-audio",
    "--disable-logging",
    "--disable-infobars",
    "--disable-dev-shm-usage",
]


function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

function Stealth(driver){
    return new Promise(async function(resolve){
        var connection = await driver.createCDPConnection('page')
        await connection.execute('Runtime.enable', {}, null)
        await connection.execute('Page.enable', {}, null)
        await connection.execute("Page.addScriptToEvaluateOnNewDocument", {
            source: spoofing()
        }, null)
        resolve(true)
    })
}


function findSiteUrl(Driver, url){
    return new Promise(async (r) => {
        var sites = await Driver.findElements(webDriver.By.className('yuRUbf'))
        for(var i = 0; i < sites.length; i++){
            var target_url = await sites[i].findElement(webDriver.By.tagName('a')).getAttribute('href')
            if(target_url.match(url)){
                return r(i)
            }
        }
        r(-1)
    });
}

function nextPage(Driver, url){
    return new Promise(async (r) => {
        var pages = await Driver.findElements(webDriver.By.className('d6cvqb BBwThe'))
        if (pages[1])
            await pages[1]?.click()
        else{
            await Driver.executeScript("window.scrollBy(0, 800)")
        }
        await delay(1000)
        var findURL = await findSiteUrl(Driver, url)
        await delay(2000)
        if(findURL == -1){
            await nextPage(Driver, url)
        }else{
            r(findURL)
        }
    });
}

function clickPage(Driver, page_id){
    return new Promise(async (r) => {
        var sites = await Driver.findElements(webDriver.By.className('LC20lb MBeuO DKV0Md'))
        await sites[page_id].click()
        await delay(1000)
        await Driver.executeScript(auto.scroll())
        r(true)
    });
}

var driverList = [];
async function Direct(url, proxy){
    var options = new chrome.Options()
    if (proxy)
        options.addArguments(`--proxy-server=http://${proxy}`)
    PERMISSIONS.forEach(perms => {
        options.addArguments(perms)
    })
    options.excludeSwitches('enable-logging')
    var driver = await new webDriver.Builder().forBrowser('chrome').setChromeService(chromedriver).setChromeOptions(options).build()
    await Stealth(driver)
    await driver.get(url).then(async ()=>{
        await delay(1000)
        await driver.executeScript(auto.scroll())
        driverList.push({driver: driver, time: Date.now()})
    })
}

async function googleSearch(url, keyboard, proxy){
    var options = new chrome.Options()
    if (proxy)
        options.addArguments(`--proxy-server=http://${proxy}`)
    PERMISSIONS.forEach(perms => {
        options.addArguments(perms)
    })
    options.excludeSwitches('enable-logging')
    var driver = await new webDriver.Builder().forBrowser('chrome').setChromeService(chromedriver).setChromeOptions(options).build()
    await Stealth(driver)
    await driver.get("https://www.google.com/").then(async ()=>{
        var accept_cookies = await driver.findElements(webDriver.By.className('QS5gu sy4vM'))
        await accept_cookies[0]?.click()
        await driver.findElement(webDriver.By.className('gLFyf')).sendKeys(keyboard)
        var elements = await driver.findElements(webDriver.By.className('gNO89b'))
        await elements[1].click()
        await delay(1000)
        var pageId = await findSiteUrl(driver, url)
        await delay(2000)
        if (pageId == -1)
            pageId = await nextPage(driver, url)
        await delay(1000)
        await clickPage(driver, pageId)
        driverList.push({driver: driver, time: Date.now()})
    })
}

async function proxyServer(url, keyboard){
    var options = new chrome.Options()
    PERMISSIONS.forEach(perms => {
        options.addArguments(perms)
    })
    options.excludeSwitches('enable-logging')
    var driver = await new webDriver.Builder().forBrowser('chrome').setChromeService(chromedriver).setChromeOptions(options).build()
    await Stealth(driver)
    await driver.get('https://www.blockaway.net').then(async()=>{
        await driver.findElement(webDriver.By.id('url')).sendKeys('https://www.google.com/')
        await driver.findElement(webDriver.By.id('requestSubmit')).click()
        await delay(12000)
        var accept_cookies = await driver.findElements(webDriver.By.className('QS5gu sy4vM'))
        await accept_cookies[0]?.click()
        await driver.findElement(webDriver.By.className('gLFyf')).sendKeys(keyboard)
        var elements = await driver.findElements(webDriver.By.className('gNO89b'))
        await elements[1].click()
        await delay(1000)
        var pageId = await findSiteUrl(driver, url)
        await delay(2000)
        if (pageId == -1)
            pageId = await nextPage(driver, url)
        await delay(1000)
        console.log(pageId)
        await clickPage(driver, pageId)
        driverList.push({driver: driver, time: Date.now()})
    })
}



var usedDriver = 0
async function driverTimeout(){
    setInterval(async () => {
        if (driverList.length > 0)
            for (var i = 0; i < driverList.length; i++){
                if(Date.now() - driverList[i].time > 60000){
                    await driverList[i].driver.quit()
                    driverList.splice(i, 1)
                }
            }
    }, 4000);
}


async function main(url, keyboard, count, option){
    driverTimeout()
    var proxy = await loadproxy()
    if (option == "Direct"){
        console.log("[DIRECT]: process started | URL: " + url)
        while (usedDriver != count && usedDriver < count){
            await Direct(url, proxy.length > 0 ? proxy[usedDriver] : null)
            usedDriver += 1
        }
    }else if (option == "Google"){
        console.log("[SEARCH]: process started | URL: " + url)
        while (usedDriver >= count){
            await googleSearch(url, keyboard, proxy.length > 0 ? proxy[usedDriver] : null)
            usedDriver += 1
        }
    }else if (option == "Proxy"){
        console.log("[PROXY]: process started | URL: " + url)
        while (usedDriver >= count){
            await proxyServer(url, keyboard)
            usedDriver += 1
        }
    }
}

async function stop(){
    var stopcount = 0;
    var Interval = setInterval(async ()=>{
        for (var i = 0; i < driverList.length; i++){
            await driverList[i].driver.quit()
            driverList.splice(i, 1)
        }
        if (stopcount > usedDriver)
            clearInterval(Interval)
        stopcount += 1
    }, 2500)
}

module.exports = { 
    main: main,
    stop: stop
}