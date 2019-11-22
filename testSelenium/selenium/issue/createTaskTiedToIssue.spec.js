// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('CreateTaskTiedToIssue', function() {
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
  it('CreateTaskTiedToIssue', async function() {
    await driver.get("http://localhost:4321/signIn")
    await driver.setRect(550, 618)
    await driver.findElement(By.name("email")).click()
    await driver.findElement(By.name("email")).sendKeys("nicolas.duroc@etu.u-bordeaux.fr")
    await driver.findElement(By.name("password")).sendKeys("abcdefgh")
    await driver.findElement(By.name("password")).sendKeys(Key.ENTER)
    await driver.findElement(By.linkText("testing")).click()
    await driver.findElement(By.linkText("Backlog")).click()
    await driver.findElement(By.linkText("Nouvelle issue")).click()
    await driver.findElement(By.id("idInput")).click()
    await driver.findElement(By.id("idInput")).sendKeys("id")
    await driver.findElement(By.id("name")).sendKeys("name")
    await driver.findElement(By.id("priority")).sendKeys("5")
    await driver.findElement(By.id("difficulty")).sendKeys("5")
    await driver.findElement(By.id("difficulty")).sendKeys(Key.ENTER)
    await driver.findElement(By.linkText("Créer une tâche liée")).click()
    await driver.findElement(By.id("id")).click()
    await driver.findElement(By.id("id")).sendKeys("id")
    await driver.findElement(By.id("description")).sendKeys("desc")
    await driver.findElement(By.id("estimatedTime")).sendKeys("1h")
    await driver.findElement(By.id("dependancies")).sendKeys("dep")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Créer une tâche liée")).click()
    await driver.findElement(By.id("id")).click()
    await driver.findElement(By.id("id")).sendKeys("id1")
    await driver.findElement(By.id("description")).sendKeys("desc1")
    await driver.findElement(By.id("estimatedTime")).sendKeys("2h")
    await driver.findElement(By.id("dependancies")).sendKeys("dep1")
    await driver.findElement(By.css(".btn-primary")).click()
    await driver.findElement(By.linkText("Tâches")).click()
    await driver.findElement(By.css(".media:nth-child(5) > form > .btn")).click()
    await driver.findElement(By.css(".btn-danger")).click()
    await driver.findElement(By.linkText("Backlog")).click()
    await driver.findElement(By.css(".btn-danger")).click()
    await driver.findElement(By.linkText("Tâches")).click()
  })
})