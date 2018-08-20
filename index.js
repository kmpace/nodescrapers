const rp = require('request-promise');
const cheerio = require('cheerio'); 
const Table = require('cli-table'); 

let users = [];
let table = new Table({
    head: ['username', '❤️', 'challenges'],
    colWidths: [15, 5, 10]
})

const options = {
    url: `https://forum.freecodecamp.org/directory_items?period=weekly&order=likes_received&_=1528101447131`,
    json: true 

}

rp(options) //rp performs and ajax request on the url, returns a promise 
.then ((data) => {
    let userData = []; 
    for (let user of data.directory_items) {
        userData.push({   //push this data to the array
            name: user.user.username,
            likes_received: user.likes_received
        });
        process.stdout.write('loading');
        getChallengesCompletedAndPushToUserArray(userData);
    }


})

.catch((err) => {
    console.log(err);

}); 

function getChallengesCompletedAndPushToUserArray(userData) { //go throughs each user and makes a request 
    let i = 0;
    function next () {
        if (i < userData.length) {
            let options = {
                url: `https://www.freecodecamp.org/` + userData[i].name, //loop over each user in the array 
                transform: body => cheerio.load(body) //using cheerio to load the body of the html file 


            }
                rp(options)
                    .then(function($) {
                        process.stdout.write(`.`);  
                        const fccAccount = $('h1.landing-heading').length == 0; //checking if there is and FCC account available 
                        const challengesPassed = fccAccount ? $('tbody tr').length : 'unknown'; //checking to see if there is an fccacount and if not, return unknown        
                        table.push([userData[i].name, userData[i].likes_received, challengesPassed]);
                        ++i;
                        return next(); //keeping running this funtion until it hits the lengthn 
                    } )
        } else {
            printData(); 
        }
    }
    return next(); 
};

function printData() {
    console.log("✅");
    console.log(table.toString()); 
}
