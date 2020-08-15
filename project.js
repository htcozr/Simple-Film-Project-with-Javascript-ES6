const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];//ikinci card body
const clear = document.getElementById("clear-films");



//tüm eventleri yükleme 

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
        document.addEventListener("DOMContentLoaded",function(){
            let films = Storage.getFilmsFromStorage();
            films.forEach(film => {
                UI.addFilmToUI(film);
            });  
    });
    /* Bu şekilde çalışıyor daha kolay hatta
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        films.forEach(film => {
            ui.addFilmToUI(film);
        });  
    });
    */   
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        //hata mesajı
        UI.displayMessage("Tüm alanları doldurunuz..","danger");
    }
    else {
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm); // arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // storagea film ekleme
        UI.displayMessage("Film başarıyla eklendi!!","success");

    }
    UI.clearInput(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm (e) {
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessage("Silme işlemi başarılı!!", "success");
    }
}

function clearAllFilms(){
    UI.cleartAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
}