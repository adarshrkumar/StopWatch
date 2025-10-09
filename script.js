let dTitle = document.title
let mils = 0
let secs = 0
let mins = 0
let hous = 0
let interval
let time
let element = document.querySelector("#time")
let hElement = element.querySelector('.hours')
let mElement = element.querySelector('.minutes')
let sElement = element.querySelector('.seconds')
let msElement = element.querySelector('.milliseconds')
let button = document.querySelector('button[main]')
let rButton = document.querySelector('button[reset]')
let secondsOnlyToggle = document.querySelector('#seconds-only-toggle')
let totalElapsedMs = 0

button.setAttribute('onclick', 'start(event)')
rButton.setAttribute('onclick', 'reset(event)')
secondsOnlyToggle.addEventListener('change', updateDisplay)

let isIt = false
function start() {
  myTimer()
  interval = setInterval(myTimer, 10)
  button.removeAttribute('onclick')
  button.setAttribute('onclick', 'stop(event)')
  button.innerHTML = 'Stop'
  rButton.removeAttribute('hidden')
}
function stop() {
  clearInterval(interval)
  button.removeAttribute('onclick')
  button.setAttribute('onclick', 'start(event)')
  button.innerHTML = 'Start'
  rButton.removeAttribute('hidden')
}
function reset() {
  clearInterval(interval)
  button.removeAttribute('onclick')
  button.setAttribute('onclick', 'start(event)')
  button.innerHTML = 'Start'
  rButton.setAttribute('hidden', '')
  hous = 0
  mins = 0
  secs = 0
  mils = 0
  totalElapsedMs = 0
  mils = String(mils).padStart(2, '0')
  secs = String(secs).padStart(2, '0')
  mins = String(mins).padStart(2, '0')
  hous = String(hous).padStart(2, '0')
  time = '00:00:00:00'
  updateDisplay()
  document.title = dTitle
  localStorage.removeItem('time')
}

function myTimer() {
  mils = Number(mils) + 1
  totalElapsedMs += 10 // Each tick is 10ms
  
  if (mils >= 99) {
    mils = 0
    secs = Number(secs) + 1
  }
  if (secs >= 59) {
    secs = 0
    mins = Number(mins) + 1
  }
  if (mins >= 59) {
    mins = 0
    hous = Number(hous) + 1
  }
  if (String(mils).split('').length === 1) {
    mils = '0' + mils
  }
  if (String(secs).split('').length === 1) {
    secs = '0' + secs
  }
  if (String(mins).split('').length === 1) {
    mins = '0' + mins
  }
  if (String(hous).split('').length === 1) {
    hous = '0' + hous
  }
  time = `${hous}:${mins}:${secs}:${mils}`
  if (hous >= 99) {
    time = `${99}+ Hours`
  }
  localStorage.setItem('time', time)
  document.title = `${time.split(`:${mils}`)[0]} | StopWatch`
  updateDisplay()
}

function updateDisplay() {
  if (secondsOnlyToggle.checked) {
    // Show only seconds with decimal places
    const totalSeconds = (totalElapsedMs / 1000).toFixed(2)
    element.classList.add('seconds-only')
    hElement.innerHTML = ''
    mElement.innerHTML = ''
    sElement.innerHTML = totalSeconds
    msElement.innerHTML = 's'
  } else {
    // Show normal HH:MM:SS:MS format
    element.classList.remove('seconds-only')
    hElement.innerHTML = hous
    mElement.innerHTML = mins
    sElement.innerHTML = secs
    msElement.innerHTML = mils
  }
}