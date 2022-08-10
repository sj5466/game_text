const typingText = document.querySelector('.typing p');
const inputTest = document.querySelector('.wrap .input_test');
const timeTag = document.querySelector('.time span b');
const mistakeTag = document.querySelector('.mistake span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const againBtn = document.querySelector('button');

let timer,
maxTime = 60,
timeLeft =maxTime,
charIndex = mistakes = isTyping =0;

function randomText(){
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('keydown', ()=>{inputTest.focus()});
    typingText.addEventListener('click', ()=>{inputTest.focus()});
}

function init(){
    const characters = typingText.querySelectorAll('span');
    let typed = inputTest.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if(typed == null){
            charIndex--;
            if(characters[charIndex].classList.contains('incorrect')){
                mistakes--;
            }
            characters[charIndex].classList.remove('correct','incorrect');
        }else{
            if(characters[charIndex].innerText === typed){
                characters[charIndex].classList.add('correct');
            }else{
                mistakes++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove('active'));
        characters[charIndex].classList.add('active');
    
        let wpm=Math.round((((charIndex - mistakes)/5) / (maxTime - timeLeft)) * 60);
        wpm = wpm< 0 || !wpm || wpm === Infinity ? 0:wpm;
        mistakeTag.innerText =  mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }else{
        inputTest.value = "";
        clearInterval(timer);
    }
    
}
function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        clearInterval(timer);
    }
}
function replayGame(){
    randomText();
    inputTest.value="";
    clearInterval(timer);
    timeLeft =maxTime;
    charIndex = mistakes = isTyping =0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomText();
inputTest.addEventListener('input',init);
againBtn.addEventListener('click', replayGame);