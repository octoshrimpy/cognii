
const audioSources = {
  // 'classical': {
  //   'src': './classical',
  //   'files': [
  //     '0',
  //     '1',
  //     '2'
  //   ]
  // },
  // 'hard': {
  //   'src': './hard',
  //   'files': [
  //     '0',
  //     '1',
  //     '2'
  //   ]
  // },
  'meditation': {
    'src': './meditation',
    'files': [
      '0',
      '1',
      '2'
    ]
  },
  'forest': {
    'src': './ambient/forest',
    'files': [
      '0',
    ]
  },
  'fire': {
    'src': './ambient/fire',
    'files': [
      // '0',
      '1',
      // '2',
    ]
  },
  'rain': {
    'src': './ambient/rain',
    'files': [
      '0',
      '1',
    ]
  },
  'seagulls': {
    'src': './ambient/seagulls',
    'files': [
      '0',
    ]
  },
  'stream': {
    'src': './ambient/stream',
    'files': [
      '0',
    ]
  },
  'thunder': {
    'src': './ambient/thunder',
    'files': [
      '0',
      '1',
    ]
  },
  'wind': {
    'src': './ambient/wind',
    'files': [
      '0',
    ]
  }
}

////////////////////////////////////////////////////////////

//         commented while trying to figure out
//         how to import from json the easy way.

////////////////////////////////////////////////////////////

// var audioSources = (function() {
//   var json = null;
//   $.ajax({
//       'async': false,
//       'global': false,
//       'url': "/audiosources.json",
//       'dataType': "json",
//       'success': function (data) {
//           json = data;
//       }
//   });
//   return json;
// })();

// const audioSources = {
//
// }





$(document).ready(function(){



  audioDevices = {}
  audioPlaying = {}
  
  function __createAudioDevices(source){
    audioDevices[source] = [
      new Audio(''),
      new Audio('')
    ]
    log(audioDevices)
  }

  function __createChoiceBtn(source){
    const btn = document.createElement('div')
    btn.classList.add('button', 'choice')
    btn.setAttribute('data-choice', source)
    btn.innerHTML = source
    let choices = document.querySelector('.choices')
    choices.append(btn)
  }

  function __switchToBg(){

    const shadeChoice = this.getAttribute('data-shade')
    let selected = document.querySelectorAll('.bg-choice.is-selected')
    selected.forEach(elm => elm.classList.remove('is-selected'))
    this.classList.add('is-selected')
    
    let bgs = document.querySelectorAll('bg')
    bgs.forEach(bg => bg.classList.remove('is-selected'))

    let bg_selected = document.querySelector(`bg.${shadeChoice}`)
    bg_selected.classList.add('is-selected')
  }

  function __toggleAudio(){
    const choice = this.getAttribute('data-choice')
    __toggleLogicAndStyling.call(this, choice)

  }

    
  function __toggleLogicAndStyling(choice){
    // logic

    if(__choiceIsPlaying(choice)){
      console.log('playing; stoping sound . . .')
      clearInterval(audioPlaying[choice])
      fadeOut(__grabPlayingDevice(choice))
    }else {
      console.log('stopped; starting sound . . .')
      play15SecClip(choice)

      audioPlaying[choice] = setInterval(function(){
        play15SecClip(choice)
      }, 15000)
    }

    // styling
    $(this).toggleClass('is-active')
  }


  // create audio elms and buttons from sources available
  for (source in audioSources){
    __createAudioDevices(source)
    __createChoiceBtn(source)
  }

  // toggling a theme
  let bgs = document.querySelectorAll(".bg-choice")

  bgs.forEach(bg => {
    bg.addEventListener('click', __switchToBg)
  })


  // picking a sound option
  let choices = document.querySelectorAll('.choice')
  choices.forEach(choice => choice.addEventListener('click', __toggleAudio))
  
})



function fadeIn(audio, time = 5000){
  audio.volume = 0
  audio.play()
  return new Promise((resolve, reject) =>{
    $(audio).animate({volume: 1}, time, ()=> resolve());
  })
}

function fadeOut(audio, time = 5000){
  $(audio).animate({volume: 0}, time, ()=> {
    audio.pause()
    audio.src = ''
  } )
}


function __grabRandFile(choice){
  const randFileLoc = audioSources[choice].src
  const randFileArray = audioSources[choice].files
  const randomFileName = randFileArray[Math.floor(Math.random()*randFileArray.length)]

  return `${randFileLoc}/${randomFileName}.mp3`
}

function __grabAvailableDevice(choice){
  return audioDevices[choice].filter(device => device.paused || !device.currentTime)[0]
}

function __grabPlayingDevice(choice){
  // console.log(audioDevices[choice])
  return audioDevices[choice].filter(device => !device.paused || device.currentTime)[0]
}

function __choiceIsPlaying(choice){
//   console.log(__grabPlayingDevice(choice))
  return typeof __grabPlayingDevice(choice) == 'undefined' ? false : true;
}

function play15SecClip(choice){

  const fileToPlay = __grabRandFile(choice)

  const availableDevice = __grabAvailableDevice(choice)
  const playingDevice = __grabPlayingDevice(choice)

  fadeOut(playingDevice)

  availableDevice.src = fileToPlay

  let startPoint = ''
  const promise = new Promise((resolve, reject) => {

    if( isNaN(availableDevice.duration) ){
      availableDevice.addEventListener("loadmetadata", function(){
        resolve(availableDevice.duration)
      }, {once: true})
    } else {
      resolve(availableDevice.duration)
    }
  })

  promise
    .then((duration)=>{
      const maxLen = Math.floor(duration) - 15
      startPoint = Math.floor(Math.random() * maxLen)

      console.log(`${fileToPlay}: ${startPoint}`)
    })
    .then(()=>{
      availableDevice.currentTime = startPoint

      fadeIn(availableDevice).then(()=>{
        setTimeout(function(){
          fadeOut(availableDevice)
        }, 10000)
      })
    })
}




















/////////////////////

//TODO: animate between custom light/med/dark themes for the shade selection buttons.
//TODO: create audio objects that are knowledgeable about themselves (like fireplace sparks)
//TODO: figure out why fadeout isn't happening immediately on toggle-off
//TODO: add volume sliders
//TODO: extract length of audio snippets into variable
//TODO: extract TODO into own file
//TODO: extract TODO file into github issues
//TODO: extract audio files into more spread-out audio clips.
//TODO: add intensity slider, that adds more layers at once. (not just 2)
//TODO: extract config of sounds into own JSON file




//DONE: implement night mode switch
//DONE: remove hover from smaller screens ( fake "on" state )
//DONE: figure out colors for night mode
//DONE: mobile interface
//DONE: add toggle function and UX for buttons
//DONE: create UI
//DONE: figure out 5sec fade logic






/////////////////////

let log = (...args) => {
  let message = "\n" + args.join(' ')
  console.log(message)
}