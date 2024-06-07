$(document).ready(async function() {
    $("#keyboard").hide()
    var porxylist = await window.seo.proxylist()
    $("#proxys").val(porxylist)
    var lastClass = ""
    function alertbox(message, type, timer){
        $("#alert").hide()
        $("#alert").show(500)
        $("#alert").removeClass(lastClass)
        $("#alert").addClass('alert-'+type)
        lastClass = 'alert-'+type
        $("#alert").html(message)
        setTimeout(() => {
            $("#alert").hide(100)
            $("#alert").removeClass('alert-'+type)
            lastClass = ""
        }, timer);
    }

    $("#start").click(function() {
        var url = $("#url").val()
        var keyboard = $("#keyboard-i").val() || ""
        var count = $("#count").val()
        var option = $("#option").val()
        if (url.length < 8) return alertbox("URL cant be empty!", 'danger', 5000)
        if (option == "Google")
            if (keyboard <= 0) return alertbox("Keyboard cant be empty!", 'danger', 5000)
        if (count.length <= 0 || parseInt(count) <= 0) return alertbox("Count cant be zero!", 'danger', 5000)
        window.seo.start(url, keyboard, parseInt(count), option)
        alertbox("Process started", 'success', 20000)
    })

    $("#stop").click(function() {
        window.seo.stop()
        alertbox("Process successfully stoped", 'danger', 20000)
    })

    $("#option").change(function(event) {
        if (this.value == "Google")
            $("#keyboard").show(500)
        else
            $("#keyboard").hide(500)
    })
})