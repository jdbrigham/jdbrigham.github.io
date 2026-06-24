// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = '',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Diplomat (Dan Hicks)",
                "duration": "3:51",
                "file": "01 Diplomat"
            }, {
                "track": 2,
                "name": "Nebraska Sunrise (Chip Hayden)",
                "duration": "1:17",
                "file": "02 Nebraska Sunrise"
            }, {
                "track": 3,
                "name": "Biloxi (Jessie Winchester)",
                "duration": "3:03",
                "file": "03 Biloxi"
            }, {
                "track": 4,
                "name": "04 Eyes on the Prize (M. Ward)",
                "duration": "2:43",
                "file": "04 Eyes on the Prize"
            }, {
                "track": 5,
                "name": "My Blues (Chip Hayden)",
                "duration": "4:01",
                "file": "05 My Blues"
            }, {
                "track": 6,
                "name": "Shake Sugaree (Elizabeth Cotten)",
                "duration": "3:05",
                "file": "06 Shake Sugaree"
            }, {
                "track": 7,
                "name": "To Ramona",
                "duration": "4:26",
                "file": "07 To Ramona"
            }, {
                "track": 8,
                "name": "The Next One",
                "duration": "4:09",
                "file": "08 The Next One"
            }, {
                "track": 9,
                "name": "Old Love (Mary Chapin Carpenter)",
                "duration": "4:44",
                "file": "09 Old Love"
            }, {
                "track": 10,
                "name": "Pure Joy (M. Ward)",
                "duration": "3:00",
                "file": "10 Pure Joy"
            }, {
                "track": 11,
                "name": "Blue Moon Night (E. Gilkeson)",
                "duration": "4:53",
                "file": "11 Blue Moon Night"
            }, {
                "track": 12,
                "name": "Take it with Me (Tom Waits)",
                "duration": "4:09",
                "file": "12 Take it with Me"
            }, {
                "track": 13,
                "name": "Nebraska Sunset (Chip Hayden)",
                "duration": "1:44",
                "file": "13 Nebraska Sunset"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.m4a' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});