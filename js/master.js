// random background option
let backgroundOption = true;
// varibale to control background interval
let backgroundInterval;

// check if there's local storage color option
let mainColors = localStorage.getItem("color-option");
// console.log(mainColors)
if(mainColors !== null) {
    // console.log("not Empty")
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("color-option"));
    // remove active class from all colors list items          
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // add active class on element with data-color === local storage item 
        if(element.dataset.color === mainColors) {
            // add active class
            element.classList.add("active");
        }
    })
}

// check if there's local storage background-option
let mainbackgrounds = localStorage.getItem("background-option");
if(mainbackgrounds !== null) {
    if(mainbackgrounds === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false
    }
    // remove active class from all backgroundImgs          
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
        // add active class on element with data-background === local storage item 
        if(mainbackgrounds === 'true') {
            // add active class
            document.querySelector(".random-backgrounds .yes").classList.add("active");
        } else {
            document.querySelector(".random-backgrounds .no").classList.add("active");
        }
    })
}

// check if there's local storage show bullets option
let navBullet = document.querySelector(".nav-bullets");
let showBulletsOption = localStorage.getItem("showBullets-option");
if(showBulletsOption !== null) {
    // remove active class from all show bullets option          
    document.querySelectorAll(".bullets-option span").forEach(element => {
        element.classList.remove("active");

    })
    if(showBulletsOption === "show") {
        navBullet.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        navBullet.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
///////////////////////

// toggle spen class on icon 
let icon = document.querySelector('.toggle-settings .fa-gear');
let settingsBox = document.querySelector('.settings-box');
icon.addEventListener('click', function () {
    this.classList.toggle('fa-spin');
    settingsBox.classList.toggle('open');
})
///////////////////////

// switch colors
let coList = document.querySelectorAll(".colors-list li");
// loop on All list items
coList.forEach(li => {
    // click on every list items
    li.addEventListener('click',(e) => {
        // set color on root
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        // set color on local storage
        localStorage.setItem("color-option",e.target.dataset.color);
        
        handleActive(e);
    });
})
/////////////////////

// switch random backgrounds option
let randomBackEl = document.querySelectorAll(".random-backgrounds span");
// loop on All spans
randomBackEl.forEach(span => {
    // click on every span
    span.addEventListener('click', (e) => {
        handleActive(e);
        
        if(e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option",true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option",false);
        }
        // set random background on local storage
    });
})

/////////////////////

// show bullets
let showBullets = document.querySelectorAll(".bullets-option span");
showBullets.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if(e.target.dataset.display === "show") {
            navBullet.style.display = "block";
            localStorage.setItem("showBullets-option", e.target.dataset.display);
        } else {
            navBullet.style.display = "none";
            localStorage.setItem("showBullets-option", e.target.dataset.display);
        }
    })
})
/////////////////////

// select landing page element
let land = document.querySelector('.landing-page');

// get array of imgs
let imgsArray = ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg'];

// function to randomiz imgs
function randomizeImgs () { 
    if(backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // get random num
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            
            // change bg img url
            land.style.backgroundImage = 'url("../imgs/' + imgsArray[randomNumber] +'")';
        
        }, 10000)
    }
}
randomizeImgs();

////////////////////

// select skill selector
let skill = document.querySelector(".skills");
window.onscroll = function () {
    // skills offset top
    let skillsOffsetTop = skill.offsetTop;
    // skill outer height
    let skillsOuterHeight = skill.offsetHeight;
    // window height
    let windowHeight = this.innerHeight; 
    // window scrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        // this.console.log("reached");
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(span => {
            // span.parentElement.style.backgroundColor = span.parentElement.dataset.background;
            span.style.width = span.dataset.progress;
            span.style.backgroundColor = span.dataset.color;
        });
    }
};
///////////////////

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // create overlay element
        let overlay = document.createElement("div");
        // add class to overlay
        overlay.className = "popup-overlay";
        // append overlay to the body 
        document.body.appendChild(overlay);
        // create the popup
        let popupBox = document.createElement('div');
        // add class to the popup box
        popupBox.className = 'popup-box';
        if(img.alt !== "") {
            // craete heading
            let imgHeading = document.createElement('h3');
            // create text for the heading
            let imgText = document.createTextNode(img.alt);
            // append text for heading
            imgHeading.appendChild(imgText);
            // append the heading to the popup box
            popupBox.appendChild(imgHeading);

        } else {
            let imgHeadings = document.createElement("h3");
            let imgTexts = document.createTextNode("No Image Name");
            imgHeadings.appendChild(imgTexts);
            popupBox.appendChild(imgHeadings);
        }

        // create the image
        let popupImg = document.createElement('img');
        // set image source
        popupImg.src = img.src;
        // add image to popup box
        popupBox.appendChild(popupImg);
        // append the popup box to body
        document.body.appendChild(popupBox);

        // create the close span
        let closeButton = document.createElement("span");
        // create the close button text
        let closeButtonText = document.createTextNode("X");
        // append text to close button 
        closeButton.appendChild(closeButtonText);
        // add class to close button
        closeButton.className = "close-button";
        // add close button to popup box
        popupBox.appendChild(closeButton);
    });
});

// close popup
document.addEventListener("click" , function(e) {
    if(e.target.className == "close-button") {
        // remove the current popup
        e.target.parentNode.remove();
        // remove ovelay 
        document.querySelector(".popup-overlay").remove();
    }
})
////////////////////

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);
///////////////////

// handle active state
function handleActive(ev) {
    // remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    })
    // add active class on target
    ev.target.classList.add("active");
}
//////////////////

// rsset button
document.querySelector(".reset-options").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("showBullets-option");
    // reload window
    window.location.reload();
}
/////////////////

// toggle menu
let toggle = document.querySelector(".toggle-menu"); 
let link = document.querySelector(".header-area .links");

toggle.addEventListener("click" ,(e) => {
    //stop propagation
    e.stopPropagation();

    toggle.classList.toggle("menu-active");
    link.classList.toggle("open");

})
            
document.addEventListener("click", (e) => {
    if(e.target !== toggle && e.target !== link) {
        // check if menu is open
        if(link.classList.contains("open")) {
            toggle.classList.toggle("menu-active");
            link.classList.toggle("open");
        }
    }
})
// stop propagation on menu
link.addEventListener("click", (e) => {
    e.stopPropagation();
})