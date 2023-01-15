class Song {
    constructor(name, artist) {
        this.name = name;
        this.artist = artist;

    }
}
class Album {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }
    deleteSong(song) {
        let index = this.songs.indexOf(song);
        this.songs.splice(index,1);
    }
}

let albums = [];
let albumId = 0;

onClick("new-album", () => {
    albums.push(new Album(albumId++, getValue('new-album-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener("click", action);
    return element;
}
function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let albumDiv = document.getElementById("albums");
    clearElement(albumDiv);
    for (album of albums) {
        let table = createAlbumTable(album);
        let title = document.createElement('h2');
        title.innerHTML = album.name;
        title.appendChild(createDeleteAlbumButton(album));
        albumDiv.appendChild(title);
        albumDiv.appendChild(table);
        for (song of album.songs) {
            createSongRow(album, table, song);
        }
    }
}
function createSongRow(album, table, song) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = song.name;
    row.insertCell(1).innerHTML = song.artist;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(album, song));
}

function createDeleteRowButton(album, song) {
    let btn = document.createElement("button");
btn.className = 'btn btn-light';
btn.innerHTML = 'Delete';
btn.onclick = () => {
    let index = album.songs.indexOf(song);
    album.songs.splice(index, 1);
    drawDOM();

    


}}
createDeleteRowButton();

function createDeleteAlbumButton(album) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-dark';
    btn.innerHTML = 'Delete Album';
    btn.onclick = () => {
        let index = albums.indexOf(album);
        albums.splice(index, 1);
        drawDOM();

    };
    return btn;
}

function createNewSongButton(album) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        album.songs.push(new Song(getValue(`name-input-${album.id}`), getValue(`artist-input-${album.id}`)));
        drawDOM();
    };
    return btn;
}

function createAlbumTable(album) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let artistColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    artistColumn.innerHTML = "Artist";
    row.appendChild(nameColumn);
    row.appendChild(artistColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let artistTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${album.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let artistInput = document.createElement('input');
    artistInput.setAttribute('id', `artist-input-${album.id}`);
    artistInput.setAttribute('type', 'text');
    artistInput.setAttribute('class', 'form-control');
    let newSongButton = createNewSongButton(album);
    nameTh.appendChild(nameInput);
    artistTh.appendChild(artistInput);
    createTh.appendChild(newSongButton);
    formRow.appendChild(nameTh)
    formRow.appendChild(artistTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
