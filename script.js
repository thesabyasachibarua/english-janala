const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //gives promise of data
    .then(res => res.json()) //promise of give json data
    .then(json => showLesson(json))
}

// function for getting words per level
function loadLevelWords(level){
    // console.log(level);
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    fetch(url)
    .then(res => res.json())
    .then(words => {
        const btnActive = document.getElementById(`lesson-btn-${level}`);
        // remove active
        removeActive();

        btnActive.classList.add("active");
        // console.log(btnActive);
        showWords(words.data)
    });

}

// function of removeActive button

const removeActive = () =>{
const allClass = document.querySelectorAll(".activeButton");
        allClass.forEach(className =>{
            className.classList.remove("active")
        })
        // allClass.classList
        // console.log(allClass);
}

const loadWordDetails = async (id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}


const displayWordDetails = (wordData) =>{
    // console.log(wordData);
    const modalShow = document.getElementById("my_modal_1");

    const detailsContainer = document.getElementById("modal_Show");
    detailsContainer.innerHTML = `
     <div class="space-y-4">
         <div class="font-bold text-xl">
            <h2>${wordData.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${wordData.pronunciation})</h2>
        </div>
        <div>
           <h3 class="font-bold">Meaning</h3>
           <p>${wordData.meaning}</p>
        </div>
        <div>
           <h3 class="font-bold">Example</h3>
           <p>${wordData.sentence}</p>
        </div>
        <div>
           <h3 class="font-bold">সমার্থক শব্দ গুলো</h3>

           <button class="border-2 rounded-md p-3 bg-teal-400">${wordData.synonyms[1]? wordData.synonyms[1]:"Not put yet"}</button>
           <button class="border-2 rounded-md p-3 bg-teal-400">${wordData.synonyms[1]? wordData.synonyms[1]:"Not put yet"}</button>
           <button class="border-2 rounded-md p-3 bg-teal-400">${wordData.synonyms[2]? wordData.synonyms[2]:"Not put yet"}</button>
        </div>
    </div>`;
    // modalShow.innerHTML = "Hi I am the modal";

     modalShow.showModal();

}

// show words by level function
const showWords = (words) =>{
    // console.log(words);
    // 1. get parent element
    const wordContainer = document.getElementById("words-container");
    // empty the container
    wordContainer.innerHTML = "";

      if(words.length == 0){
       wordContainer.innerHTML = `
         <div class="text-center col-span-full my-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <h3 class="font-bangla text-[14px] text-[#79716B] font-semibold mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
            <h2 class="font-bangla text-[35px] font-bold text-[#292524]">নেক্সট Lesson এ যান</h2>
        </div>`


    }

    for(let word of words){
        // console.log(word)
    // 2.create element
    const perWord = document.createElement("div");
    perWord.innerHTML = `
      <div class="min-w-[100px] h-[400px] bg-white rounded-lg flex flex-col text-center p-8 gap-8 shadow-lg">
            <h2 class="text-3xl font-bold ">${word.word?word.word : "Word not Found"}</h2>
            <h3 class="text-xl font-medium ">Meaning/Pronounciation</h3>
            <h2 class="text-3xl font-bold text-[#18181B] font-bangla">${word.meaning?word.meaning : "Meaning Not Found"} / ${word.pronunciation?word.pronunciation:"Pronunciation not Found"}</h2>
            <div onclick="loadWordDetails(${word.id})" class=" flex justify-between mt-5">
                <button class=" bg-[#1A91FF1A] p-4 rounded-lg hover:bg-sky-400"><i class="fa-solid fa-circle-info"></i></button>
                <button class=" bg-[#1A91FF1A] p-4 rounded-lg hover:bg-sky-400"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`

        // 3.append child
        wordContainer.appendChild(perWord);


}
}

const showLesson = (lessons) => {
    // console.log(lessons);
    // console.log(lessons.data);

    const lessonData = lessons.data;
    // 1.get the parent and empty 
    const lessonDiv = document.getElementById("level-container");
    lessonDiv.innerHTML = "";

    // get into all lessons
    for(let items of lessonData){
        // console.log(lessons);
        // 2. create element
        const btnLesson = document.createElement("div");

        btnLesson.innerHTML = `
        <button id="lesson-btn-${items.level_no}" onclick="loadLevelWords(${items.level_no})" class="activeButton btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${items.level_no}</button>`;

        // 3.append child

        lessonDiv.appendChild(btnLesson);
    }

    // for (let items in lessons){
    //     console.log(items);
    // }
}

loadLesson();