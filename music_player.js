const audio = document.getElementById('music')
const progressContainer = document.getElementById('progress_container')
const progressBar = document.getElementById('progress')
const prevButton = document.getElementById('prev')
const playButton = document.getElementById('play')
const nextButton = document.getElementById('next')
const trackImage = document.querySelector('img')
const trackTitle = document.getElementById('title')
const albumTitle = document.getElementById('album')
const artistName = document.getElementById('artist')

//Songs
const songs = [
  {
    name: "01 Don't Stop 'Til You Get Enough",
    displayName: "Don't Stop 'Til You Get Enough",
    artist: 'Michael Jackson'
  },
  {
    name: '02 Wasting My Young Years Fading Soul Remix',
    displayName: 'Wasting My Young Years',
    artist: 'London Grammar'
  },
  {
    name: '03 The XX Intro long version',
    displayName: 'The XX Intro',
    artist: 'The XX'
  },
  {
    name: '04 Beat It',
    displayName: 'Beat It',
    artist: 'Michael Jackson'
  }
]

//Check if playing
let isPlaying = false

//Play or Pause Track
function playSong () {
  isPlaying = true
  playButton.classList.replace('fa-play', 'fa-pause')
  playButton.setAttribute('title', 'Pause')
  audio.play()
}
function pauseSong () {
  isPlaying = false
  playButton.classList.replace('fa-pause', 'fa-play')
  playButton.setAttribute('title', 'Play')
  audio.pause()
}

//Play or pause event listeners
playButton.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong()
})

//Update DOM
function loadSong (song) {
  trackTitle.textContent = song.displayName
  artistName.textContent = song.artist
  audio.src = `tracks/${song.name}.mp3`
  trackImage.src = `images/${song.name}.jpg`
}

//Current Song
let songIndex = 0

//Event Listeners
prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)

//Previous Song
function prevSong () {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  console.log(songIndex)
  loadSong(songs[songIndex])
  playSong()
}

//Next Song
function nextSong () {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  console.log(songIndex)
  loadSong(songs[songIndex])
  playSong()
}

//Update Progress Bar and Time
function updateProgressBar (e) {
  if (isPlaying) {
    console.log(e)

    const { duration, currentTime } = e.srcElement
    //console.log(duration, currentTime)

    //Update progress bar width
    const progressPercent = (currentTime / duration) * 100
    //console.log(progressPercent)
    progressBar.style.width = `${progressPercent}%`

    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60)
    console.log(durationMinutes)

    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
      durationSeconds = `0{durationSeconds}`
    }
    console.log('seconds:', durationSeconds)
  }
}

//Event Listeners
prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgressBar)

//On load - select song
loadSong(songs[songIndex])
