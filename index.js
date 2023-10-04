const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require ('slugify'); 
const replaceTemplate = require('./modules/replaceTemplate');
const superagent = require('superagent');


//////////////////////// about the file system
//blocking and synchronous code
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut =`This is the plan for node:${textIn}.\n created on ${Date.now()}` ;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written!');

//non-blocking and asynchronous code

// fs.readFile('./txt/start.txt', 'utf-8' , (err, data1) =>{
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8' , (err, data2) =>{
//     console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8' , (err, data3) =>{
//         console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}./n ${data3}` , 'utf-8', err =>{
//             console.log('ur file was written');
//             });
//         });
//     });
// });
// console.log('will read file');

//////////////////////// about the server 
const tempOverview = fs.readFileSync(`./templates/template-overview.html` , 'utf-8' );
const tempCard = fs.readFileSync(`./templates/template-card.html` , 'utf-8' );
const tempProduct = fs.readFileSync(`./templates/template-product.html` , 'utf-8' );

const data = fs.readFileSync(`./dev-data/data.json` , 'utf-8' );
    const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName , {lower: true}));
console.log(slugs);

const server = http.createServer((req,res) => {
    const pathname = req.url ;
///////////////////////////OVERVIEW
    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'Content-type': 'text/html'
          });
      
          const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
          const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
          res.end(output);
        
///////////////////PRODUCT
} else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
/////////////////////API
    }else if (pathname === '/api'){
        // console.log(dataObj);
        res.end(data);
    }
//////////////////PAGE NOT FOUND
    else {
        res.end('page not found');
    }   
});
server.listen(8000, '127.0.0.1',() => {
    console.log('this is the server');
});
////////////////////////////////////////////////////////////////////
///////////////////Asynchronous JS

const readFilePro = file => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) reject('I could not find that file 😢');
        resolve(data);
      });
    });
  };
  
  const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, err => {
        if (err) reject('Could not write file 😢');
        resolve('success');
      });
    });
  };

//////////////////Using Async/Await function 

const getDogPic = async () =>{
    try {
        const data = await readFilePro(`${__dirname}/txt/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro =  superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro =  superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro =  superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Pro,res2Pro,res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('./txt/dog-img.txt' , imgs.join('\n'));
        console.log('Random Dog Picture');
    } catch (err){
        console.log(err);

        throw err;
    }
    return '2: Ready to get pics';
};

(async ()=>{
    try {
        console.log('1, Will get dog pics');
        const x = await getDogPic();
        console.log(x);
        console.log('3, Done getting dog pics');
    }catch (err){
        console.log('ERROR_____');
    }
})();




// readFilePro(`${__dirname}/txt/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     }).then(res => {
//          console.log (res.body.message);
//         return writeFilePro('./txt/dog-img.txt' , res.body.message );
//     }).then(()=>{
//             console.log('Random Dog Picture');
//     }).catch (err =>{
//         console.log(err.message);
//     });
    

