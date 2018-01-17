$(document).ready(function() {
  $("button#play-pause").click(function() {
    player.playPause();
    $(this).attr("playState", player.playState);
    //Click event: attaches totalTime to DOM element on right of play button.
    $("#time-control .total-time").text(
      player.prettyTime(player.getDuration())
    );
  });

  $("button#next").click(function() {
    if (player.playState !== "playing") {
      return;
    }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex >= album.songs.length) {
      return;
    }

    const nextSong = album.songs[nextSongIndex];
    setSong(nextSong);
  });

  $("button#previous").click(function() {
    if (player.playState !== "playing") {
      return;
    }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const previousSongIndex = currentSongIndex - 1;
    if (previousSongIndex < 0) {
      return;
    }

    const previousSong = album.songs[previousSongIndex];
    setSong(previousSong);
  });
  //Event handler for the time control input
  $("#time-control input").on("input", function(event) {
    player.skipTo(event.target.value);
  });

  $("#volume-control input").on("input", function(event) {
    player.setVolume(event.target.value);
  });

  setInterval(() => {
    //We don't want our setInterval callback function to do anything if a song
    // isn't currently playing, so add a line that executes a return statement
    // If player.playState doesn't equal 'playing'.
    if (player.playState !== "playing") {
      return;
    }

    const currentTime = player.getTime();
    const duration = player.getDuration();
    const percent = currentTime / duration * 100;
    //Changes current running time format-> left of play button to M:SS-> 0:01
    $("#time-control .current-time").text(player.prettyTime(currentTime));
    $("#time-control input").val(percent);
  }, 1000);
  //connects next and previous songs to the totalTime
  function setSong(song) {
    player.playPause(song);
    $("#time-control .total-time").text(player.prettyTime(song.duration));
  }
});
