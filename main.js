
const audioSources = {
  'classical': {
    'src': './classical',
    'files': [
      '0',
      '1',
      '2'
    ]
  },
  'hard': {
    'src': './hard',
    'files': [
      '0',
      '1',
      '2'
    ]
  },
  'meditation': {
    'src': './meditation',
    'files': [
      '0',
      '1',
      '2'
    ]
  }
}


$(document).ready(function(){

  let currentlyPlaying = new Audio('');

  // by listening to document, we can make sure the event doesn't
  // get triggered from the current choice. don't have to unload events.
  $(document).on('click', '.choice:not(.is-choice)', function(){
    $('.choice.is-choice').removeClass('is-choice')
    $(this).addClass('is-choice')

    // grab a random file from the folder and play it
    const choice = $(this).data('choice')

    const randFileLoc = audioSources[choice].src
    const randFileArray = audioSources[choice].files
    const randomFileName = randFileArray[Math.floor(Math.random()*randFileArray.length)];


    // console.log(!currentlyPlaying.paused || currentlyPlaying.currentTime)
    if(!currentlyPlaying.paused || currentlyPlaying.currentTime){
      currentlyPlaying.pause()
    }

    currentlyPlaying = new Audio(`${randFileLoc}/${randomFileName}.mp3`)
    currentlyPlaying.play()
  })
})
