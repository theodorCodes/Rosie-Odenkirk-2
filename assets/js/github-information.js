// 2*)
// after declaring the function fetchGitHubInformation()
// we are ready to write the second part of this file
// to render user data once our promise resolves
// the argument 'user' is the object that returns 
// from our GitHub API getJSON request
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

// 3*)
// after declaring the function fetchGitHubInformation()
// if no error we will have received the object or here
// an array named 'repos' that we use as argument in this
// function
function repoInformationHTML(repos) {
  // here we check if the array repos is 0 (empty)
  // if empty we return the message "no repos"
  if (repos.length == 0) {
      return `<div class="clearfix repo-list">No repos!</div>`;
  }

  // If the array has some info, since it's an array
  // we have to iterate through it and store the info
  // Here we are going to use the map() method
  // which creates a new array by performing 
  // the function below on each array element
  // Each item should be wrapped as list item
  // and an anchor element that we can click
  var listItemsHTML = repos.map(function(repo) {
      return `<li>
                  <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </li>`;
  });

  // Here we are formatting and place the 
  // listItemsHTML inside a ul, inside a repo-list
  // AND as our listItemsHTML is an array
  // we can using the .join method to join everything
  // with a new line \n
  return `<div class="clearfix repo-list">
              <p>
                  <strong>Repo List:</strong>
              </p>
              <ul>
                  ${listItemsHTML.join("\n")}
              </ul>
          </div>`;
}

// 1*)
// funtion called by oninput in HTML file with an argument of event 
function fetchGitHubInformation(event) {

  // 4*) 
  // Here we fix the issue of displaying previous content 
  // Each time the function is called it clears
  // the content for both gh-user-data and gh-repo-data
  // and set it to an empty string
  $("#gh-user-data").html("");
  $("#gh-repo-data").html("");

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
    // will get user information
    $.getJSON(`https://api.github.com/users/${username}`),
    // will get repository information
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    // then(argument)
    // display the following data inside below function
    function (firstResponse, secondResponse) {
      // store the user response that we get from getJSON method
      var userData = firstResponse[0];
      // store the repository response that we get from getJSON method
      var repoData = secondResponse[0];
      // then, with jQuery selectors, select gh-user-data
      // and set the HTML to the results of another function named
      // userInformationHTML with the argument of userData
      // we will write this function on top of this file 2*)
      $("#gh-user-data").html(userInformationHTML(userData));
      // we will write this function on top of this file 3*)
      $("#gh-repo-data").html(repoInformationHTML(repoData));
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

// 5*) 
// Here we are going to place the octocat
// as default profile when the page is loaded
$(document).ready(fetchGitHubInformation);