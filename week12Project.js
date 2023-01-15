class Album {
    constructor(name) {
        this.name = name;
        this.songs = [];
    }

    addSong(name, artist) {
        this.songs.push(new Song(name, artist));
    }
}

class Song {
    constructor(name, artist) {
        this.name = name;
        this.artist = artist;
    }
}

class AlbumService {
    static url = 'https://63c0ba2271656267186c2468.mockapi.io/albums'
    


    static getAllAlbums() {
        return $.get(this.url);
    }

    static getAlbum(id) {
        return $.get(this.url + `/${id}`);
    }

    static createAlbum(album) {
        return $.post(this.url, album);
    }

    static updateAlbum(album) {
        return $.ajax({
            url: this.url + `/${album._id}`,
            dataType: 'json',
            data: JSON.stringify(album),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteAlbum(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'

        });
    }
}

class DOMManager {
    static albums;

    static getAllAlbums() {
        AlbumService.getAllAlbums().then(albums => this.render(albums));
    }

    static createAlbum(name) {
        AlbumService.createAlbum(new Album(name))
        .then(() => {
            return AlbumService.getAllAlbums();
        })
        .then((albums) => this.render(albums));
    }
     static deleteAlbum(id) {
       AlbumService.deleteAlbum(id)
       .then(() => {
        return AlbumService.getAllAlbums();
       })
       .then((albums) => this.render(albums));
     }

     static addSong(id) {
        for (let album of this.albums) {
            if(album._id == id) {
                album.songs.push(new Song($(`#${album._id}-song-name`).val(), $(`#${album._id}-song-artist`).val()));
                AlbumService.updateAlbum(album)
                .then(() => {
                    return AlbumService.getAllAlbums();

                })
                .then((albums) => this.render(albums));
            }
        }
     }

     static deleteSong(albumId, songId) {
        for (let album of this.albums) {
            if (album._id == albumId) {
                for (let song of album.songs) {
                    if (song._id == songId) {
                        album.songs.splice(album.songs.indexOf(song), 1);
                        AlbumService.updateAlbum(album)
                            .then(() => {
                                return AlbumService.getAllAlbums
                            })
                            .then((albums) => this.render(albums));
                    }
                }
            }
        }
     }


    static render(albums) {
        this.albums = albums;
        $('#app').empty();
        for(let album of albums) {
            $('#app').prepend(
                `<div id="${album._id}" class="card">
                    <div class="card-header">
                        <h2>${album.name}</h2>
                        <button class="btn btn-danger" onclick="DOMManager.deleteAlbum('${album._id}')"> Delete </button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${album._id}-song-name" class="form-control" placeholder="Song Name">

                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${album._id}-song-artist" class="form-control" placeholder="Song Artist">

                                </div>
                            </div>
                            <button id="${album._id}-new-song" onclick="DOMManager.addSong('${album._id}')" class="btn btn-primary form-control"> Add</button>
                        </div>

                    </div>
                </div><br>`

            );
            for (let song of album.songs) {
                $(`#${album._id}`).find('.card-body').append(
                    `<p>
                        <span id="name-${song._id}"><strong>Name: </strong> ${song.name}</span>
                        <span id="artist-${song._id}"><strong>Artist: </strong> ${song.artist}</span>
                        <button class="btn btn-danger" onclick="DOMManager.deleteSong('${album._id}', '${song._id}')">Delete Song</button>
                    `
                );
                
            }
           
        }
           
    }
        /*static display(albums) {
            fetch("https://63c0ba2271656267186c2468.mockapi.io/albums")
            .then((res) => res.json())
            .then((data) => {
                $('#app').empty();
                for (let album of data) {
                    let songs = AlbumService.getSongArtists(album._id);
                }
            })*/

    
                
}

$('#create-new-album').click(() => {
    DOMManager.createAlbum($('#new-album-name').val());
    $('#new-album-name').val('');

}
)
DOMManager.getAllAlbums();