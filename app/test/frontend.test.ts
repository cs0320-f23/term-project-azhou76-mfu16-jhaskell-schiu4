import { test, expect } from "@playwright/test";

test("on page load, books", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByTestId("books")).toBeVisible();
});

test("on a book page, see the text", async ({ page }) => {
  await page.goto("http://localhost:3000/media/2/1");
  await expect(
    page.getByText(
      "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position."
    )
  ).toBeVisible();
});

test("on a book page, see the comments", async ({ page }) => {
  await page.goto("http://localhost:3000/media/2/1");
  await expect(
    page.getByText("This is the first comment on chapter 1")
  ).toBeVisible();
});

test("on a book page, can search by keyword", async ({ page }) => {
  await page.goto("http://localhost:3000/media/2/1");
  await page.getByTestId("searchbarfill").fill("reasoner");
  await page.getByTestId("searchbarclick").click();
  await expect(page.getByText("693")).toBeVisible();
  await expect(page.getByText("13423")).toBeVisible();
});

// test("after I type into the input box, its text changes", async ({ page }) => {
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("Awesome command");

//   const mock_input = `Awesome command`;
//   await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
// });

// test("on page load, i see a button", async ({ page }) => {
//   await expect(page.locator("css=button")).toBeVisible();
// });

// test("after I click the button, its label increments", async ({ page }) => {
//   await page.locator("css=button").click();
//   await page.locator("css=button").click();
//   await page.locator("css=button").click();
//   await page.locator("css=button").click();
//   await expect(page.locator("css=button")).toHaveText("Submitted 4 time(s)");
// });

// //unit test on registering
// test("unit test: registration", async ({ page }) => {
//   //testing registration of all commands

//   //registration of command that does not exist
//   await page.getByLabel("Command input").fill("register wronginput");
//   await page.locator("css=button").click();
//   await expect(page.getByTestId("repl-history")).toContainText(
//     "trying to register a command that doesn't exist"
//   );

//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register view");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register search");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register broadband");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toContainText(
//     'trying to register a command that doesn\'t existsuccessfully registered command "load_file"successfully registered command "view"successfully registered command "search"successfully registered command "broadband"'
//   );
// });

// // loading tests

// test("after registering, loading valid CSV and submitting, we receive the success message in brief mode", async ({
//   page,
// }) => {
//   //running without registering the command should fail
//   await page
//     .getByLabel("Command input")
//     .fill("load_file ./data/census/postsecondary_education.csv");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toHaveText(
//     "unregistered command"
//   );

//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await page
//     .getByLabel("Command input")
//     .fill("load_file ./data/census/postsecondary_education.csv");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toContainText(
//     "successfully loaded csv"
//   );
// });

// test("after loading invalid CSV and submitting, we receive the error message in brief mode", async ({
//   page,
// }) => {
//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("load_file asfgnafldknalk");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toContainText(
//     "failed to load csv"
//   );
// });

// //mode testing

// test("after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode", async ({
//   page,
// }) => {
//   await page.getByLabel("Command input").fill("mode");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await page
//     .getByLabel("Command input")
//     .fill("load_file ./data/census/postsecondary_education.csv");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toContainText(
//     "Command: load_file ./data/census/postsecondary_education.csvOutput: successfully loaded csv"
//   );
// });

// test("after switching to verbose and loading invalid CSV and submitting, we receive the error message in verbose mode", async ({
//   page,
// }) => {
//   await page.getByLabel("Command input").fill("mode");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("load_file asfgnafldknalk");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toContainText(
//     "Command: load_file asfgnafldknalkOutput: failed to load csv"
//   );
// });

// //also tests multiple loads
// test("after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after switching to brief and loading a different valid CSV and submitting, we receive the success message in brief mode", async ({
//   page,
// }) => {
//   await page.getByLabel("Command input").fill("mode");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await page
//     .getByLabel("Command input")
//     .fill("load_file ./data/census/postsecondary_education.csv");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toContainText(
//     "Command: load_file ./data/census/postsecondary_education.csvOutput: successfully loaded csv"
//   );

//   await page.getByLabel("Command input").fill("mode");
//   await page.locator("css=button").click();

//   //testing loading of multiple loads
//   await page
//     .getByLabel("Command input")
//     .fill("load_file ./data/census/ri_city_town_income.csv");
//   await page.locator("css=button").click();

//   //after the first load, it should contain a successful load of the second, without lising the command
//   await expect(page.getByTestId("repl-history")).toContainText(
//     "Command: load_file ./data/census/postsecondary_education.csvOutput: successfully loaded csvsuccessfully loaded csv"
//   );
// });

// //verbose mode twice
// test("after switching to verbose and loading valid CSV and submitting, we receive the success message in verbose mode; after loading a different valid CSV and submitting, we receive the success message in verbose mode still", async ({
//   page,
// }) => {
//   await page.getByLabel("Command input").fill("mode");
//   await page.locator("css=button").click();

//   await page.getByLabel("Command input").fill("register load_file");
//   await page.locator("css=button").click();

//   await page
//     .getByLabel("Command input")
//     .fill("load_file ./data/census/postsecondary_education.csv");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toHaveText(
//     'Command: register load_fileOutput: successfully registered command "load_file"Command: load_file ./data/census/postsecondary_education.csvOutput: successfully loaded csv'
//   );

//   await page
//     .getByLabel("Command input")
//     .fill("load_file ./data/census/ri_city_town_income.csv");
//   await page.locator("css=button").click();

//   await expect(page.getByTestId("repl-history")).toHaveText(
//     'Command: register load_fileOutput: successfully registered command "load_file"Command: load_file ./data/census/postsecondary_education.csvOutput: successfully loaded csvCommand: load_file ./data/census/ri_city_town_income.csvOutput: successfully loaded csv'
//   );
// });
