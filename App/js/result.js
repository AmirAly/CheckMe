settings = JSON.parse(localStorage.getItem('settings'));
if (!settings || !settings.logo) {
    settings =
        {
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAACkCAAAAAA7nASIAAACrklEQVR42u3cu26kMBSA4bz/S6GVCwoKiikopnBB4YLCBQWFC5axxzeGTBJlR3sY/acJHIHCp+O7onys7xsf2LBhw4YNGzZs2LBhw4YNGzZs2LBhw4YNGzZsb2378yRe/nm/+t3YsGETZ5M1AGLDhg0bNmzYsGHDhg0bNmzYsGF7ke28gQ0bNmzYsGHDhg2bYJsdtR7n47R9SM9Ga22dLJttttD7rNOq8dHqw7TSFcO0Id0Mi3jbfCfcosufO7dFOpfU9TmtJuG2krZ9rnuedl2ZbibRNucN7Wjt1V/193So2qDNtS3Sq6+aulo7+rRaJNsunlDUxPhr7cW+Kbohp41voaGIPn0RbLNlUWYPStVUsZd1CdGWtfKVm+XahqrXXOLdWD043e5S2YY0YFZ38my+PuvD1/pulUf+Xhub7Gm+c6nMIm1z2STXdfHdabuIP3ehYgFzW20WqTazSzTh4+dPhokduS6jNJveJbrQFo/XL/XAE98ez2LrQyWK53QM+4lNn9eWliD6LWzuRzaxbXJ6Mpb0D7ZzjSW7OcCVc0CYuewt4mu7OaAXPQfs5u4pzt31zOXia7tCNdXLwtdcw/GaK82C51pz2bIL5bXyUm7awn5Hp4XJUqYFr5VDnxmK7ajJFQybGXdJY0kYGe/pbjdqSrDl6BNo25tOQ1N87OLTajDmqvI4ee+It71pSEvbm9a20GvyyYgrO1N6sI22+qjhH0wAL7WtRh3QKlznxtSUyyMiNa/Cbesy3O9bUx0SxROtq7vNAvqLoz2pZ6/Oboth81CFZdrSk/vukaxM2/8NbNiwYcOGDRs2bNhea+PvzLFhw4YNGzZs2LBhw4YNGzZs2LBhO4GN/xuKDRu2X9rOG9iwYcOGDRs2bNiwYcOGDRs2bNiwYcOGDRu2EH8B4ajrnFKix8YAAAAASUVORK5CYII=',
            option1: 'Option 1',
            option2: 'Option 2',
            color1: '#009688',
            color2: '#F44336',
            randomness: '50',
            animation: 'Yes'
        }
}
var animate = settings.animation;
var prop = [];
function initTest() {
    prop = [];
    $('.divyes').css('background-color', '#71bd91');
    $('#hResult').css('font-size', "270px");
    $('#hResult').text('?');
    option1Ratio = parseInt(settings.randomness);
    console.log(option1Ratio);
    for (var i = 0 ; i < option1Ratio; i++) {
        prop.push(settings.option1);
    }
    for (var j = 0 ; j < 100 - option1Ratio; j++) {
        prop.push(settings.option2);
    }
}
$(document).ready(start);
meSpeak.loadConfig("mespeak_config.json"); meSpeak.loadVoice('en-us.json');
function start() {
    var _timeout = 1000;
    if (settings.animation == 'Yes') {
        var w = new WOW({        // default
            mobile: true,       // default
            live: true        // default
        }).init();
    }
    else {
        _timeout = 100;
    }
    initTest();
    setTimeout(function () {
        var res = Math.floor((Math.random() * 100) + 1);
        $('#hResult').text(prop[res]);
        $('#hResult').css('font-size', "120%");
        meSpeak.speak(prop[res]);
        if (res <= option1Ratio)
            $('.divyes').css('background-color', settings.color1);
        else
            $('.divyes').css('background-color', settings.color2);
    }, _timeout);
}