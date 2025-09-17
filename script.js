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
    .then(words => showWords(words.data));

}

// show words by level function
const showWords = (words) =>{
    // console.log(words);
    // 1. get parent element
    const wordContainer = document.getElementById("words-container");
    // empty the container
    wordContainer.innerHTML = "";

    for(let word of words){
        console.log(word)
    // 2.create element
    const perWord = document.createElement("div");
    perWord.innerHTML = `
      <div class="min-w-[300px] h-[350px] bg-white rounded-lg flex flex-col text-center p-8 gap-8">
            <h2 class="text-3xl font-bold ">${word.word}</h2>
            <h3 class="text-xl font-medium ">Meaning/Pronounciation</h3>
            <h2 class="text-3xl font-bold text-[#18181B] font-bangla">${word.meaning} / ${word.pronunciation}</h2>
            <div class=" flex justify-between ">
                <button class=" bg-[#1A91FF1A] p-4 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button class=" bg-[#1A91FF1A] p-4 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
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
        <button onclick="loadLevelWords(${items.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${items.level_no}</button>`;

        // 3.append child

        lessonDiv.appendChild(btnLesson);
    }

    // for (let items in lessons){
    //     console.log(items);
    // }
}

loadLesson();