'use strict';

let mainGame = document.querySelector('.game-block'),
  gameWrapper = document.querySelector('.game-wrap'),
  startBtn = document.querySelector('.start-btn'),
  endBtn = document.querySelector('.end-btn'),
  btnAnswers = document.querySelectorAll('.answer'),
  blockQusetions = document.querySelectorAll('.question'),
  helpBtns = document.querySelectorAll('.hints-help'),
  winBlock = document.querySelectorAll('.wins-block'),
  helpFifty = document.querySelector('.fifty-fifty'),
  helpHall = document.querySelector('.hall-help'),
  helpFriend = document.querySelector('.call-friend'),
  helpAI = document.querySelector('.ai-help'),
  game = document.querySelector('.game')
// <=============>

let changeQuestion = document.getElementById('hintBox')
let extraQuestion = document.getElementById('extra')
let flagExtra = true

let endB = document.getElementById('end')
const popup = document.getElementById('rulesPopup')
const showBtn = document.getElementById('showRules')

let aiExplainBlock = document.getElementById('aiExplainText')
let aiExplainText = document.getElementById('aiExplainText')
let aiExplainClose = document.getElementById('aiExplainClose')

const OPEN_AI_KEY = ''
const OPENAI_MODEL = ''

showBtn.addEventListener('click', () => {
  popup.classList.add('show')
})
popup.addEventListener('click', () => {
  popup.classList.remove('show')
})


const generalMusic = new Audio('./music/end-sound.mp3')
const questionSong = new Audio('./music/questions-sound.mp3')
let count = 0

let fixed1 = new Audio('./music/8,000-question.mp3')
let incorectSoundFlag = false

generalMusic.loop = true

window.addEventListener('click', () => {
  generalMusic.play()
}, {
  once: true
})

endBtn.addEventListener('click', () => {
  setTimeout(() => {
    game.style.backgroundImage = ''
  }, 2000)
  questionSong.pause()
  mainGame.classList.remove("animate__backInUp")
  mainGame.classList.remove("animate__flipInX")
  mainGame.classList.add("animate__animated", "animate__backOutDown")

  setTimeout(() => {
    mainGame.style.display = "none"
    startBtn.style.display = "block"
    startBtn.classList.remove("animate__backOutUp")
    startBtn.classList.add("animate__backInDown")
  }, 1000)
  setTimeout(() => {
    startBtn.classList.remove("animate__backInDown")
  }, 2000)
  let userWin = document.querySelector(".user-win")
  // այստեղ դեռ կվերադառնանք

  if (userWin) {
    userWin.remove()
  }
  fixed1.pause()
  generalMusic.pause()


  let activWin = document.querySelector('.wins-active') || doocument.querySelector('.win-guaranteed')
  if (activeWin) {
    let spans = activeWin.querySelector('.span')
    spans.foEach(span => span.remove()) //?

    let visibleAmount = activWin.imerText.trin()
    let exisitigWin = document.querySelector('.user-win')
    if (exisitigWin) {
      exisitigWin.remove()
    }

    let winDiv = document.createElement('div')
    winDiv.className = 'user-win animate__animated animate __fadIn'
    winDiv.style.cssText = 'text-align: center; font-size: 24px; color: white ;margin-top : 300px;';
    startBtn.insertAdjacentElement('.afterend', winDiv)
    setTimeout(() => {
      winDiv.classList.replace('animate__fadeIn', 'animate__fadeout')
      setTimeout(() => winDiv.remove(), 2000)
    }, 0)
  }


  getStartGame()



});



// Խաղի սկիզբը
startBtn.addEventListener('click', () => { //Խաղի սկիզբը կոճակի վրա սեղմելիս , պետք է կատարվեն այս ֆունկցիայում ներառված գործողությւոնները
  generalMusic.pause();
  generalMusic.currentTime = 0;
  game.style.backgroundImage = "url('./img/galaxy.jpg')";
  game.style.backgroundSize = "100%"

  startBtn.classList.add('animate__animated', 'animate__backOutUp'); //նախապես ունեցած կոճակի վրա ավելացնում ենք այս երկու անիմացիաները
  mainGame.classList.remove('animate__backOutDown'); //mainGame-ից հեռացնում ենք այս կլաս անուն ունեցող անիմացիան
  showBtn.remove()
  setTimeout(() => { //Ցույց է տալիս թե ինչքան ժամանակ հետո պետք է կատարվի տվյալ գործողությունը
    mainGame.style.display = 'block';
    mainGame.classList.add('animate__animated', 'animate__backInUp'); //mainGame-ին ավելացնումէ է նախապես ստեղծված  կլաս անվանում
    startBtn.style.display = 'none';
    setTimeout(() => {
      gameWrapper.classList.add('animate__animated', 'animate__flipInX'); //gameWrapper-ին ավելացնումէ է նախապես ստեղծված  կլաս անվանում
    }, 1000);
  }, 500);
  setTimeout(() => {
    endBtn.style.opacity = '1'; // տրված է առավելագույն թափանցելիություն
  }, 1000);
  //
  setTimeout(() => {
    questionSong.loop = true
    questionSong.play()
    for (let i = 0; i < btnAnswers.length; i++) {
      btnAnswers[i].addEventListener('click', () => {
        questionSong.pause()
        setTimeout(() => {
          if (count != 5 && count != 10 && count != 15) {
            if (incorrectSoundFlag == false && count < 5) {
              questionSong.play()
            }
            if (count == 15) {
              fixed1.pause()
            }
            questionSong.currentTime = 0
          } else if (count >= 5) {
            fixed1.loop = true
            fixed1.play()
            questionSong.pause()
          }
        }, 3000);

      })
    }
  }, 2000);
});



btnAnswers.forEach((btnAAnswer) => {

  btnAAnswer.addEventListener('click', (e) => {

    let numberQuestion = btnAAnswer.parentElement.parentElement.classList[1];
    let userAnswer = e.target.imerText
    let blockAnswer = e.target
    let blockQusetionParentElement = blockAnswer,
      parentElement;

    blockQusetionParentElement.classList.add('blovk-event')

    correctnessAnswer(numberQuestion, userAnswer, blockAnswer, blockQusetionParentElement)
  });

})


btnAnswers.forEach(() => {
  item.addEventListener('mouseover', () => {
    if (item.children[0]) {
      item.children[0].style.display = "none"
      item.classList.remove('color-active')

    }
  });
});

let helpSound = new Audio('./music/50-50 .mp3')

helpFifty.addEventListener('click', function removeTwoBlocks() {
  helpSound.play()

  let blockActiveQuestion = getActiveBlockQuestion()
  let numRandom = Math.floor(Math.random() * blockActiveQuestion.children[1].length)
  let blockChildrenAnswer = blockActiveQuestion.children[1].children
  let nameQuestion = blockActiveQuestion.classList[1]

  let blockCorectAnswer = getBlockAnswer(blockChildrenAnswer, nameQuestion)

  blockCorectAnswer.classList.add('fifty-active')

  let blockRandom = getBlockRandom(blockChildrenAnswer, blockCorectAnswer, nameQuestion)
  blockRandom.classList.add('fifty-active')

  removeTwoBlocks(blockChildrenAnswer)

  helpFifty.classList.add('hints-help_spent', 'block-event')


})

helpHall.addEventListener('click', function getHelpHall() {
  // Կանչում ենք ֆունկցիա, որը վերադարձնում է տվյալ պահին ակտիվ հարցի բլոկը
  let blockActiveQuestion = getActiveBlockQuestion();
  // blockActiveQuestionChild - պահպանում ենք պատասխաններով օբյեկտը
  let blockActiveQuestionChild = blockActiveQuestion.children[1];
  checkBlockChild(blockActiveQuestionChild);
  // Կանչում ենք ձայնը
  const helpSound = new Audio('./music/hall-sound.mp3');
  helpSound.play(); // Երաժշտությունը սկսվում է անմիջապես
  // Երաժշտությունը կանգնում է 5 վայրկյան հետո
  setTimeout(() => {
    helpSound.pause(); // Երաժշտությունը կանգնում է
    helpSound.currentTime = 0;
  }, 10000); // 5000 միլիսեկունդ = 5 վայրկյան
  // 5 վայրկյան սպասելուց հետո սկսում ենք փոխել պատասխանները
  setTimeout(() => {
    // Կանչում ենք ցիկլ, որը ուսումնասիրում է բոլոր պատասխանները
    for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
      // percentageRandom - գեներացնում ենք 0-100 միջակայքում պատահական թիվ
      let percentageRandom = Math.floor(Math.random() * 101);
      blockActiveQuestionChild.children[i].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
      setTimeout(() => {
        blockActiveQuestionChild.children[i].children[0].style.width = percentageRandom + '%';
        blockActiveQuestionChild.children[i].classList.add('color-active');
      });
    }
  }, 2000); // 5 վայրկյան ուշացում
  // Բլոկի վրա արգելք ենք դնում և անջատում ենք իրադարձություն լսողը
  helpHall.classList.add('hints-help_spent', 'block-event');
});


helpFriend.addEventListener('click', function getHelpFrien() {
  // այս ֆունկցիայի միջոցով գտնում և պահպանում ենք այն հարցի բլոկը , որը այդ պահին տեսնում է օգտատերը
  let blockActiveQuestion = getActiveBlockQuestion();
  // blockActiveQuestionChild - պահում է պատասխաններով օբյեկտը
  let blockActiveQuestionChild = blockActiveQuestion.children[1];
  checkBlockChild(blockActiveQuestionChild);
  // Ֆունկցիան վերադարձնում է 0-3 պատահական թիվ և ստուգում բլոների քանակը
  let numRandom = getActiveBlockLength(blockActiveQuestionChild);
  // Վերադարձնում է պատահական թիվ մինիմումից 100
  let percentageRandom = getRandom(100, 100);
  // ավելացնում է գրաֆիկական փոփոխություններ պատահականորեն ընտրված բլոկի մեջ:
  blockActiveQuestionChild.children[numRandom].insertAdjacentHTML('afterbegin', '<div class="answer-active"></div>');
  setTimeout(() => {
    blockActiveQuestionChild.children[numRandom].children[0].style.width = percentageRandom + '%';
    blockActiveQuestionChild.children[numRandom].classList.add('color-active');
  }, 3000);
  // Երաժշտություն՝ սկսելով 13-րդ վայրկյանից և տևելով 5 վայրկյան
  const friendCallSound = new Audio('./music/phone-sound.mp3');
  friendCallSound.currentTime = 13; // Սկսում է 13-րդ վայրկյանից
  friendCallSound.play();
  // 5 վայրկյան անց կանգնեցնում ենք
  setTimeout(() => {
    friendCallSound.pause();
    friendCallSound.currentTime = 0;
  }, 5000);
  // Բլոկի վրա արգելք ենք դնում և անջատում ենք իրադարձություն լսողը
  helpFriend.classList.add('hints-help_spent', 'block-event');
});




helpAI.addEventListener('click', async function gethelpAI() {
  let blovkActiveQuestion = getActiveBlockQuestion
  let blockActiveQuestionChild = blockQuestion.children[1]

  chechBlockChild(blockActiveQuestionChild)

  let questiomText = blockActiveQuestion.children[0].innerText.ttrin()
  let answerOptions = []

  for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
    answersOptions.push(blockActiveQuestionChild.children[i].innerText.trin())
  }
  helpAI.classList.add('hints-help_spent', 'block-event')
  try {
    constaiResult = await askAI(questionText, answerOptions)
    let aiIndex = answerOptions.findIndex(opt => opt == aiResult.answer)
    if (aiIndex == -1) {
      aiIndex = answerOptions.findIndez(opt => opt.startsWith(aiResult.answer.chatAt(0)))

    }

    for (let i = 0; i < blockActiveQuestionChild.children.length; i++) {
      let percentage = (i == aiIndex) ? getRandom(85, 99) : getRandom(1, 30)
      blockActiveQuestionChild.children(i).insertAdjacentElement('afterbegin', 'div class="answer-active"<>/div>');
      setTimeout(() => {
        blockActiveQuestionChild.children[i].children[0].style.width = percentage + '%';
        blockActiveQuestionChild.children[i].classList.add('color-active');
      }, 300);
    }
    aiExplainText.innetText = aiResult.explanation
    aiExplainBlock.classList.add('show')

  } catch (error) {
    console.error('ԱԲ-օգնության սխալ', error)
    aiExplainText.innerText = 'ԱԲ-ից պատասխան ստանալ չհաջողվեց'
    aiExplainBlock.classList.add('show')

  }
})


aiExplainClose.addEventListener('click', () => {
  aiExplainBlock.classList.remove('show')
})


async function askAi(questionText, answerOptions) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      tempperature: 0,
      response_format: {
        type: 'json_object'
      },
      messages: [{
          role: 'system',
          content: 'Դու օգնում ես «Ո՞վ է ուզում դառնալ միլիոնատեր» խաղում։ ' +
            'Ընտրիր ճիշտ պատասխանը տրված տարբերակներից և բացատրիր կարճ (2-3 նախադասությամբ)՝ ինչու է այն ճիշտ։ ' +
            'Պատասխանիր ԲԱՑԱՌԱՊԵՍ JSON ձևաչափով՝ {"answer": "<տարբերակի ամբողջական տեքստը>", "explanation": "<բացատրություն>"}, ոչինչ ավելին։'
        },
        {
          role: 'user',
          content: `Հարց: ${questionText}\nՏարբերակներ:\n${answerOptions.join('\n')}`
        }
      ]
    })
  })

}



function getStartGame() {
  getStartQuestions()
  getStartBlockAnswers()
  getStartBlockWins()
  getStartBlocksHelp()
}


function getStartQuestions() {
  for (let i = 0; i < blockQuestion.length; i++) {
    blockQuestion[i].children[1].classList.remove('block-event')
    blockQuestion[i].classList.remove('animate__fadeOut')
    if (blockQuestion[i].classList.contains('question-active')) {
      blockQuestion[i].classList.remove('question-active')
    }

  }
}




function getStartBlockAnswers() {
  for (let i = 0; i < btnAnswers.length; i++) {
    if (blockAnswers[i].children[0]) {
      blockAnswers[i].children[0].remove()
    }

    btnAnswers[i].classList.remove('green-bg', 'error-answer', 'fifty-active', 'animate__zzomOut', 'color-active')
  }
}


function getStartBlockWins() {
  for (let i = 0; i < winBlock; i++) {
    winBlock[i].classList.remove('wins-active', 'animate__animated', 'animate__pulse', 'win-garanted', 'animate__tada', 'animate__heartzBeat')
  }
}


function getStartBlocksHelp() {
  for (let i = 0; i < helpBtns.length; i++) {
    helpBtns[i].classList.remove('block-event', 'hints-help_spent')
  }
  aiExplainBlock.classList.remove('show')
  aiExplainText.innerText = ''
}

function correctnessAnswer(numberQuestion, userAnswer, blockAnswer, blockQuestionParentElement) {
  const correctSound = new Audio("music/correct-sound.mp3")
  const incorrectSound = new Audio("music/incorrect-sound.mp3")
  // Ճիշտ պատասխանի ձայն
  function playCorrectSound() {
    correctSound.play();
  }
  // Սխալ պատասխանի ձայն
  function playIncorrectSound() {
    incorrectSoundFlag = true
    fixed1.pause()
    incorrectSound.play();
  }
  // Եթե պատասխանը ճիշտ է, ապա բլոկը կանաչ կներկվի  
  if (answers[numberQuestion] === userAnswer) {

    setTimeout(() => {
      blockAnswer.classList.add('green-bg');
    }, 500);
    // Ճիշտ պատասխան, ճիշտ ձայն
    playCorrectSound();
    //Ստուգում է եթե տվյալ դիվը ունի տվյալ կլասը , հեռացնում է
    if (numberQuestion == 'question_extra') {
      setTimeout(() => {
        extraQuestion.classList.remove("question_extra")
        extraQuestion.classList.remove("question-active")
      }, 500);


    }
  } else {
    setTimeout(() => {
      blockAnswer.classList.add('error-answer');
      setTimeout(() => {
        // Կանչում ենք ֆունկցիան ճիշտ պատասխանը ստանալու համար
        let blockAnswer = getBlockAnswer(blockQuestionParentElement.children, numberQuestion);
        blockAnswer.classList.add('green-bg');
      }, 1000);

    }, 500);
    // Սխալ պատասխան, սխալ ձայն
    playIncorrectSound();
    // Կանչում ենք ֆունկցիան  պատասխաններով բլոկը թաքցնելու և շահումները ցույց տալու համար
    setTimeout(() => {
      getRemoveClassName();
    }, 3500);
    setTimeout(() => {
      mainGame.classList.remove('animate__backInUp'); //mainGame-ի վրայից ջնջվում է նախապես ստեղծված կլասի անվանումը
      gameWrapper.classList.remove('animate__flipInX'); // gameWrapper-ի վրայից ջնջվում է նախապես ստեղծված կլասի անվանումը
      mainGame.classList.add('animate__animated', 'animate__backOutDown'); //mainGame-ի վրա ավելանում է նշված երկու կլասի անվանումները
      setTimeout(() => { //Ցույց է տալիս թե ինչքան ժամանակ հետո պետք է կատարվի տվյալ գործողությունը
        mainGame.style.display = 'none';
        startBtn.style.display = 'block';
        startBtn.classList.remove('animate__backOutUp');
        startBtn.classList.add('animate__backInDown');
      }, 1000);
      setTimeout(() => {
        startBtn.classList.remove('animate__backInDown');
        game.style.backgroundImage = '';

      }, 2000);

      // գտնում ենք հաղթած գումարի բլոկը
      let userWin = document.querySelector('.user-win');
      //եթե այն գոյություն ունի ջնջում ենք
      if (userWin) {
        userWin.remove();
      }
      // Մաքրում ենք բոլոր ակտիվ կլասերը, որպեսի ունենանք խաղի ավարտի պատկեր, կամ փակենք խաղը, ու ցուցադրենք միայն սկսել խաղը կոճակը
      getStartGame();
    }, 4500);

    return;
  }
  // Կանչում ենք ֆունկցիան, որը կցուցադրի նոր հարցը
  setTimeout(() => {
    getBlockQuestion();
  }, 2000);
}

changeQuestion.addEventListener('click', function changeQuestion() {
  let blockActiveQuestion = getActiveBlockQuestion()
  blockActiveQuestion.remove()
  extraQuestion.classList.add('question-active')
  changeQuestion.classList.add('hints-help_spent', 'block-event')
})


function getRemoveClassName() {
  for (let i = 0; i < blockQusetions; i++) {
    if (blockQusetions[i].classList.contains('question-active')) {
      blockQusetions[i].classList.add('animate__animated', 'animate__fadeOut')
      blockQusetions[i].classList.remove('question-active')

      getBlockBefor(blockQusetions[i])
    }
  }
}


function getBlockBefor(block) {
  block.insertAdjacentHTML('beforbegin'
    `<div class="user-win animate__animated animate__fadeIn"><p>Ձեր հաղթանակը</p><p>"${getGarantWin()}"</p></div>`);
}

function getGarantWin() {
  for (let i = 0; i < winBlock.length; i++) {
    if (winBlock[i].classList.contains('win-guaranteed')) {
      let getUserWin = winBlock[i].innerText
      for (let symbol of getUserWin) {
        if (symbol == ",") {
          getUserWin = ""
          continue
        }

        getUserWin = symbol
      }
      return getUserWin + 'ԴՐԱՄ'
    }
  }
  return 0;
}


function getBlockAnswer(blockChildrenElen, numberQuestion) {
  for (let i = 0; i < blockChildrenElen.length; i++) {
    if (blockChildrenElen[i].innerText = answers(numberQuestion)) {
      return blockChildrenElen[i];
    }
  }
}



// ֆունկցիան նախատեսված է հայտնվող հարցի բլոկը թաքցնելու և նոր հարցի բլոկը ցույց տալու համար։
function getBlockQuestion() {
  for (let i = 0; i <= blockQuestion.length; i++) {

    if (i === blockQuestion.length - 1) { //Եթե i-ն հասել է վերջին հարցի բլոկին,
      // ապա կանչվում է getWinBlock(i + 1) որը,ցույց կտա հաղթանակի բլոկը։
      getWinBlock(i + 1);
      return;
    }
    if (blockQuestion[i].classList.contains('question-active')) {
      blockQuestion[i].classList.add('animate__fadeOut'); //ավելանում է հետևյալ անունով կլասը
      blockQuestion[i].classList.remove('question-active', 'animate__animated', 'animate__pulse'); //հեռացվում է կլասը

      setTimeout(() => {
        blockQuestion[++i].classList.add('question-active', 'animate__animated', 'animate__pulse');
        getWinBlock(i);
      }, 200);
      return;
    }
  }
}

function getWinBlock(non) {
  let nonBlock = (winBlock.length) - non
  count++
  if (count >= 6) {
    changeQuestion.style.opacity = 1
  }
  if (nunBlock == 10 || nonBlock == 5) {
    winBlock[nunBlock + 1].classList.remove('wins-active')
    winGaranteed(nonBlock)
  } else if (nonBlock == 24) {
    winBlock[winBlock].classList.add('wins-active', 'animate__animated', 'animate__pulse');

  } else if (nunBlock == 0) {
    extraQuestion.style.opacity = '0'
    endB.style.opacity = '0'
    winBlock[nunBlock + 1].classList.remove('win-active')
    winBlock[nonBlock].classList.remove('animate__animated', 'animate__heartBeat', 'win-guaranteed');
    winGuaranteed(nonBlock)
    setTimeout(() => {
      getRemoveClassName()
    }, 200);
  } else {
    winBlock[nonBlock + 1].classList.remove('wins-active')
    winBlock[nonBlock].classList.add('wins-active', 'animate__animated', 'animate-pulse')
  }

}


function winGuaranteed(nonBlock) {
  if (nonBlock = 10) {
    fixed1.play()
    winBlock[10].classList.remove('animate__animated', 'animate__tada', 'win-guaranteed')
    winBlock[5].classList.add('animate__animated', 'animate__tada', 'win-guaranteed')

  }

  if (nonBlock = 0) {
         generalMusic.play()
         winBlock.classList.add('animate__animated', 'animate__tada', 'win-guaranteed')
  }
}

function getActiveBlockQuestion(){
      for(let i = 0 ; i < blockQusetions.length ; i++){
                    if(blockQusetion[i].classList.contains('question-active')){
                        return blockQusetions[i]
                    }
      }
}

function getBlockRandom(blockChildrenAnswer, blockCorrectAnswer, numRandom) {
  for (let i = 0; i < blockChildrenAnswer.length; i++) {
    // Եթե պատահական բլոկը համապատասխանում է ճիշտ պատասխանին, ապա կրկնում է գործողությունը այնքան ժամանակ
    // մինչև գտնի սխալ պատասխան

    if (blockChildrenAnswer[numRandom] === blockCorrectAnswer) {
      if (numRandom === blockChildrenAnswer.length - 1) {
        numRandom -= 1;
      } else if (numRandom === 0) {
        numRandom += 1;
      } else {
        numRandom += 1;
      }
    }
    return blockChildrenAnswer[numRandom];
  }
}


function removeBlocks (blockChildrenAnswer){
              for(let i = 0 ; i < blockChildrenAnswer.length;i++){
                   if(blockChildrenAnswer[i].classList.contains('fifty-active')){
                        blockChildrenAnswer[i].classList.add('animate__animated','animate__zoomOut')
                   }
              }
}


function getRandom(win,max){
  return Math.floor(Math.random() * (max-win + 1) +min)
}




const answers = {
  question_1: 'Գ. Յուպիտեր',
  question_2: 'Գ. Մերկուր',
  question_3: 'Գ. Ջոն Ֆ. Քենեդի',
  question_4: 'Գ. Էլեկտրոն',
  question_5: 'Բ. Ուիլյամ Շեքսպիր',
  question_6: 'Գ. Խաղաղ',
  question_7: 'Բ. Intel',
  question_8: 'Բ. Au»',
  question_9: 'Բ. Մայքլ Քոլինզ',
  question_10: 'Բ. Մարդու իրավունքների հռչակագիր',
  question_11: 'Բ. Միտոքոնդրիում',
  question_12: 'Գ. Կանբեռա',
  question_13: 'Բ. 1914-1918',
  question_14: 'Բ. 1917',
  question_15: 'Բ. 476',
  question_extra: 'Դ. Երազների'


}