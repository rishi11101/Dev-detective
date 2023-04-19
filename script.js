const searchBar = document.querySelector(".search-bar");
const searchForm = document.querySelector(".search-section");
const searchBtn = document.querySelector(".search-btn");

const modeBtn = document.querySelector(".mode-btn");
const light = document.querySelector(".light");
const dark = document.querySelector(".dark");

const userImg = document.querySelector(".avatar");
const Name = document.querySelector(".name");
const date = document.querySelector(".date");
const username = document.querySelector(".username");
const bio = document.querySelector(".bio");

const repos = document.querySelector(".repo");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");

const place = document.querySelector(".place");
const website = document.querySelector(".website");
const twitter = document.querySelector(".twitter");
const company = document.querySelector(".company");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//github api url:
const url = "https://api.github.com/users/";

//initialise:-
function init(){
    getUserData(url + "lovebabbar");
}
// function call:
init();


// searchBtn.addEventListener("click", ()=>{
//     if(searchBar.value != "")
//         getUserData(url + searchBar.value);
// });

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    if(searchBar.value != ""){
        getUserData(url + searchBar.value);
        searchForm.reset();
    }
    else return;
})


async function getUserData(githubUrl){

    try{
        const response = await fetch(githubUrl);
        const data = await response.json();
        console.log(data);
        renderData(data);
    }
    catch(err){
        // throw err;
    }
}


function renderData(data){

    if(data.message == "Not Found"){      
        alert("User does not exists, Please enter valid username!");
        return;
    }
        
    userImg.src = data.avatar_url;
    if(data.name != null) Name.innerText = data.name; else Name.innerText = data.login;

    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;

    username.href = data.html_url;
    username.innerText = `@${data.login}`;

    if(data.bio != null) bio.innerText = data.bio; else bio.innerText = "This profile has no Bio!";

    repos.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;

    if(data.location != null) place.innerText = data.location; else place.innerText = "Not Available!";

    if(data.blog != ""){
        website.innerText = `Visit Portfolio`;
        website.href = data.blog;
    } else website.innerText = "Not Available!";

    if(data.company != null){
        twitter.innerText = data.twitter_username;
        twitter.href = 'https://twitter.com/' + data.twitter_username;
    } else twitter.innerText = "Not Available!";

    if(data.company != null) company.innerText = data.company; else company.innerText = "Not Available!";

}


const root = document.documentElement.style;

function darkMode(){
    root.setProperty("--bodyBg", "#141D2F");
    root.setProperty("--containerBg", "#1E2A47");
    root.setProperty("--text", "white");
    root.setProperty("--repoSection", "#141D2F");
    root.setProperty("--text2", "rgb(222, 222, 222)");
}
function lightMode(){
    root.setProperty("--bodyBg", "#F6F8FF");
    root.setProperty("--containerBg", "white");
    root.setProperty("--text", "#2B3442");
    root.setProperty("--repoSection", "#white");
    root.setProperty("--text2", "#697C9A");
}

modeBtn.addEventListener("click", ()=>{
    
    if(dark.classList.contains("active")){
        //darkmode ON
        darkMode();
        dark.classList.remove("active");
        light.classList.add("active");
    }
    else{
        //lightmode ON
        lightMode();
        light.classList.remove("active");
        dark.classList.add("active");
    }

})