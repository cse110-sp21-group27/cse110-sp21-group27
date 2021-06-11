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
      });

      const count2 = await page.$$eval('img', (entries) => {
          var count3 = 0;
          for(i = 0; i < entries.length; i++);
          {
              if(entries[i].src.includes("images/tick.png"))
              count3++;
          }
          return count3;
      });
      expect(count2).toBe(count);
  });

  it('Test5: Uncheck Item and Compare Focus Item Count', async() => {
      await page.click('.done_image');
      const count = await page.$eval("#focus_completed_number", (c) => {
          return parseInt(c.innerHTML);
      });

      const count2 = await page.$$eval('img', (entries) => {
          var count3 = 0;
          for(i = 0; i < entries.length; i++)
          {
              if(entries[i].src.includes("images/tick.png"))
              count3++;
          }
          return count3;
      });
      expect(count2).toBe(count);
  });

  it('Test6: Add Element Verify', async () => {

      var numEntries = await page.$$eval('.focus_single_item', (entries) => {
        return entries.length;
      });

      await page.click('#focus_button');
      const status = await page.$eval('#focus_modal', (entries) => {
          return entries.style.display;
      });
      expect(status).toBe("block");

      await page.$eval("#focus_modal #inp1", el => el.value = "XYZ");
      await page.$eval("#focus_modal #inp2", el => el.value = "Health");
      await page.$eval("#focus_modal #inp3", el => el.value = "50");
      await page.$eval("#focus_modal #startCalendar", el => el.value = "2021-05-20");
      await page.$eval("#focus_modal #endCalendar", el => el.value = "2021-05-21");

      await page.evaluate(()=>document.querySelector('input[value=Create]').click());
      
      var numEntries2 = await page.$$eval('.focus_single_item', (e) => {
        return e.length;
      });
      expect(numEntries2).toBe(numEntries+1);
    });

    it('Test7: Edit Element Verify', async () => {

    
      await page.click('#edit0');
  
      await page.$eval("#focus_modal #inp1", el => el.value = "XYZA");
      await page.$eval("#focus_modal #inp2", el => el.value = "Health");
      await page.$eval("#focus_modal #inp3", el => el.value = "50");
      await page.$eval("#focus_modal #startCalendar", el => el.value = "2021-05-20");
      await page.$eval("#focus_modal #endCalendar", el => el.value = "2021-05-21");

      await page.evaluate(()=>document.querySelector('input[value=Create]').click());
            
      const text = await page.$eval("#name0", (c) => {
        return c.innerHTML;
     });
      expect(text).toBe("XYZA");
    });

    it('Test8: Add Element Reject - Start date Greater Than End Date', async () => {
      jest.setTimeout(1000);

      var numEntries = await page.$$eval('.focus_single_item', (entries) => {
        return entries.length;
      });

      await page.click('#focus_button');
      const status = await page.$eval('#focus_modal', (entries) => {
          return entries.style.display;
      });
      expect(status).toBe("block");

      await page.$eval("#focus_modal #inp1", el => el.value = "XYZ");
      await page.$eval("#focus_modal #inp2", el => el.value = "Health");
      await page.$eval("#focus_modal #inp3", el => el.value = "50");
      await page.$eval("#focus_modal #startCalendar", el => el.value = "2021-05-20");
      await page.$eval("#focus_modal #endCalendar", el => el.value = "2021-05-19");

      await page.evaluate(()=>document.querySelector('input[value=Create]').click());

      
      var numEntries2 = await page.$$eval('.focus_single_item', (e) => {
        return e.length;
      });
      expect(numEntries2).toBe(numEntries);
    });

 


//Cards
describe('Testing Focus Items ', () => {
beforeAll(async () => {
  await page.goto('http://127.0.0.1:5502/mvp/index.html');
  await page.waitForTimeout(1000);
});
it('Test9: Add Card Verify', async () => {
  let oldCardsHolder = window.getElementById("cards_list");
  let numCards = oldCardsHolder.childNodes.length;
  await page.click("#cards_button");
  let newCardsHolder = window.getElementById("cards_list");
  let numCards2 = newCardsHolder.childNodes.length;
  expect(numCards2).toBe(numCards + 1);
});
it('Test10: Change Color Verify', async () => {
  let cardsHolder = window.getElementById("cards_list");
  let firstCard = cardsHolder.childNodes[0];
  let selectMenu = firstCard.childNodes[1];
  await selectMenu.click();
  await selectMenu.childNodes[2].click();
  expect(firstCard.style.background).toBe("lightcoral");
});
it('Test11: Edit Card Text', async () => {
  let cardsHolder = window.getElementById("cards_list");
  let firstCard = cardsHolder.childNodes[0];
  let firstText = firstCard.childNodes[3];
  let testString = "Change to this";
  firstText.click();
  await page.keyboard.type(testString);
  expect(firstText.value).toBe(testString);
});
it('Test12: Remove Card Verify', async () => {
  let cardsHolder = window.getElementById("cards_list");
  let oldNumCards = cardHolder.childNodes.length;
  let firstCard = cardsHolder.childNodes[0];
  let cardRemove = firstCard.childNodes[2];
  cardRemove.click();
  let newCardsHolder = window.getElementById("cards_list");
  let newNumCards = newCardsHolder.childNodes.length;
  expect(oldNumCards).toBe(newNumCards + 1);
});
});

//Daily View


});


