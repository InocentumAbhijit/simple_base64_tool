const resultView = document.getElementById('result_view');
const resultHeader = document.getElementById('result_header');
const resultBox = document.getElementById('result_box');
const resultImage = document.getElementById('result_image');
const copyBtn = document.getElementById('copy_btn');

function encodeImage() {
    hideAll();
    let file = document.getElementById('file').value;
    document.getElementById('imgFileErr').innerHTML = '';
    if (file === '') {
        document.getElementById('imgFileErr').innerHTML = 'Image is required';
        return;
    }
    let reader = new FileReader();
    if (file.files[0]) {
        if (file.files[0].size <= 1024 * 1024) {
            reader.readAsDataURL(file.files[0]);
            reader.onload = function () {
                displayString();
                resultHeader.innerHTML = 'Encoded image:';
                resultBox.innerHTML = reader.result.toString();
            };
        } else alert('File size too big');
    }
}

function decodeImage() {
    hideAll();
    let image = document.getElementById('image').value;
    document.getElementById('encodedImgErr').innerHTML = '';
    if (image === '') {
        document.getElementById('encodedImgErr').innerHTML = 'base64 is required';
        console.log("abcd");
        return;
    } else {
        document.getElementById('encodedImgErr').innerHTML = '';
    }
    displayImage();
    resultHeader.innerHTML = 'Decoded image:';
    resultImage.src = image;
}

function encodeString() {
    hideAll();
    let text = document.getElementById('text').value;
    document.getElementById('strEncodeErr').innerHTML = '';
    if (text === '') {
        document.getElementById('strEncodeErr').innerHTML = 'String is required';
        return;
    } else {
        document.getElementById('strEncodeErr').innerHTML = '';
    }
    displayString();
    resultHeader.innerHTML = 'Encoded string:';
    resultBox.innerHTML = btoa(text.value);
}

function decodeString() {
    let text = document.getElementById('e_text').value;
    document.getElementById('encodedStrErr').innerHTML = '';
    if (text === '') {
        document.getElementById('encodedStrErr').innerHTML = 'Encoded String is required';
        return;
    } else {
        document.getElementById('encodedStrErr').innerHTML = '';
    }
    hideAll();
    displayString();
    resultHeader.innerHTML = 'Decoded string:';
    resultBox.innerHTML = atob(text.value);
}

function hashString() {
    let text = document.getElementById('text2').value;
    document.getElementById('SHA1StrErr').innerHTML = '';
    if (text === '') {
        document.getElementById('SHA1StrErr').innerHTML = 'String is required';
        console.log("mnm");
        return;
    } else {
        document.getElementById('SHA1StrErr').innerHTML = '';
    }
    hideAll();
    displayString();
    resultHeader.innerHTML = 'SHA1 hashed string:';
    resultBox.innerHTML = sha1(text.value);
}

function displayString() {
    resultView.style.display = 'block';
    resultHeader.style.display = 'block';
    resultBox.style.display = 'block';
    copyBtn.style.display = 'block';
    resultView.scrollIntoView({ behavior: "smooth", block: "end" });
}

function displayImage() {
    resultView.style.display = 'block';
    resultHeader.style.display = 'block';
    resultImage.style.display = 'block';
    resultView.scrollIntoView({ behavior: "smooth", block: "end" });
}

function hideAll() {
    resultHeader.style.removeProperty('display');
    resultBox.style.removeProperty('display');
    resultImage.style.removeProperty('display');
    resultView.style.removeProperty('display');
    copyBtn.style.removeProperty('display');
}

function copyToClipboard() {
    let tempInput = document.createElement('textarea');
    tempInput.value = resultBox.innerHTML;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999999); /*For mobile devices*/
    document.execCommand("copy");
    tempInput.remove();
    alert("Text copied to clipboard");

}

function sha1(str) {
    //  discuss at: https://locutus.io/php/sha1/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    // improved by: Michael White (https://getsprink.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Keep in mind that in accordance with PHP, the whole string is buffered and then
    //      note 1: hashed. If available, we'd recommend using Node's native crypto modules directly
    //      note 1: in a steaming fashion for faster and more efficient hashing
    //   example 1: sha1('Kevin van Zonneveld')
    //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

    var hash
    try {
        var crypto = require('crypto')
        var sha1sum = crypto.createHash('sha1')
        sha1sum.update(str)
        hash = sha1sum.digest('hex')
    } catch (e) {
        hash = undefined
    }

    if (hash !== undefined) {
        return hash
    }

    var _rotLeft = function (n, s) {
        var t4 = (n << s) | (n >>> (32 - s))
        return t4
    }

    var _cvtHex = function (val) {
        var str = ''
        var i
        var v

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f
            str += v.toString(16)
        }
        return str
    }

    var blockstart
    var i, j
    var W = new Array(80)
    var H0 = 0x67452301
    var H1 = 0xEFCDAB89
    var H2 = 0x98BADCFE
    var H3 = 0x10325476
    var H4 = 0xC3D2E1F0
    var A, B, C, D, E
    var temp

    // utf8_encode
    str = unescape(encodeURIComponent(str))
    var strLen = str.length

    var wordArray = []
    for (i = 0; i < strLen - 3; i += 4) {
        j = str.charCodeAt(i) << 24 |
            str.charCodeAt(i + 1) << 16 |
            str.charCodeAt(i + 2) << 8 |
            str.charCodeAt(i + 3)
        wordArray.push(j)
    }

    switch (strLen % 4) {
        case 0:
            i = 0x080000000
            break
        case 1:
            i = str.charCodeAt(strLen - 1) << 24 | 0x0800000
            break
        case 2:
            i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000
            break
        case 3:
            i = str.charCodeAt(strLen - 3) << 24 |
                str.charCodeAt(strLen - 2) << 16 |
                str.charCodeAt(strLen - 1) <<
                8 | 0x80
            break
    }

    wordArray.push(i)

    while ((wordArray.length % 16) !== 14) {
        wordArray.push(0)
    }

    wordArray.push(strLen >>> 29)
    wordArray.push((strLen << 3) & 0x0ffffffff)

    for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
            W[i] = wordArray[blockstart + i]
        }
        for (i = 16; i <= 79; i++) {
            W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
        }

        A = H0
        B = H1
        C = H2
        D = H3
        E = H4

        for (i = 0; i <= 19; i++) {
            temp = (_rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff
            E = D
            D = C
            C = _rotLeft(B, 30)
            B = A
            A = temp
        }

        for (i = 20; i <= 39; i++) {
            temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff
            E = D
            D = C
            C = _rotLeft(B, 30)
            B = A
            A = temp
        }

        for (i = 40; i <= 59; i++) {
            temp = (_rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff
            E = D
            D = C
            C = _rotLeft(B, 30)
            B = A
            A = temp
        }

        for (i = 60; i <= 79; i++) {
            temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff
            E = D
            D = C
            C = _rotLeft(B, 30)
            B = A
            A = temp
        }

        H0 = (H0 + A) & 0x0ffffffff
        H1 = (H1 + B) & 0x0ffffffff
        H2 = (H2 + C) & 0x0ffffffff
        H3 = (H3 + D) & 0x0ffffffff
        H4 = (H4 + E) & 0x0ffffffff
    }

    temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4)
    return temp.toLowerCase()
}