// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('CreateModifyAndSupressMultipleTest', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('CreateModifyAndSupressMultipleTest', async function() {
    await driver.get("http://localhost:4321/signIn")
    await driver.setRect(550, 680)
    await driver.findElement(By.name("email")).sendKeys("nicolas.duroc@etu.u-bordeaux.fr")
    await driver.findElement(By.name("password")).click()
    await driver.findElement(By.name("password")).sendKeys("abcdefgh")
    await driver.findElement(By.css(".btn")).click()
    await driver.findElement(By.linkText("testing")).click()
    await driver.findElement(By.linkText("Tests")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test")
    await driver.findElement(By.css("html")).click()
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné test , Lorsque test , Alors test")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test1")
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné test1 , Lorsque test1 , Alors test1")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test1")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test2")
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné ... , Lorsque test2 , Alors ...")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test3")
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné test3 , Lorsque ... , Alors ...")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test4")
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné ... , Lorsque ... , Alors test4")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test5")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.css(".media:nth-child(5) > .btn")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test5")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.css(".media:nth-child(6) > .btn")).click()
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné ... , Lorsque test2 , Alors test2")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.css(".media:nth-child(9) > .btn")).click()
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné ... , Lorsque ... , Alors test5")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.css(".media:nth-child(4) > form > .btn")).click()
    await driver.findElement(By.css(".media:nth-child(4) > form > .btn")).click()
    await driver.findElement(By.css(".media:nth-child(6) > form > .btn")).click()
    await driver.findElement(By.css(".media:nth-child(5) > form > .btn")).click()
    await driver.findElement(By.css(".media:nth-child(4) > form > .btn")).click()
    await driver.findElement(By.css(".media:nth-child(5) > form > .btn")).click()
    await driver.findElement(By.css(".media:nth-child(4) > form > .btn")).click()
    await driver.findElement(By.css(".btn-danger")).click()
  })
})
