const puppeteer = require('puppeteer');


async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});

    var container = await page.evaluate(() => {
        var titleNodeList = document.querySelectorAll(`.shop-sku-list-item`);
        var priceNodeList = document.querySelectorAll(`.priceView-hero-price`);
        var promoNodeList = document.querySelectorAll(`.c-ratings-reviews`);
        var imgNodeList = document.querySelectorAll(`.product-image`);
        var hrefNodeList = document.querySelectorAll(`.sku-title`);

        var titleLinkArray = [];
        var id = 0;
        if (promoNodeList.length == titleNodeList.length) {
            try{
                for (var i=0; i< titleNodeList.length; i++){
                    titleLinkArray[i] = {
                        id: 0,
                        website: "BestBuy",
                        store_type: "online",
                        title: titleNodeList[i].innerHTML.trim(),
                        price: priceNodeList[i].innerHTML.trim().slice(26),
                        promo: promoNodeList[i].innerHTML.trim(),
                        image: imgNodeList[i].getAttribute("src"),
                        href: "https://www.bestbuy.com"+hrefNodeList[i].getAttribute("href"),
                        rating: 3
                    };
                }
            }
            catch {
                titleLinkArray = [];
            }
        }
        else{
            try{
                for (var i=0; i< titleNodeList.length; i++){
                    titleLinkArray[i] = {
                        id: 0,
                        website: "BestBuy",
                        store_type: "online",
                        title: titleNodeList[i].innerHTML.trim(),
                        price: priceNodeList[i].innerHTML.trim().slice(26),
                        image: imgNodeList[i].getAttribute("src"),
                        href: "https://www.bestbuy.com"+hrefNodeList[i].getAttribute("href"),
                        rating: 3
                    };
                }
            }
            catch {
                titleLinkArray = [];
            }
        }
        return titleLinkArray;
    });
    await browser.close();
    return container;
}

var BestBuy = async function (details) {
    details = details.trim();
    w_space = / /gi;
    details = details.replace(w_space,'%20');
    new_url = 'https://www.bestbuy.com/site/searchpage.jsp?st=' + details ;
    //console.log(new_url);
    var result = await scrapeProduct(new_url);
    return result;
}

module.exports ={
    BestBuy
}

