// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('CancelCreateModifyTest', function() {
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
  it('CancelCreateModifyTest', async function() {
    await driver.get("http://localhost:4321/signIn")
    await driver.setRect(1295, 695)
    await driver.findElement(By.name("email")).sendKeys("nicolas.duroc@etu.u-bordeaux.fr")
    await driver.findElement(By.name("password")).sendKeys("abcdefgh")
    await driver.findElement(By.name("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.linkText("testing")).click()
    await driver.findElement(By.linkText("Tests")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouveau test")).click()
    await driver.findElement(By.id("name")).click()
    await driver.findElement(By.id("name")).sendKeys("test1")
    await driver.findElement(By.css("html")).click()
    await driver.findElement(By.linkText("Annuler")).click()
    await driver.findElement(By.linkText("Modifier")).click()
    await driver.findElement(By.id("description")).click()
    await driver.findElement(By.id("description")).sendKeys("Etant donné ... , Lorsque ... , Alors test")
    await driver.findElement(By.linkText("Annuler")).click()
    await driver.findElement(By.css(".btn-danger")).click()
  })
})
