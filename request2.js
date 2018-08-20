
var rp = require('request-promise');
var cheerio = require('cheerio'); 
let url =  "http://www.asos.com/api/product/catalogue/v2/stockprice?productIds=4756241&currency=SEK&keyStoreDataversion=7jhdf34h-6&store=ROE";


let priceOptions = {
  url:url, 
  json:true, 
  headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
  }
}

let nameOptions = {
  uri: 'http://www.asos.com/nike/nike-air-force-1-07-trainers-in-black-315122-001/prd/4756241?clr=black&SearchQuery=4756241&SearchRedirect=true',
  headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
  },
  transform: function(body) {
      return cheerio.load(body);
  }
}


let respone; 
async function getAllData (){
    response = await rp(nameOptions)

  try {
      $ =>  {
        console.log($('.product-hero h1').text());
    
      }
      return response; 
    } catch (err) {
        console.log(err);
      }

      getAllData(); 
      
    }



rp(priceOptions)
  .then(function  (data) {
    let globalData = data[0].productPrice.current.value;
    console.log(globalData);
  })
  .catch(function (err) {
    console.log(err);
  })

  

