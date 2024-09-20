import { trackList } from './trackList.js';

console.log(trackList);

const audio = document.querySelector('audio');
const playPauseBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const progress = document.querySelector('.progress');
const songTitle = document.querySelector('.song-title');
const songAuthor = document.querySelector('.song-author');
const cover = document.querySelector('.cover-img');
const overlay = document.querySelector('.overlay');
const durationTime = document.querySelector('.duration-time');
const currentTimeWrap = document.querySelector('.current-time');

let isPlay = false;
let currentId = 0;

function init(song) {
  songTitle.innerHTML = song.title;
  songAuthor.innerHTML = song.author;
  audio.src = song.src;
  cover.src = song.cover;
  overlay.style.backgroundImage = `url('${song.cover}')`;
  isPlay = false;
}

init(trackList[currentId]);


function playPauseSong() {
  if (!isPlay) {
    audio.play();
    playPauseBtn.innerHTML =
      '<svg width="50" height="50" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 33C0 51.2254 14.7746 66 33 66C51.2254 66 66 51.2254 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33ZM29 19C29 18.4477 28.5523 18 28 18H24C23.4477 18 23 18.4477 23 19V47C23 47.5523 23.4477 48 24 48H28C28.5523 48 29 47.5523 29 47V19ZM42 19C42 18.4477 41.5523 18 41 18H37C36.4477 18 36 18.4477 36 19V47C36 47.5523 36.4477 48 37 48H41C41.5523 48 42 47.5523 42 47V19Z" fill="white"/></svg>';
    isPlay = true;
  } else {
    audio.pause();
    playPauseBtn.innerHTML =
      '<svg width="50" height="50" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M33 66C51.2254 66 66 51.2254 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33C0 51.2254 14.7746 66 33 66ZM23.5 49.4545L52 33L23.5 16.5455V49.4545Z" fill="white"/></svg>';
    isPlay = false;
  }
}

function playNextSong() {
  currentId++;
  if (currentId > trackList.length - 1) {
    currentId = 0;
  }
  init(trackList[currentId]);
  playPauseSong();
  console.log(trackList);
}

function playPrevSong() {
  currentId--;
  if (currentId < 0) {
    currentId = trackList.length - 1;
  }
  init(trackList[currentId]);
  playPauseSong();
}


playPauseBtn.addEventListener('click', playPauseSong);