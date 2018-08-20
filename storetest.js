var request = require('request-promise');


(async() => {

const getData = async () => {
    let data; 
    var options = {
        url: 'https://raw.github.com/mikeal/request/master/package.json',
        headers: {
            'User-Agent': 'kmpace'
        }
    };
    try {
    data = await request.get(options);
    }

    catch(e) {
        console.log('Error!', e); 
    }
    return data; 
};

const globalData = await getData();
console.log(globalData[0]);
})(); 
