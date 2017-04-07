import { PrimengTest1Page } from './app.po';

describe('primeng-test1 App', () => {
  let page: PrimengTest1Page;

  beforeEach(() => {
    page = new PrimengTest1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
