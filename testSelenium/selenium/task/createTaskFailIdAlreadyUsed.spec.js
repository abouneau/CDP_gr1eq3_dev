// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('CreateTaskFailIdAlreadyUsed', function() {
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
  it('CreateTaskFailIdAlreadyUsed', async function() {
    await driver.get("http://localhost:4321/signIn")
    await driver.setRect(1295, 695)
    await driver.findElement(By.name("email")).sendKeys("nicolas.duroc@etu.u-bordeaux.fr")
    await driver.findElement(By.name("password")).sendKeys("abcdefgh")
    await driver.findElement(By.name("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.linkText("testing")).click()
    await driver.findElement(By.linkText("Tâches")).click()
    await driver.findElement(By.linkText("Nouvelle tâche")).click()
    await driver.findElement(By.id("idInput")).click()
    await driver.findElement(By.id("idInput")).sendKeys("id")
    await driver.findElement(By.id("description")).sendKeys("desc")
    await driver.findElement(By.id("estimatedTime")).sendKeys("1h")
    await driver.findElement(By.id("dependencies")).sendKeys("dep")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Nouvelle tâche")).click()
    await driver.findElement(By.id("idInput")).click()
    await driver.findElement(By.id("idInput")).sendKeys("id")
    await driver.findElement(By.id("description")).sendKeys("desc1")
    await driver.findElement(By.id("estimatedTime")).sendKeys("2h")
    await driver.findElement(By.id("dependencies")).sendKeys("dep1")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.css(".btn-danger")).click()
  })
})
