const player = {readLetter: false, rustKey: false,};
const ending = new Set();
const savedEndings = JSON.parse(localStorage.getItem("endings")) || [];
savedEndings.forEach(ending => endings.add(ending));

document.getElementById("restart").onclick = () => {loadScene("start");};
document.getElementById("start-game").onclick = () => {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";

    loadScene("start")
}
document.getElementById("reset-progress").onclick = () => {
    localStorage.clear();
    location.reload()
}

let currentScene = "start";

function typeText(text){
    const storyText = document.getElementById("story-text");

    storyText.textContent = "";

    let index = 0;

    const interval = setInterval(() => {
        storyText.textContent += text[index]; 
        index++;
        if (index >= text.length){
            clearInterval(interval);
        }
    }, 25);
}
function shakenScreen(){
    document.body.classList.add("shake");
    setTimeout(() => {document.body.classList.remove("shake")}, 600);
}
function updateEndingList(){
    const div = document.getElementById("endings");
    div.innerHTML = "<h3>Unlocked Endings</h3>";
    endings.forEach(ending => {div.innerHTML += `<p>${ending}</p>`;});
}
function loadScene(sceneId){
    currentScene = sceneId;

    if (sceneId === "badEnding"){
        unlockEnding("The red door");
    }
    if (sceneId === "goodEnding"){
        unlockEnding("Escape");
    }
    if (sceneId === "secretEnding"){
        unlockEnding("The letters")
    }

    const scene = story[sceneId];

    if (sceneId === "decision"){
        shakenScreen();
    }

    const storyDiv = document.getElementById("story-text");
    storyDiv.classList.remove("fade");
    void storyDiv.offsetWidth;
    storyDiv.classList.add("fade")
    storyDiv.classList.remove("glitch");
    const text = typeof scene.text === "function"? scene.text(): scene.text;

    if(sceneId === "badEnding"){
        storyDiv.classList.add("glitch");
    }

    typeText(text);

    const choices = document.getElementById("choices");
    choices.innerHTML = "";
    const choicesList = typeof scene.choices === "function"? scene.choices(): scene.choices;
    choicesList.forEach(choices => {
        const button = document.createElement("button");

        button.textContent = choice.text;

        button.onclick = () =>{
            if (choice.action){
                choice.action();
            }
            loadScene(choice.next);
        };
        choices.appendChild(button);
        })
    if(sceneId === "secretEnding"){
        unlockEnding("The Letters");
    }
    updateEndingList();
    updateInventory();
    updateCompletion();
}
function unlockEnding(name){
    ending.add(name);
    localStorage.setItem("endings", JSON.stringify([...endings]));
}
function updateInventory(){
    const inventory = document.getElementById("inventory-items");
    inventory.innerHTML = "";

    if(player.rustKey){
        inventory.innerHTML += "<p>🔑 Rusty Key</p>";
    }
    if(inventory.innerHTML === ""){
        inventory.textContent = "Empty";
    }
}
function updateCompletion(){
    const totalEndings = 3;

    document.getElementById("completion").textContent = `Completion: ${endings.size}/${totalEndings}`;
}