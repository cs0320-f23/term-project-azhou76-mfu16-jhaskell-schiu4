describe('My Playwright Test', () => {
    beforeAll(async () => {
    await page.goto('https://example.com');
    });

    it('should have the correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Example Domain');
    });

    it('should have a visible header', async () => {
    const header = await page.isVisible('h1');
    expect(header).toBe(true);
    });
});