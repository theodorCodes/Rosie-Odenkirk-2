// 2*)
// after declaring the function fetchGitHubInformation()
// we are ready to write the second part of this file
// to render user data once our promise resolves
function userInformationHTML(user) {
  // Here we simply return (using Template Literals)
  // with backticks and $ sign
  // user.name  is the users public display name at GitHub
  // username login link
  // user avatar
  // user social
  // user repositories
  return `
      <h2>${user.name}
          <span class="small-name">
              (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
          </span>
      </h2>
      <div class="gh-content">
          <div class="gh-avatar">
              <a href="${user.html_url}" target="_blank">
                  <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
              </a>
          </div>
          <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
      </div>`;
}

// 1*)
// funtion called by oninput in HTML file with an argument of event 
function fetchGitHubInformation(event) {

  // Using a jQuery statements
  // to store the value of 
  // #gh-usernmae in variable username
  // for our userbox or textfield
  var username = $("#gh-username").val();
  // important to note here is that username
  // will be the user object that we receive from
  // the GitHub API during our promise function below
  // Visit GitHub API to see all the options available
  
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
      // we will write this function on top of this file 2*)
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
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
      }
    }
  );
}