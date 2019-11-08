// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
public class TestUpdateIssueCancelAllTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new FirefoxDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void testUpdateIssueCancelAll() {
    driver.get("http://localhost:4321/");
    driver.manage().window().setSize(new Dimension(550, 696));
    driver.findElement(By.linkText("Modifier")).click();
    driver.findElement(By.id("name")).click();
    driver.findElement(By.id("name")).sendKeys("name1");
    driver.findElement(By.id("description")).click();
    driver.findElement(By.id("priority")).sendKeys("3");
    driver.findElement(By.id("priority")).click();
    driver.findElement(By.id("difficulty")).sendKeys("3");
    driver.findElement(By.id("difficulty")).click();
    driver.findElement(By.id("description")).sendKeys("desc1");
    driver.findElement(By.linkText("Annuler")).click();
  }
}
