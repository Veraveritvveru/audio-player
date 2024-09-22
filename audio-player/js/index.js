import { trackList } from './trackList.js';

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
let duration;
let isShuffled = false;
let isRepeated = false;

function addNull(time) {
  return time < 10 ? `0${time}` : time;
}

function formatDuration(duration) {
  let minutes = addNull(Math.floor(duration / 60));
  let seconds = addNull(Math.floor(duration - minutes * 60));
  return `${minutes}:${seconds}`;
}

function init(song) {
  songTitle.innerHTML = song.title;
  songAuthor.innerHTML = song.author;
  audio.src = song.src;
  cover.src = song.cover;
  overlay.style.backgroundImage = `url('${song.cover}')`;
  isPlay = false;
  if (song.isLiked) {
    document.querySelector('.like-svg').classList.add('liked');
  } else {
    document.querySelector('.like-svg').classList.remove('liked');
  }
  audio.addEventListener('loadeddata', () => {
    progress.max = audio.duration;
    duration = formatDuration(audio.duration);
    durationTime.innerHTML = `${duration}`;
  })
}

init(trackList[currentId]);

function playPauseSong() {
  if (!isPlay) {
    audio.play();
    playPauseBtn.innerHTML =
      '<svg width="50" height="50" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 33C0 51.2254 14.7746 66 33 66C51.2254 66 66 51.2254 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33ZM29 19C29 18.4477 28.5523 18 28 18H24C23.4477 18 23 18.4477 23 19V47C23 47.5523 23.4477 48 24 48H28C28.5523 48 29 47.5523 29 47V19ZM42 19C42 18.4477 41.5523 18 41 18H37C36.4477 18 36 18.4477 36 19V47C36 47.5523 36.4477 48 37 48H41C41.5523 48 42 47.5523 42 47V19Z" fill="white"/></svg>';
    isPlay = true;
    updateProgress();
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
}

function playPrevSong() {
  currentId--;
  if (currentId < 0) {
    currentId = trackList.length - 1;
  }
  init(trackList[currentId]);
  playPauseSong();
}

function updateProgress() {
  let currentTime = formatDuration(audio.currentTime);
  currentTimeWrap.innerHTML = `${currentTime}`;
  progress.value = audio.currentTime;
}

progress.addEventListener('input', () => {
  audio.currentTime = progress.value ;
})

const like = document.querySelector('.like');
like.addEventListener('click', likeSong);

function likeSong() {
  if (!trackList[currentId].isLiked) {
    document.querySelector('.like-svg').classList.add('liked');
    trackList[currentId].isLiked = true;
  } else {
    document.querySelector('.like-svg').classList.remove('liked');
    trackList[currentId].isLiked = false;
  }
}

const volume = document.querySelector('.volume');
volume.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    volume.innerHTML = '<svg width="25px" height="25px" viewBox="0 -1.5 31 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>volume-full</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -569.000000)" fill="#fff"> <path d="M270,593 L263,588.625 L263,577.375 L270,573 L270,593 L270,593 Z M261,586 C261,586.553 260.552,587 260,587 L259,587 C258.448,587 258,586.553 258,586 L258,580 C258,579.448 258.448,579 259,579 L260,579 C260.552,579 261,579.448 261,580 L261,586 L261,586 Z M270,571 L261,577 L258,577 C256.896,577 256,577.896 256,579 L256,587 C256,588.104 256.896,589 258,589 L261,589 L270,595 C271.104,595 272,594.104 272,593 L272,573 C272,571.896 271.104,571 270,571 L270,571 Z M281,583 C281,579.477 278.388,576.59 275,576.101 L275,578.101 C277.282,578.564 279,580.581 279,583 C279,585.419 277.282,587.436 275,587.899 L275,589.899 C278.388,589.41 281,586.523 281,583 L281,583 Z M275,569.015 L275,571.068 C280.872,572.199 285,576.988 285,583 C285,588.978 281,593.609 275,594.932 L275,596.986 C281.776,595.994 287,590.143 287,583 C287,575.857 281.776,570.006 275,569.015 L275,569.015 Z" id="volume-full" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>'
  } else {
    audio.muted = true;
    volume.innerHTML = '<svg width="25" height="25" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 20.0322L7 16.0806V5.91933L14 1.96772V20.0322ZM5 13.7097C5 14.2091 4.552 14.6129 4 14.6129H3C2.448 14.6129 2 14.2091 2 13.7097V8.2903C2 7.79172 2.448 7.38707 3 7.38707H4C4.552 7.38707 5 7.79172 5 8.2903V13.7097ZM14 0.161263L5 5.58062H2C0.896 5.58062 0 6.38991 0 7.38707V14.6129C0 15.61 0.896 16.4193 2 16.4193H5L14 21.8387C15.104 21.8387 16 21.0294 16 20.0322V1.96772C16 0.970554 15.104 0.161263 14 0.161263ZM23.7929 11.2525L27 14.4596L25.5858 15.8738L22.3787 12.6667L19.1716 15.8738L17.7574 14.4596L20.9645 11.2525L17.8836 8.17157L19.2978 6.75736L22.3787 9.83825L25.4596 6.75736L26.8738 8.17157L23.7929 11.2525Z" fill="white"/></svg>'
  }
})

function shuffleSongs() {
  if (!isShuffled) {
    document.querySelector('.shuffle-icon').classList.add('active');
    isShuffled = true;
  } else {
    document.querySelector('.shuffle-icon').classList.remove('active');
    isShuffled = false;
  }
  shuffle(trackList);
}

function shuffle(arr) {
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function repeatSong() {
  const repeatIcon = document.querySelector('.repeat-icon');
  if (!isRepeated) {
    repeatIcon.classList.add('active');
    audio.loop = true;
    isRepeated = true;
  } else {
    repeatIcon.classList.remove('active');
    audio.loop = false;
    isRepeated = false;
  }
}

//listeners
playPauseBtn.addEventListener('click', playPauseSong);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', playNextSong);
document.querySelector('.shuffle').addEventListener('click', shuffleSongs);
document.querySelector('.repeat').addEventListener('click', repeatSong);
document.querySelector('.cover-wrapper').addEventListener('click', playPauseSong);
