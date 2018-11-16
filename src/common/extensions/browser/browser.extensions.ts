export function popupCenter(url, title = '', width = 575, height = 400) {
    let dualScreenLeft = window.screenLeft;
    let dualScreenTop = window.screenTop;

    let windowWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    let left = ((windowWidth / 2) - (width / 2)) + dualScreenLeft;
    let top = ((windowHeight / 2) - (height / 2)) + dualScreenTop;
    let newWindow = window.open(url, title, `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`);

    if (window.focus) {
        newWindow.focus();
    }
}