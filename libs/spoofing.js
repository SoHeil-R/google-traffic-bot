module.exports = function(){
    console.log("[SPOOFING]: start spoofing!")
    return `(() =>{
        delete Object.getPrototypeOf(navigator).webdriver
        document.hasFocus = function(){
            return true
        }
        Object.defineProperty(Document.prototype, "hidden", {
            get: function hidden() {
                return false;
            },
            enumerable: true,
            configurable: true
        })
        Object.defineProperty(Document.prototype, "visibilityState", {
            get: function visibilityState() {
                return "visible";
            },
            enumerable: true,
            configurable: true
        })
    })()
    const elementDescriptor=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"offsetHeight")
    Object.defineProperty(HTMLDivElement.prototype,"offsetHeight",{...elementDescriptor,get:function(){return"modernizr"===this.id?1:elementDescriptor.get.apply(this)}})
    `
}