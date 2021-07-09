/* eslint-disable no-undef */
describe('Your Expense Manager App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('appIntro'))).toBeVisible();
  });

  it('should scroll to next page on Next button click', async () => {
    await expect(element(by.text('Track Your Spending'))).toBeVisible();
    await expect(element(by.text('Next'))).toBeVisible();
    await element(by.text('Next')).tap();

    await expect(element(by.text('On The Go'))).toBeVisible();
    await expect(element(by.text('Next'))).toBeVisible();
    await element(by.text('Next')).tap();

    await expect(element(by.text('All Your Accounts'))).toBeVisible();
    await expect(element(by.text('Next'))).toBeVisible();
    await element(by.text('Next')).tap();

    await expect(element(by.text('Plan Ahead'))).toBeVisible();
    await expect(element(by.text('Next'))).toBeVisible();
    await element(by.text('Next')).tap();

    await expect(element(by.text('Get Your Expense Report'))).toBeVisible();
    await expect(element(by.text('Done'))).toBeVisible();
    await element(by.text('Done')).tap();
  });

  it('should have overview page', async () => {
    await expect(element(by.text('Your Balance'))).toBeVisible();
  });

  // ---------- RECORD PAGE -------------

  it('should be able to create new record from overview page', async () => {
    await element(by.id('addNewRecord')).tap();

    await element(by.id('incomeHeader')).tap();
    await element(by.id('transferHeader')).tap();
    await element(by.id('expenseHeader')).tap();

    await element(by.id('recordAmount')).typeText('100');
    await element(by.id('recordDescription')).typeText('Grocery');
    await element(by.id('recordDescription')).tapReturnKey();

    await element(by.id('recordSelectCategory')).tap();
    await element(by.text('Phone')).atIndex(0).tap();

    await element(by.id('add')).tap();
  });

  // ---------- TRANSACTION PAGE -------------
  it('should be able to view transactions page', async () => {
    await element(by.id('viewAll')).tap();

    await element(by.text('Phone')).atIndex(0).tap();

    await element(by.id('recordAmount')).replaceText('10');
    await element(by.id('recordDescription')).replaceText('Grocery1');
    await element(by.id('recordDescription')).tapReturnKey();

    await element(by.id('edit')).tap();

    await element(by.text('Phone')).atIndex(0).tap();
    await element(by.id('delete')).tap();

    await element(by.text('Overview')).atIndex(0).tap();
  });

  // ---------- CATEGORY PAGE -------------

  // Enter Category
  it('should be able to create category from overview page', async () => {
    await expect(element(by.id('addCategory'))).toBeVisible();
    await element(by.id('addCategory')).tap();

    await element(by.id('incomeHeader')).tap();
    await element(by.id('transferHeader')).tap();
    await element(by.id('expenseHeader')).tap();

    await expect(element(by.id('categoryPageFab'))).toBeVisible();
    await element(by.id('categoryPageFab')).tap();
  });

  // Add Category
  it('should be able to  add category', async () => {
    await element(by.id('categoryName')).typeText('Cat 1');
    await element(by.id('add')).tap();
  });

  // Edit Category
  it('should be able to edit category', async () => {
    await element(by.text('Cat 1')).atIndex(1).tap();

    await element(by.id('categoryName')).replaceText('Cat');
    await element(by.id('categoryName')).tapReturnKey();

    await element(by.id('categoryIcon')).tap();
    await element(by.text('phone')).tap();
    await element(by.id('edit')).tap();
  });

  // Delete Category
  it('should be able to delete category', async () => {
    await element(by.text('Cat')).atIndex(1).tap();
    await element(by.id('categoryName')).tapReturnKey();
    await element(by.id('delete')).tap();
  });

  // Exit Category
  it('should be able exit category page', async () => {
    await element(by.text('Overview')).atIndex(0).tap();
  });

  // ---------- ACCOUNT PAGE -------------

  // Enter Account
  it('should be able to create account from overview page', async () => {
    await expect(element(by.id('addaccount'))).toBeVisible();
    await element(by.id('addaccount')).tap();

    await expect(element(by.id('accountPageFab'))).toBeVisible();
    await element(by.id('accountPageFab')).tap();
  });

  // Add Account
  it('should be able to  add account', async () => {
    await element(by.id('accountName')).typeText('My Bank 1');
    await element(by.id('openingBalance')).typeText('10000');
    await element(by.id('openingBalance')).tapReturnKey();
    await element(by.id('icon')).tap();
    await element(by.text('home')).tap();
    await element(by.id('add')).tap();
  });

  // Edit Account
  it('should be able to edit account', async () => {
    await element(by.text('My Bank 1')).atIndex(1).tap();

    await element(by.id('accountName')).replaceText('My Bank');
    await element(by.id('openingBalance')).replaceText('1000');
    await element(by.id('openingBalance')).tapReturnKey();
    await element(by.id('icon')).tap();
    await element(by.text('phone')).tap();
    await element(by.id('edit')).tap();
  });

  // Delete Account
  it('should be able to delete account', async () => {
    await element(by.text('My Bank')).atIndex(1).tap();
    await element(by.id('accountName')).tapReturnKey();
    await element(by.id('delete')).tap();
  });

  // Exit Account
  it('should be able exit account page', async () => {
    await element(by.text('Overview')).atIndex(0).tap();
  });
});
