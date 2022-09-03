const puppeteer = require('puppeteer');
// Requiring the module
const reader = require('xlsx')
// Reading our test file
const file = reader.readFile('ContactRikai.xlsx') 
const sheets = file.SheetNames
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
   let j = 1;
   temp.forEach((res) => {
      // Printing data
      console.log(res['contact_url']);
      (async () => {
        const browser = await puppeteer.launch({
          headless: false, // フルバージョンのChromeを使用
          slowMo: 300      // 何が起こっているかを分かりやすくするため遅延
        });
       
        const page = await browser.newPage();
        await page.goto(res['contact_url']);
        await page.screenshot({path: j+'example.png'});
        await browser.close();
        j++;
      })();   
   })
}
  

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // フルバージョンのChromeを使用
    slowMo: 300      // 何が起こっているかを分かりやすくするため遅延
  });
 
  const page = await browser.newPage();
  await page.goto('https://www.npmjs.com/package/puppeteer');
  await page.screenshot({path: 'example.png'});
  
  await browser.close();
})();   