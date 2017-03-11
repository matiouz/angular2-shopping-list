import { AngularListPage } from './app.po';

describe('angular-list App', () => {
  let page: AngularListPage;

  beforeEach(() => {
    page = new AngularListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
