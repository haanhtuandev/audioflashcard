
let addNew = document.querySelector("#add");
let frontInput = document.querySelector("#front");
let backInput = document.querySelector("#back");
let cardsArray = [];
let studyBtn = document.getElementById('study');
let revealBtn = document.getElementById('reveal');
let frontStudy = document.getElementById('front_study');
let backStudy = document.getElementById('back_study');
let nextBtn = document.getElementById('next');
function addFlashcards(){
    let frontValue = frontInput.value;
    let backValue = backInput.value;
    let pair = [frontValue, backValue];
    cardsArray.push(pair);
    alert("New card created successfully!");
}
function clearInput(){
    frontInput.value = "";
    backInput.value = "";
}
function revealCard(){
    backStudy.classList.toggle('hidden');
}
function startStudy() {
    if (cardsArray.length === 0) {
      alert("Please add flashcards before starting to study.");
      return;
    }
  
    let i = 0; 
    frontStudy.innerHTML = cardsArray[i][0]; 
    backStudy.innerHTML = cardsArray[i][1] 
  
    nextBtn.addEventListener('click', () => {
      i++;
      backStudy.classList.add('hidden');
      if (i < cardsArray.length) {
        frontStudy.innerHTML = cardsArray[i][0];
        backStudy.innerHTML = cardsArray[i][1] 
      } else {
        // Handle end of array, e.g., display a message or reset
        frontStudy.innerHTML = "End of Cards";
        backStudy.innerHTML = "";
        i = 0; // Optionally reset for looping through cards again
      }
    });
  
    revealBtn.addEventListener('click', revealCard);
}
addNew.addEventListener('click', ()=>{
    addFlashcards();
    clearInput();
});


studyBtn.addEventListener('click', startStudy);
