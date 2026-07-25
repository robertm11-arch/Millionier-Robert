'use strict';

let mainGame = document.querySelector('.game-Block'),
gameWraper = document.querySelector('.game-wrap'),
startBtn = document.querySelector('start-btn'),
endBtm = document.querySelector('.end-Btn'),
btnAnswers = document.querySelectorAll('.answer'),
blockQuestion = document.querySelectorAll('.question'),
helpBtns = document.querySelectorAll('.hets-help'),
winsBlock = document.querySelector('.wins-block'),
helpFifty = document.querySelector('.fifty-fifty'),
helpHall = document.querySelector('.hall-help'),
helpFriends = document.querySelector('.qall-friend'),
helpAI = document.querySelector('.ai-help'),
game = document.querySelector(',game')
//////////===========

let changetQuestion = document.getElementById('hintBox')
let extraQuestion = document.getElementById('extra')
let flagExtra = true


let endB = document.getElementById('end')

const popup = document.getElementById('rulesPopup')
const showBtn = document.getElementById('showRules')

let aiExplainBlock = document.getElementById('aiExplainBlock')
let aiExplainTest = document.getElementById('aiExplainText')
let aiExplainClose = document.getElementById('aiExplainClose')

const OPEN_AI_KEY = ''
const OPENAI_MODEL = ''


showBtn.addEventListener('click' , () =>{
    popup.classList.add('show')
})



popup.addEventListener('click', () => {
    popup.classList.remove('show')
})

let generalMusic = new Audio('./music/end-sound.mp3')
const questionSong = new Audio('./music/questions-sound.mp3')
let count = 0
let fixedl = new Audio('./8,000-question.mp3')

let incorrectSoundFlag = false

generalMusic.loop = true
window.addEventListener('click' , () => {
    generalMusic.play();
} , {once : true})


endBtn.addEventListener('click' , () => {
            setTimeout(()=>{
                game.computedStyleMap.backgroundImage =""
            },2000)
            questionSong.pause()
            mainGame.classList.remove('animate_backInUp')
            mainGame.classList.remove('animate_flipInX')
            mainGame.classList.remove('animate__animated', 'animate__backOutUp')

            setTimeout(()=>{
                     mainGame.style.display = 'none'
                     startBtn.style.display = 'block'
                     startBtn.classList.remove('animate__backOutUp')
                     startBtn.classList.add('animate__backInDown')

            },1000) ;

            setTimeout(() =>{
                startBtn.classList.remove('animate__backInDown')
            },1000) ;


           let userWin = document.querySelector('user-win')
           
           //////  այստեղ դեռ կվերադառնանք
})



startBtn.addEventListener('click',() =>{
             generalMusic.pause()
             generalMusic.currentTime = 0
             game.style.backgroundImage = "url('./img/galaxy.jpg)"
             game.style.backgroundSize = '100%'

             startBtn.classList.add('animate__animated', 'animate__backOutUp')
             startBtn.classList.remove('animate__backOutDown')
             showBtn.remove()
})


