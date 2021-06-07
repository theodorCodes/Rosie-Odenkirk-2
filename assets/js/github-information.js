// funtion called by oninput in HTML file with an argument of event 
function fetchGitHubInformation(event) {

    // Using a jQuery statements
    // to store the value of 
    // #gh-usernmae in variable username
    // for our userbox or textfield
    var username = $("#gh-username").val();

    // If not username meaning empty
    // then return id #gh-user-data.html with content <h2>...</h2>
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    // If gh-user-data available
    // then show loader id with img gif
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    // jQuery promise
    $.when(
      // when(argument)
      // getJSON function at api.URLaddress with the ${username}
      // that we obtain from our user box text field
      $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
      // then(argument)
      // display the following data inside below function
      function (response) {
        // store the response that we get from getJSON method in userData
        var userData = response;
        // then, with jQuery selectors, select gh-user-data
        // and set the HTML to the results of another function named
        // userInformationHTML with the argument of userData
        $("#gh-user-data").html(userInformationHTML(userData));
        // and add first error response function
      }, function(errorResponse) {
        // if the getJSON request gets an 404 (not found) error
        if (errorResponse.status === 404) {
          // then set the gh-user-data HTML content to `<h2>...</h2>`
          $("#gh-user-data").html(
            `<h2>No info found for user ${username}</h2>`);
        } else {
          // all other non 404 error responses
          // log error to the console
          console.log(errorResponse);
          // and set the gh-user-data HTML content to 
          // the error response we have received ${errorResponse...}
          // in our getJSON request
          $("#gh-user-data").html(
            `<h2>Error: ${errorResponse.responseJSON.message</h2>`);
        }
      }
    );
}