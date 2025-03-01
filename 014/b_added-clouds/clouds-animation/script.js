let skyKid, cloudPart

let sky = document.querySelector('.sky');
skyKid = document.querySelector('.sky').children;
let clone = document.querySelector('#cloud');
let cloneChild = document.querySelector('#cloud').children;
cloudPart = document.querySelectorAll('#cloud-back');

for (let num = 1; num < 26; num++) {
    sky.appendChild(clone.cloneNode(true));

    clone.className = 'cloud-' + [num];

    for (let i = 0; i < cloneChild.length; ++i) {
        cloneChild[i].className = 'cloud-part-' + [num];
    }
}