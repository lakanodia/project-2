let accordion = document.querySelectorAll('.accordion-div');
for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active');
    })
}

new TradingView.widget(
    {
    "width":300,
    "height":300,
    "symbol": "NASDAQ:AAPL",
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "Dark",
    "style": "3",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "container_id": "tradingview-apple"
  }
);

new TradingView.widget(
    {
    "width":300,
    "height":300,
    "symbol": "NASDAQ:TSLA",
    "theme": "Dark",
    "style": "3",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "container_id": "tradingview-tesla"
    }
);

new TradingView.widget(
    {
    "width":300,
    "height":300,
    "symbol": "NASDAQ:NFLX",
    "theme": "Dark",
    "style": "3",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "container_id": "tradingview-netflix"
    }
);

// Added slider, make slider array
let data = [
    {
        id: 1,
        imageUrl: 'https://miro.medium.com/max/1400/0*GzRmM1GCThs5gCqN',
        title: '',
        url:''
    },
    {
        id: 2,
        imageUrl: 'https://knowtechie.com/wp-content/uploads/2022/01/bored-ape-nfts.jpg',
        title: '',
        url:''
    },
    {
        id: 3,
        imageUrl: 'https://miro.medium.com/max/1400/0*XNFEU31_m4UnsjdA.jpg',
        title: '',
        url:''
    },
    
    {
        id: 4,
        imageUrl: 'https://miro.medium.com/max/1400/0*GzRmM1GCThs5gCqN',
        title: '',
        url:''
    },
    {
        id: 5,
        imageUrl: 'https://miro.medium.com/max/1400/0*vIroQBvXRANRy_u2.jpg',
        title: '',
        url:''
    },
    ];

let rightArrow = document.getElementById('right-arrow');
let leftArrow = document.getElementById('left-arrow');
let sliderContent = document.getElementById('slider-content');
let dotList = document.getElementsByClassName('dot');

let sliderIndex = 0;

// create a tag to append slider title
function createAtag(item){
    let aTag = document.createElement('a');
    aTag.setAttribute('target', '_blank');
    aTag.setAttribute('href', item.url);
    aTag.classList.add('a-link');

    return aTag;
}

// create background image tag
function createImgTag(item){
    sliderContent.style.backgroundImage = 'url(' + item.imageUrl + ')';
    sliderContent.style.backgroundRepeat = "no-repeat";
    sliderContent.style.backgroundSize = "cover";
}

// create slider title tag
function createH2Tag(item){
    let h2Tag = document.createElement('h2');
    h2Tag.classList.add('h2-link');
    h2Tag.append(item.title);
    
    return h2Tag;
}

// this function will create as many dots as there are slides
// And when we press the point we have to move it to the corresponding slide
function createDots(){
    let dots = document.createElement('div');
    dots.classList.add('dots');

    data.forEach(element => {
        let dot = document.createElement('div');
        dot.setAttribute('data-id', element.id-1);
        dot.classList.add('dot');

        dot.onclick = function(event){
            let id = event.target.getAttribute('data-id');
            sliderIndex = id;
            setSlider();
        }
        dots.appendChild(dot);
    });
    return dots;
}

// create active dots on slider
function activeDot(){
    dotList[sliderIndex].classList.add('active');
}
// create slider content and aooend all elements
function setSlider(){
    sliderContent.innerHTML = '';
    createImgTag(data[sliderIndex]);
    let tagA = createAtag(data[sliderIndex]);
    let tagH2 = createH2Tag(data[sliderIndex]);
    let dotsDiv = createDots();

    tagA.appendChild(tagH2);
    sliderContent.appendChild(tagA);
    sliderContent.appendChild(dotsDiv);
    activeDot();
}

// arrow
function rightArrowClick(){
    if(sliderIndex >= data.length-1){
        sliderIndex = 0;
        setSlider();
        return;
    }
    sliderIndex++;
    setSlider();
}

// arrow
function leftArrowClick(){
    if(sliderIndex <= 0){
        sliderIndex = data.length-1;
        setSlider();
        return;
    }
    sliderIndex--;
    setSlider();
}
leftArrow.addEventListener('click', leftArrowClick);
rightArrow.addEventListener('click', rightArrowClick);

setInterval(() => {
    rightArrowClick();
}, 4000);

setSlider();



// http request server link

let mainPostBlock = document.getElementById('main-post-block');
let postContent = document.getElementById('post-content');
let postCard = document.getElementById('post-card');
let postClose = document.getElementById('close');

function serverRequest(url,callBack){
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
        let data = JSON.parse(request.responseText);
        callBack(data);
    })
    request.send();
};

serverRequest('https://jsonplaceholder.typicode.com/posts', function(data){
    printPosts(data)
});

function printPosts(data) {
    data.slice(0,4).forEach(element => {
        createPosts(element);             
    });
}

// this function brings posts from server, get id and title
function createPosts(item){
    let post = document.createElement('div');
    post.classList.add('post-div');
    post.setAttribute('data-id', item.id);
       
    let postTitle = document.createElement('h2');
    postTitle.classList.add('h2-title');
    postTitle.textContent =  item.id;

    let postElement = document.createElement('h3');
    postElement.classList.add('title');
    postElement.textContent =  item.title;

    let postviewButton = document.createElement('button');
    postviewButton.classList.add('view-post');
    postviewButton.textContent = 'View Post';
    postviewButton.setAttribute('data-id', item.id);

    post.addEventListener('click', function(event){
        postContent.innerHTML = '';
        let id = event.target.getAttribute('data-id');
        openPostCard(id);
        
    });
    postTitle.addEventListener('click', onTextClick); 
    postElement.addEventListener('click', onTextClick); 


    post.appendChild(postTitle);

    post.appendChild(postElement);
    post.appendChild(postviewButton);

    mainPostBlock.appendChild(post);
}
// this function opens the post by clicking anywhere
function onTextClick(event) {
    event.stopPropagation();
    postContent.innerHTML = '';
    let id = event.target.parentElement.getAttribute('data-id');
    openPostCard(id);
};
// this function opens the specific post that I select
function openPostCard(id){
    postCard.classList.add('active-post');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    serverRequest(url, function(data){
        // console.log(data[id]);
        postCardInfo(data);
    });
}
// this function shows what should appear when a post will open
function postCardInfo(item){
    let titlePost = document.createElement('h2');
    titlePost.classList.add('post-title');
    titlePost.innerHTML = item.title;

    let descriptionPost = document.createElement('p');
    descriptionPost.classList.add('post-description');
    descriptionPost.innerHTML = item.body;
// დავამატე სურათის ტეგი
 
    postContent.appendChild(titlePost);
    postContent.appendChild(descriptionPost);
    postCard.appendChild(postContent);

    postClose.addEventListener('click', function(){
        postCard.classList.remove('active-post');
        postContent.innerHTML = '';
    });
}


// form Validation

document.getElementById('mainForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let errors = {};
    let form = event.target;

    // ვალიდაცია სახელზე

    let yourName = document.getElementById('yourName').value;
    if(yourName== ''){
        errors.yourName = 'Name can not be empty';
    } 

    // ვალიდაცია გვარზე

    let yourSurname = document.getElementById('yourSurname').value;
    if(yourSurname== ''){
        errors.yourSurname = 'Surname can not be empty';
    } 
  
    //  ვალიდაცია meilze

    let email = document.getElementById('email').value;
    if(email== ''){
        errors.email = 'Email can not be empty';
    }

    //  ვალიდაცია პაროლებზე

    form.querySelectorAll('.error-text').forEach(item => {
        item.innerHTML = '';
    });

    let password = document.querySelector('[name="password"]').value;
    let password1 = document.querySelector('[name="password1"]').value;

    if (password!=='' && password!==password1){
        errors.password1 = 'Your Password do not match';
        errors.password = 'Your Password do not match';
    }
    if(password==''){
        errors.password1 = 'Password can not be empty';
        errors.password = 'Password can not be empty';
}
    for(let item in errors){
        let errorSpan = document.getElementById('error_' + item);
        if (errorSpan) {
            errorSpan.textContent = errors[item];  
        }
    }

    if (Object.keys(errors).length == 0) {
        form.submit();
    }
});

// ვალიდაცია პაროლებზე
let passwordShow = document.getElementById('password');
let toggleIcon = document.getElementById('toggleIcon');

function showHidePassword() {
    if(passwordShow.type == "password"){
        passwordShow.setAttribute('type', 'text');
        toggleIcon.classList.add('fa-eye-slash');
    }else{
        passwordShow.setAttribute('type', 'password');
        toggleIcon.classList.remove('fa-eye-slash');
    }   
}

toggleIcon.addEventListener('click', showHidePassword);

// იმეილის მეორე ვალიდაცია

function validation() {
    let emailText = document.getElementById('email').value;
    let spanText = document.getElementById('error_email'); 
    let emailStructure = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailText.match(emailStructure)){
        spanText.innerHTML = 'Your email is valid';
        spanText.style.color = 'chartreuse';
    }else{
        spanText.innerHTML = 'Your email is not valid';
        spanText.style.color = 'red';
    }
}


// burger bar
let navigation = document.getElementById('nav-block');
let burgerButton = document.getElementById('burger-bar');
let topChild = document.getElementById('top-child');
let middleChild = document.getElementById('middle-child');
let bottomChild = document.getElementById('bottom-child');

burgerButton.addEventListener('click', function(){
    navigation.classList.toggle('activeNavigation');
    topChild.classList.toggle('top');
    middleChild.classList.toggle('middle');
    bottomChild.classList.toggle('bottom');
});


// This is current date on footer
function currentDate(){
    var today = new Date(); 
    var date = document.getElementById('current-date');
    date.innerHTML = today;
}
currentDate();



// Coin live prices


var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var doge = document.getElementById("dogecoin");
var lite = document.getElementById("litecoin");
var solana = document.getElementById("solana");
var stellar = document.getElementById("stellar");

let settings = {
    "async" : true,
    "scrossDomain": true,
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Clitecoin%2Csolana%2Cdogecoin%2Cstellar&vs_currencies=usd",
    "method": "GET",
    "headers": {}
}
$.ajax(settings).done(function(response){
    btc.innerHTML = Math.round(response.bitcoin.usd);
    eth.innerHTML = Math.round( response.ethereum.usd);
    lite.innerHTML = Math.round(response.litecoin.usd);
    solana.innerHTML = Math.round( response.solana.usd);
    stellar.innerHTML = response.stellar.usd;
    doge.innerHTML = response.dogecoin.usd;
});

// Charts pie chart

var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = [
  "#2bfa24",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("myChartDonut", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Market Capitalization by country 2022"
    }
  }
});


var zValues = [50,60,70,80,90,140,300];
var kValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
  type: "line",
  data: {
    labels: zValues,
    datasets: [{
      fill: true,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: kValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:10}}],
    }
  }
});


var tValues = [100,200,300,400,500,600,700,800,900,1000];

new Chart("myChartTwo", {
  type: "line",
  data: {
    labels: tValues,
    datasets: [{ 
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
      borderColor: "red",
      fill: false
    }, { 
      data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
      borderColor: "green",
      fill: false
    }, { 
      data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});



var aValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var bValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChartThree", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});




// პორთფოლიოს დამატების შესაძლებლობა
let serviceFromBlock =document.querySelector('#portfolio-form-block');
let addServiceForm = document.querySelector('#add-portfolio-icon');
let closeForm = document.querySelector('#close-form');
let closePortfolioButton = document.querySelector('#close-portfolio-button');
let saveServiceButton = document.querySelector('#save-service-button');
let servicesBlock = document.querySelector('#portfolio-block');

let titleInput = document.querySelector('#portfolio-item-title');
let titleInput2 = document.querySelector('#portfolio-item-title2');
let titleInput3 = document.querySelector('#portfolio-item-title3');
let descriptionInput = document.querySelector('#service-description');
let imgInput = document.querySelector('#img-input');

addServiceForm.addEventListener('click', function(){
    serviceFromBlock.classList.add('active-post'); 
});

closeForm.addEventListener('click', function(event){
    event.preventDefault();
    resetForm();
    serviceFromBlock.classList.remove('active-post');
});
closePortfolioButton.addEventListener('click', function(event){
    event.preventDefault();
    resetForm();
    serviceFromBlock.classList.remove('active-post');
});

let deleteServiceButton1 = document.querySelector('#static-delete-button-1');
deleteServiceButton1.addEventListener('click', function(){
    document.querySelector('#portfolio-div-1').remove();
});

let deleteServiceButton2 = document.querySelector('#static-delete-button-2');
deleteServiceButton2.addEventListener('click', function(){
    document.querySelector('#portfolio-div-2').remove();
});

function addNewPost(){
    let serviceDivElement = document.createElement('div');
    serviceDivElement.classList.add('portfolio-div');

    //add image on img tag
    let serviceImage = document.createElement('img');
    serviceImage.classList.add('portfolio-img');
    serviceImage.setAttribute('src', `img/${imgInput.files[0].name}`);
  
    //add filled title on h2 tag
    let portfolioTitle = document.createElement('h2');
    portfolioTitle.classList.add('portfolio-item-title');
    portfolioTitle.textContent = titleInput.value;

    let portfolioTitle2 = document.createElement('h2');
    portfolioTitle2.classList.add('portfolio-item-title');
    portfolioTitle2.textContent = titleInput2.value;


    let portfolioTitle3 = document.createElement('h2');
    portfolioTitle3.classList.add('portfolio-item-title');
    portfolioTitle3.textContent = titleInput3.value;

    //add filled description on p tag
    let portfolioDescription = document.createElement('p');
    portfolioDescription.classList.add('portfolio-describe');
    portfolioDescription.textContent = descriptionInput.value;
    
    // add delete button on service card
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-portfolio-button');
    deleteButton.textContent = 'Delete Service';
    deleteButton.addEventListener('click', function(){
        serviceDivElement.remove();
    })

    serviceDivElement.appendChild(serviceImage);
    serviceDivElement.appendChild(portfolioTitle);
    serviceDivElement.appendChild(portfolioTitle2);
    serviceDivElement.appendChild(portfolioTitle3);
    serviceDivElement.appendChild(portfolioDescription);
    serviceDivElement.appendChild(deleteButton);
    servicesBlock.appendChild(serviceDivElement);
    
    // after filling a form it would clear automatically
    resetForm();
    serviceFromBlock.classList.remove('active-post'); 
}
// this function resets a form
function resetForm() {
    titleInput.value = '';
    titleInput2.value = '';
    titleInput3.value = '';
    descriptionInput.value = '';
    imgInput.value = '';
    resetErrors();
}

// this function validates form
function validateForm() {
    let errors = {};
     // validation in the name of the service is a maximum of 25 characters
    let portfolioTitle = document.querySelector('#portfolio-item-title').value;
    if (portfolioTitle.length>25 || portfolioTitle==''){
        errors.portfolioTitle = 'Title can not be empty and can not be more than 25 symbols';
    }
    
    // validation in the name of the service is a maximum of 25 characters
    let portfolioTitle2 = document.querySelector('#portfolio-item-title2').value;
    if (portfolioTitle2.length>25 || portfolioTitle2==''){
        errors.portfolioTitle2 = 'Title can not be empty and can not be more than 25 symbols';
    }

    // validation in the name of the service is a maximum of 25 characters
    let portfolioTitle3 = document.querySelector('#portfolio-item-title3').value;
    if (portfolioTitle3.length>25 || portfolioTitle3==''){
        errors.portfolioTitle3 = 'Title can not be empty and can not be more than 25 symbols';
    }

    // validation service description maximum  100 symbols  
    let serviceDescription = document.querySelector('#service-description').value;
    if (serviceDescription.length>100 || serviceDescription==''){
        errors.serviceDescription = 'Description can not be empty and can not be more than 100 symbols';
    }

    // validation on image size, image type and empty image input
    let files = imgInput.files;
    if (files.length > 0) {
        let fileType = files[0].type;
        let fileSize = files[0].size;

        let maxFileSizeMb = 1000 * 1024;
        let supportedFileTypes = ['image/png','image/jpeg'];

        if(!supportedFileTypes.includes(fileType)){
            errors.myfile = 'Please select only jpg or png file type';
        }

        if (fileSize > maxFileSizeMb) {
            errors.myfile = 'Please select image size less than 1 MB';
        }
    }else{
        errors.myfile = 'Please select image';
    }
    return errors;
};

document.querySelector('#service-form').addEventListener('submit', onServiceFormSubmit);

// this function valisate form and if there are no mistakes adds it, after this reset error spans
function onServiceFormSubmit(event){
    event.preventDefault();
    let errors = validateForm();

    resetErrors();

    if(Object.keys(errors).length == 0){
        addNewPost();
    }else{
        displayErrors(errors);
    }
}

// this function resets error span texts after opening a service form
function resetErrors() {
    document.querySelectorAll('.span-error').forEach(item => {
        item.innerHTML = '';
    });
}

// this function collerct error texts
function displayErrors(errors) {
    for (let item in errors) {
        let errorSpan = document.getElementById('error_' + item);
        if (errorSpan) {
            errorSpan.textContent = errors[item];

        }
    }
}









