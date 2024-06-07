function scroll(){
    return `
    var scrollHeight = 0
    var scrollDown = true
    var scrollValue = 200
    function random(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    setInterval(() => {
        var scrollLimit = document.body.offsetHeight - window.innerHeight;
        if (scrollDown){
            if (scrollHeight < scrollLimit)
                scrollHeight += random(50, scrollValue);
            else
                scrollDown = false;
        }else{
            if (scrollHeight > 0)
                scrollHeight -= random(50, scrollValue);
            else
                scrollDown = true;
        }
        window.scrollTo(0, (scrollHeight > scrollLimit ? scrollLimit : scrollHeight < 0 ? 0 : scrollHeight))
    }, 1000)
    `
}

module.exports = {
    scroll: scroll
}