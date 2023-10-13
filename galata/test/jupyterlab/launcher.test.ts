// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { expect, galata, test } from '@jupyterlab/galata';

test.use({
  autoGoto: false,
  mockState: galata.DEFAULT_DOCUMENTATION_STATE,
  viewport: { height: 720, width: 1280 }
});

test.describe('Dynamic Text Spacing', () => {
  test('should Use Dynamic Text Spacing', async ({ page }) => {
    await page.goto();
    await page.waitForSelector('.jp-LauncherCard-label');

    let element = page.locator('div.jp-LauncherCard-label');
    for (let i = 0; i < (await element.count()); i++) {
      let height = await element
        .nth(i)
        .evaluate(el =>
          window.getComputedStyle(el).getPropertyValue('min-height')
        );

      let expectedValue =
        2.462 *
        parseFloat(
          await element
            .nth(i)
            .evaluate(el =>
              window
                .getComputedStyle(el)
                .getPropertyValue('font-size')
                .toString()
            )
        );

      expect(height).toEqual(expectedValue + 'px');
    }

    const imageName = 'launcher-card-label-height.png';
    expect(await page.screenshot()).toMatchSnapshot(imageName.toLowerCase());
  });
});