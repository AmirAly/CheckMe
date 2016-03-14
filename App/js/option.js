//image upload fixed height,width
var BaseImg64;
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
function setSettings() {
    $('#img').attr('src', settings.logo);
    $('#txtOption1').val(settings.option1);
    $('#txtOption2').val(settings.option2);
    $('#dvFirstColor').attr('style', 'background-color:' + settings.color1);
    $('#dvSecondColor').attr('style', 'background-color:' + settings.color2);
    $('.' + '_' + settings.randomness).addClass('number1');
    $('.' + '_' + settings.animation).addClass('number1');

}
function showFileSelector() {
    $('#uploadImg').click();
}
function convertImgToBase64URL() {
    var filesSelected = document.getElementById('uploadImg').files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            BaseImg64 = fileLoadedEvent.target.result;
            uploadImage();
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}
function uploadImage() {
    $('#img').attr('src', BaseImg64);

    var img = document.getElementById('img');
    var newImg = imgToDataUri(img, 150, 150);
    $('#img').attr('src', newImg);
    BaseImg64 = newImg;
}
function imgToDataUri(img, width, height) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
}
// change color
function openColorPicker(id) {
    if (id == 1) {
        $('#pallet1').removeClass('hide');
        $('#pallet2').addClass('hide');
    }
    else {
        $('#pallet2').removeClass('hide');
        $('#pallet1').addClass('hide');
    }
}
function changeColor(color, id) {
    if (id == 1) {
        $('#pallet1').addClass('hide');
        $('#dvFirstColor').attr('style', 'background-color:' + color);
        settings.color1 = color;
    }
    else {
        $('#pallet2').addClass('hide');
        $('#dvSecondColor').attr('style', 'background-color:' + color);
        settings.color2 = color;
    }
}

$(document).ready(function () {
    $('.opt_animation').click(
        function () {
            $('.opt_animation').removeClass('number1');
            $(this).addClass('number1');
            settings.animation = $(this).text();
        }
        );
    $('.opt_randomness').click(
        function () {
            $('.opt_randomness').removeClass('number1');
            $(this).addClass('number1');
            settings.randomness = $(this).text().split('-')[0];
        }
        );
    setSettings();
});
function save() {
    settings.logo = $('#img').attr('src');
    settings.option1 = $('#txtOption1').val();
    settings.option2 = $('#txtOption2').val();
    localStorage.setItem('settings', JSON.stringify(settings));
    location.href = 'index.html';
}