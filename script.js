let dTitle = document.title
let mils = 00
let secs = 00
let mins = 00
let hous = 00
let interval
let time
let element = document.querySelector("#time")
let hElement = element.querySelector(':nth-child(1)')
let mElement = element.querySelector(':nth-child(2)')
let sElement = element.querySelector(':nth-child(3)')
let msElement = element.querySelector(':nth-child(4)')
let button = document.querySelector('button[main]')
let rButton = document.querySelector('button[reset]')

button.setAttribute('onclick', 'start(event)')
rButton.setAttribute('onclick', 'reset(event)')

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
  hous = 00
  mins = 00
  secs = 00
  mils = 00
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
  time = '00:00:00:00'
  hElement.innerHTML = hous
  mElement.innerHTML = mins
  sElement.innerHTML = secs
  msElement.innerHTML = mils
  document.title = dTitle
  localStorage.removeItem('time')
}

function myTimer() {
  mils = Number(mils) + 1
  if (mils >= 99) {
    mils = 00
    secs = Number(secs) + 1
  }
  if (secs >= 59) {
    secs = 00
    mins = Number(mins) + 1
  }
  if (mins >= 59) {
    mins = 00
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
  hElement.innerHTML = hous
  mElement.innerHTML = mins
  sElement.innerHTML = secs
  msElement.innerHTML = mils
}