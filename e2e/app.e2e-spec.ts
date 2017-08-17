import { DynamicFormsPage } from './app.po';

describe('dynamic-forms App', () => {
  let page: DynamicFormsPage;

  beforeEach(() => {
    page = new DynamicFormsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
