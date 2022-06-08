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
// https://api.npoint.io/44c1c313d40c0811ad19?fbclid=IwAR0Soc4b2H9q4hysAcZHt5CXQ-ysYvYLHpg7vZiY0oWGqo9L5HRhTBeVB9s
serverRequest('https://jsonplaceholder.typicode.com/posts', function(data){
    printPosts(data)
});

function printPosts(data) {
    data.slice(0,4).forEach(element => {
        createPosts(element);             
    });
}

// post.setAttribute('data-id', item.id-1); setatributes ყველას დავუწერე -1
// this function brings posts from server, get id and title
function createPosts(item){
    let post = document.createElement('div');
    post.classList.add('post-div');
    post.setAttribute('data-id', item.id);
       
    let postTitle = document.createElement('h2');
    postTitle.classList.add('h2-title');
    postTitle.textContent =  item.id;

    // დაპრინტულ პოსტებზე გამოვაჩინე IMG 
    // let postIMG = document.createElement('img');
    // postIMG.classList.add('img-post');
    // postIMG.setAttribute('src',item.image);

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
    // postIMG.addEventListener('click', onTextClick); 

    post.appendChild(postTitle);
    // post.appendChild(postIMG);
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
}
// დავამატე  postCardInfo(data[id]);
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
    // let postImage = document.createElement('img');
    // postImage.classList.add('post-img');
    // postImage.setAttribute('src', item.image);
 
    postContent.appendChild(titlePost);
    postContent.appendChild(descriptionPost);
    // postContent.appendChild(postImage);
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

// იმეილის  მეორე ვალიდაცია

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