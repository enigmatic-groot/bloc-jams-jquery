{
  $('button#play-pause').on('click', function() {
    player.playPause();
    $(this).attr('playState', player.playState);
  });
  $('button#next').on('click', function() {
    if (player.playState !== 'playing') {return; }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    if (player.playState !== 'playing') {return; }
    const nextSong = album.songs[nextSongIndex];
    player.playPause(nextSong);
  });

  $('#time-control input').on('input', function(event) {
    player.skipTo(event.target.value);
  });

  setInterval ( () => {
  //We don't want our setInterval callback function to do anything if a song
// isn't currently playing, so add a line that executes a return statement
// If player.playState doesn't equal 'playing'.
  if (player.playState !== 'playing') { return; }
  const currentTime = player.getTime();
  const duration = player.getDuration();
  const percent = (currentTime/ duration) * 100;
  $('#time-control .current-time').text( currentTime );
  $('#time-control input').val(percent);
  }, 1000);


  $('button#previous').on('click', function() {
    if (player.playState !== 'playing') {return; }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const previousSongIndex = currentSongIndex - 1;
    if (player.playState !== 'playing') {return; }
    const nextSong = album.songs[previousSongIndex];
    player.playPause(nextSong);
  });








}
