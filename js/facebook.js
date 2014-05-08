window.fbAsyncInit = function() {
  FB.init({
    appId      : '311397385570136',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.0' // use version 2.0
  });
FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('Logged in.');
            checkifLikes();
            getUserInfo();
        }else {
            FB.login(function(){
               checkifLikes();
                getUserInfo(); 
            }, {scope: 'email publish_actions user_likes'});
        }
    });
}

function checkifLikes(){
    FB.api({ method: 'pages.isFan', page_id: '1470973119803425' }, function(resp) {
    if (resp) {
      console.log('You like it lolpuebla.');
      hideAll();
      $("#paso2").fadeIn();
    } else {
      hideAll();
      $("#paso1").fadeIn();
      console.log("You don't like it.");
    }
  });
}

function hideAll(){
    $("#loader").hide();
    $("#paso1").hide();
    $("#paso2").hide();
    $("#congrats").hide();
}

function getUserInfo(){
    FB.api("/me",function (response) {
      if (response && !response.error) {
        var user = {
            "fbid": response.id,
            "name": response.name,
            "email": response.email
        }
        console.log(user);
      }
    }
);
}