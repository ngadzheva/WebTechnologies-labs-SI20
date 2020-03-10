function ajax(url, settings){
    var xhr = new XMLHttpRequest();

    xhr.onload = function(){
        if (xhr.status == 200) {
            settings.success(xhr.responseText);
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.open(settings.method || 'GET', url, /* async */ true);
    xhr.send(settings.data || null);
}

(function() {
    var url = 'https://jsonplaceholder.typicode.com/users'; 
    var callback = function (text) {
        console.log(text);  // do something with the data
    };

    ajax(url, {success: callback});
}());
