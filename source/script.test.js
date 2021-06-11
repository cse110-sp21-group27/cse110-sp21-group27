describe('Testing Focus Items ', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/source/index.html');
      await page.waitForTimeout(1000);
      for(i=0 ;i < 10;i++){
        await page.click('#focus_button');
        await page.$eval("#focus_modal #inp1", el => el.value = "XYZ");
        await page.$eval("#focus_modal #inp2", el => el.value = "Health");
        await page.$eval("#focus_modal #inp3", el => el.value = "50");
        await page.$eval("#focus_modal #startCalendar", el => el.value = "2021-05-20");
        await page.$eval("#focus_modal #endCalendar", el => el.value = "2021-05-21");
        await page.evaluate(()=>document.querySelector('#focus_item_create').click());
      }
    });
  
    it('[Middle Part] Test 1: Initial Modal Hidden', async () => {
      const status = await page.$eval('#focus_modal', (entries) => {
          return entries.style.display;
      });
      expect(status).toBe("none");
    });

});