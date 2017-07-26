import { BaseAppPage } from './app.po';

describe('base-app App', () => {
  let page: BaseAppPage;

  beforeEach(() => {
    page = new BaseAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
