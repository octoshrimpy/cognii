
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


  //every 5 seconds: 5 second warmup, 5 second playing, 5 second cooldown: 15 seconds total

  //get new file from same array

  // grab a 15 second clip from the file

    //get file length

    // subtract 15 seconds from file length

    // get random time between 0 and subtraction above

    // create new audio, set starting time to math above

  // fade in for 5 seconds

  // play for 5 seconds

  // grab new 15 second clip from new file

  // fade out first file

  // fade in second file


})
