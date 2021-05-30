describe('Testing Focus Items ', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5502/mvp/index.html');
      await page.waitForTimeout(1000);
    });
  
    it('Test1: Initial Modal Hidden', async () => {
      const status = await page.$eval('#focus_modal', (entries) => {
          return entries.style.display;
      });
      expect(status).toBe("none");
    });

    it('Test2: Pressing Add New Focus Item Prompts Modal View', async () => {
        await page.click('#focus_button');
        const status = await page.$eval('#focus_modal', (entries) => {
            return entries.style.display;
        });
        expect(status).toBe("block");
    });

    it('Test3: Modal Go Back click - Modal Hidden', async() => {
        await page.click('#focus_modal_cancel');
        const status = await page.$eval('#focus_modal', (entries) => {
            return entries.style.display;
        });
        expect(status).toBe("none");
    });

    it('Test4: Compare Focus Item Count', async() => {
        const count = await page.$eval("#focus_completed_number", (c) => {
            return parseInt(c.innerHTML);
        })

        const count2 = await page.$$eval('img', (entries) => {
            var count3 = 0;
            for(i = 0; i < entries.length; i++)
            {
                if(entries[i].src.includes("images/tick.png"))
                count3++
            }
            return count3
        });
        expect(count2).toBe(count);
    });

    it('Test5: Uncheck Item and Compare Focus Item Count', async() => {
        await page.click('.done_image');
        const count = await page.$eval("#focus_completed_number", (c) => {
            return parseInt(c.innerHTML);
        })

        const count2 = await page.$$eval('img', (entries) => {
            var count3 = 0;
            for(i = 0; i < entries.length; i++)
            {
                if(entries[i].src.includes("images/tick.png"))
                count3++
            }
            return count3
        });
        expect(count2).toBe(count);
    });

    /* it('Test4: Create Button Adds Item to Display', async() => {
        
    });

    it('Test5: Checking Off Item Increments Focus Items Completed Counter', async() => {

    });

    it('Test6: Unchecking Decrements Counter', async() => {

    });

    it('Test7: Edit Button Opens Modal View', async() => {

    }); */
   


//Cards

//Daily View

//Weekly View

});

