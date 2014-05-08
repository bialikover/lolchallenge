$(document).ready(function() {
    window.user = {};
    $(".wait").show();
    window.fbAsyncInit = function() {
        FB.init({
            appId: '685626324807687',
            cookie: true, // enable cookies to allow the server to access 
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.0' // use version 2.0
        });
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                getUserInfo();

            } else {
                FB.login(function() {
                    getUserInfo();

                }, {
                    scope: 'email publish_actions user_likes'
                });
            }
        });
    }

    function checkifLikes() {
        FB.api({
            method: 'pages.isFan',
            page_id: '1470973119803425'
        }, function(resp) {
            if (resp) {
                console.log('You like it lolpuebla.');
                hideAll();
                whichLanding(user);
            } else {
                hideAll();
                $("#paso1").fadeIn();
                console.log("You don't like it.");
            }
        });
    }

    function whichLanding(user) {
        $.ajax({
            url: "/summoner",
            data: {
                "user": JSON.stringify(user)
            },
            type: 'GET',
            dataType: "JSON"
        }).success(function(json) {
            if (json) {
                hideAll();
                $("#user").text(json.name);
                $("#summoner").text(json.summoner);
                $("#congrats").show();
            } else {
                hideAll();
                $("#paso2").show();
            }
        });
    }

    function hideAll() {
        $(".wait").hide();
        $("#paso1").hide();
        $("#paso2").hide();
        $("#congrats").hide();
    }

    function getUserInfo() {
        FB.api("/me", function(response) {
            if (response && !response.error) {
                user = {
                    "fbid": response.id,
                    "name": response.name,
                    "email": response.email
                }
                checkifLikes();
            }
        });
    }

    function postToFacebook() {
        var share = {
            method: 'stream.share',
            u: 'http://www.facebook.com/lolpuebla'
        };
        FB.ui(share, function(response) {
            if (response) {
                saveSummoner();
            }
        });
    }

    function saveSummoner() {
        user.summoner = $("#summoner-name").val();
        summonerExists(user);
    }

    function summonerExists(user) {
        hideAll();
        $(".wait").show();
        $.ajax({
            url: "/summoner",
            data: {
                "user": JSON.stringify(user)
            },
            type: 'GET',
            dataType: "JSON"
        }).success(function(json) {
            if (json) {
                hideAll();
                $("#user").text(json.name);
                $("#summoner").text(json.summoner);
                $("#congrats").show();
            } else {
                insertSummoner(user);
            }
        });
        //AJAX REQUEST
    }

    function insertSummoner(user) {
        $.ajax({
            url: "/join",
            data: {
                "user": user
            },
            type: 'POST',
            dataType: "JSON"
        }).success(function(json) {
            if (json) {
                console.log(json);
                hideAll();
                $("#user").text(json.name);
                $("#summoner").text(json.summoner);
                $("#congrats").show();
            } else {
                console.log("error");
                console.log(json);
            }
        });
    }
    //Listeners:
    $("#share").click(function(e) {
        e.preventDefault();
        postToFacebook();
    });

});