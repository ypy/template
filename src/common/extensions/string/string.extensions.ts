interface String {
    replaceAll(match: string, replacement: string);

    trim();

    toNumber();

    toDate();

    isDecimal(): boolean;

    startsWith(search: string): boolean;

    isNullOrEmpty():boolean;

    calcStringPixelsWidthByFixedHeight(
        fontPixSize:number,
        fontFamily:string,
        fontWeight:string,
        fontLinePixHeight:number,
        pixHeight: number,
        startPixWidth: number);

    calcStringPixelsHeightByFixedWidth(
        fontPixSize:number,
        fontFamily:string,
        fontWeight:string,
        fontLinePixHeight:number,
        pixHeight:number)

    calcStringPixelsWidth(
        fontPixSize:number,
        fontFamily:string,
        fontWeight:string);
}

String.prototype.replaceAll = function (match: string, replacement: string) {
    return this.replace(new RegExp(match, 'g'), replacement);
};

String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

String.prototype.toNumber = function () {
    let numberVal = parseInt(this);

    return isNaN(numberVal) ? 0 : numberVal;
};

String.prototype.toDate = function () {
    return new Date(this);
};

String.prototype.isDecimal = function () {
    return (this.indexOf(',') !== -1) || (this.indexOf('.') !== -1);
};

String.prototype.startsWith = function(search) {
    return !this.indexOf(search);
};

String.prototype.isNullOrEmpty = function(){
    return (this === null || this === undefined || this == '');
}

String.prototype.calcStringPixelsWidthByFixedHeight = function(
    fontPixSize:number,
    fontFamily:string,
    fontWeight:string,
    fontLinePixHeight:number,
    pixHeight: number,
    startPixWidth: number) {
    // JS div
    let element = document.createElement("div");
    element.style.fontSize = fontPixSize.toString() + 'px';
    element.style.fontFamily = fontFamily;
    element.style.fontWeight = fontWeight;
    element.style.lineHeight = fontLinePixHeight.toString() + 'px';
    element.style.width = startPixWidth.toString() + "px";
    element.style.height = pixHeight.toString() + "px";
    element.style.overflow = "auto";
    element.style.visibility = "hidden";

    // add span
    document.body.appendChild(element);
    element.innerHTML = this;

    //continue to has no scroll
    while(element.scrollHeight > element.clientHeight
        || element.scrollWidth > element.clientWidth){
        startPixWidth +=2;
        element.style.width = startPixWidth + "px";
    }

    document.body.removeChild(element);

    return startPixWidth;
};

String.prototype.calcStringPixelsWidth = function(
    fontPixSize:number,
    fontFamily:string,
    fontWeight:string) {

    // JS div
    let element = document.createElement("span");
    element.style.fontSize = fontPixSize + 'px';
    element.style.fontFamily = fontFamily;
    element.style.fontWeight = fontWeight;
    element.style.visibility = "hidden";

    // add span
    document.body.appendChild(element);
    element.innerHTML = this;
    var width = element.offsetWidth + 1;

    document.body.removeChild(element);

    return width;
}

String.prototype.calcStringPixelsHeightByFixedWidth = function(
    fontPixSize:number,
    fontFamily:string,
    fontWeight:string,
    fontLinePixHeight:number,
    pixWidth:number) {

    // JS div
    let element = document.createElement("div");
    element.style.fontSize = fontPixSize + 'px';
    element.style.fontFamily = fontFamily;
    element.style.fontWeight = fontWeight;
    element.style.lineHeight = fontLinePixHeight.toString() + 'px';
    element.style.width = pixWidth.toString() + "px";
    element.style.visibility = "hidden";

    // add span
    document.body.appendChild(element);
    element.innerHTML = this;
    var height = element.offsetHeight + 1;

    document.body.removeChild(element);

    return height;
}
