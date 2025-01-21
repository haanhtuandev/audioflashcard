// variable declare
let addNew = document.querySelector("#add");
let frontInput = document.querySelector("#front");
let backInput = document.querySelector("#back");
let cardsArray = [];
let studyBtn = document.getElementById('study');
let frontStudy = document.getElementById('front_study');
let backStudy = document.getElementById('back_study');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('previous');
let cardSection = document.querySelector('.cardsection');

// functions
function addFlashcards(){
    let frontValue = frontInput.value;
    let backValue = backInput.value;
    let pair = [frontValue, backValue];
    cardsArray.push(pair);
}
function clearInput(){
    frontInput.value = "";
    backInput.value = "";
}

// Function to make the text speak
function speakText(input) {
  if (!input.trim()) {
    alert('Please type something!');
    return;
  }
  const utterance = new SpeechSynthesisUtterance(input); // Create a speech object
  window.speechSynthesis.speak(utterance); // Use the browser's TTS engine to speak
}
function revealCard(){
  backStudy.classList.toggle('hidden');
  frontStudy.classList.toggle('hidden');
}
function startStudy() {
    if (cardsArray.length === 0) {
      alert("Please add flashcards before starting to study.");
      return;
    }
  
    let i = 0; 
    frontStudy.innerHTML = cardsArray[i][0]; 
    backStudy.innerHTML = cardsArray[i][1];

    speakText(cardsArray[i][0]);



    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        console.log('Play button clicked');
        audio.play();
        revealCard();
        if (backStudy.classList.contains('hidden')){
          speakText(cardsArray[i][0]);
        }
        else {
          speakText(cardsArray[i][1]);
        }
      });
    
      navigator.mediaSession.setActionHandler('pause', () => {
        console.log('Pause button clicked');
        audio.pause();
        revealCard();
        if (backStudy.classList.contains('hidden')){
          speakText(cardsArray[i][0]);
        }
        else {
          speakText(cardsArray[i][1]);
        }
      });
    
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        console.log('Next button clicked');
        frontStudy.classList.remove('hidden');
        i++;
        backStudy.classList.add('hidden');
        if (i < cardsArray.length) {
          frontStudy.innerHTML = cardsArray[i][0];
          speakText(cardsArray[i][0]);
          backStudy.innerHTML = cardsArray[i][1] 
        } else {
          // Handle end of array, e.g., display a message or reset
          frontStudy.innerHTML = "End of Cards";
          backStudy.innerHTML = "";
          i = -1; // Optionally reset for looping through cards again
        }
    
      });
    
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        console.log('Previous button clicked');
        frontStudy.classList.remove('hidden');
        i--;
        backStudy.classList.add('hidden');
        if (i < 0) {
          i = 0;
          frontStudy.innerHTML = cardsArray[i][0];
          speakText(cardsArray[i][0]);
          backStudy.innerHTML = cardsArray[i][1];
        } else {
          // Handle end of array, e.g., display a message or reset
          frontStudy.innerHTML = cardsArray[i][0];
          backStudy.innerHTML = cardsArray[i][1];
          speakText(cardsArray[i][0]);
        }
      });
    }

  
    nextBtn.addEventListener('click', () => {
      frontStudy.classList.remove('hidden');
      i++;
      backStudy.classList.add('hidden');
      if (i < cardsArray.length) {
        frontStudy.innerHTML = cardsArray[i][0];
        speakText(cardsArray[i][0]);
        backStudy.innerHTML = cardsArray[i][1] 
      } else {
        // Handle end of array, e.g., display a message or reset
        frontStudy.innerHTML = "End of Cards";
        backStudy.innerHTML = "";
        i = -1; // Optionally reset for looping through cards again
      }
    });

    prevBtn.addEventListener('click', () => {
      frontStudy.classList.remove('hidden');
      i--;
      backStudy.classList.add('hidden');
      if (i < 0) {
        i = 0;
        frontStudy.innerHTML = cardsArray[i][0];
        speakText(cardsArray[i][0]);
        backStudy.innerHTML = cardsArray[i][1];
      } else {
        // Handle end of array, e.g., display a message or reset
        frontStudy.innerHTML = cardsArray[i][0];
        backStudy.innerHTML = cardsArray[i][1];
        speakText(cardsArray[i][0]);
      }
    });
    
    cardSection.addEventListener('click', ()=>{
      revealCard();
      if (backStudy.classList.contains('hidden')){
        speakText(cardsArray[i][0]);
      }
      else {
        speakText(cardsArray[i][1]);
      }
      
});}
addNew.addEventListener('click', ()=>{
    addFlashcards();
    clearInput();
});
studyBtn.addEventListener('click', startStudy);

// Headphone button handling

// Create the audio element
const audio = new Audio();
audio.src = "1-hour-of-silence.mp3"; // Replace with your audio URL
audio.loop = true;

// Wait for user interaction
document.addEventListener('click', () => {
  audio.play()
    .then(() => {
      console.log('Audio is playing, media session ready');
    })
    .catch(error => {
      console.error('Error playing audio:', error);
    });
  console.log('User interacted with the document.');
}, { once: true }); // Ensure this only runs once

// Set up Media Session API




