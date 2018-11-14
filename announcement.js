function send_data(name, content)
{

	var request;

    request = new XMLHttpRequest();

    request.open("POST", "https://vast-crag-95027.herokuapp.com/news", true)

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    request.send("username=" + name + "&content=" + content);
}

function get_data()
{
    document.getElementById("content").innerHTML = "Getting Content";
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                var result = xhttp.responseText;
                var obj = JSON.parse(result)
                var info = "";
                var cap = 0;

                if (obj.length > 10)
                {
                    cap = obj.length - 10;
                }
                for (i = obj.length - 1; i >= cap; i--)
                {
                    var user = obj[i].username;
                    var date = obj[i].date;
                    date = date.toString().substring(0,11) + date.toString().substring(16,24) + date.toString().substring(10,16);



                    var content = obj[i].content;
                    info += "<div class='container-fluid'><p>" + content + "</p>" + "<p> Written by: " + user  + " - " + date + "</p></div>" + "<hr>\n";
                    $('#content').html(info);

                }   
        }
    };
xhttp.open("GET", "https://vast-crag-95027.herokuapp.com/news_get", true);
xhttp.send();
}

function get_data_pub()
{
    document.getElementById("content_pub").innerHTML = "Loading News";
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                var result = xhttp.responseText;
                var obj = JSON.parse(result)

                var info = "";
                var cap = 0;

                if (obj.length > 10)
                {
                    cap = obj.length - 10;
                }
                for (i = obj.length - 1; i >= cap; i--)
                {
                    var title = obj[i].title;
                    var date = obj[i].date;
                    date = date.toString().substring(0,11) + date.toString().substring(16,24) + date.toString().substring(10,16);



                    var content = obj[i].content;
                    info += "<h2>" + title + "</h2>" + "<h4>" + content  + "</h4><p>-" + date + "</p>" + "<hr>\n";
                    document.getElementById("content_pub").innerHTML = info;

                }   
        }
    };
xhttp.open("GET", "https://vast-crag-95027.herokuapp.com/news_get_pub", true);
xhttp.send();

}