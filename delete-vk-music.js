//scroll down at max
function scrollDown(callback) {
    let scroll = document.body.scrollHeight;
    let lastScroll = scroll;

    window.scrollTo(0, document.body.scrollHeight);

    requestAnimationFrame(() => {
        scroll = document.body.scrollHeight;

        if (scroll != lastScroll) {
            scrollDown(callback);
        } else {
            callback();
        }
    });
}

scrollDown(() => {
    var list = document.querySelectorAll('.audio_row');
    console.log(`Total songs: ${list.length}`);

    const del = (obj, delay) => {
        setTimeout(() => {
            console.log(`delete ${obj.title}`);
            ajax.post('al_audio.php', {
                act: 'delete_audio',
                oid: obj.ownerId,
                aid: obj.id,
                hash: obj.deleteHash,
                track_code: obj.track_code,
                restore: 1
            });
        }, delay);
    };

    list.forEach((el, index) => {
        const [id, ownerId, , title, artist, , , , , , , , , hash, , , , , , , track_code] =
            AudioUtils.getAudioFromEl(el);
        const [, , , deleteHash] = hash.split('/');

        const obj = { id, ownerId, title, artist, deleteHash, track_code };

        del(obj, index * 500);
    });
});
