// Test if js file is linked 
// Save and check output in the console!
// Yes, I see a "Hello"
// console.log("Hello! This is John Appleseed");

// 5*)
// Writing the sendMail() function
// Here we declare our function with a parameter of contact Form
function sendMail(contactForm) {
  // emailjs is our function provided by EmailJS API that we have 
  // imported in the head section of contact.html file
  // And we pass in 3 parameters ("service id", "username", and the content)
  emailjs.send("service_kh69pes", "rosie", {
      // in this object we use the keys from the Email Template
      // that is provided in the EmailJS admin
      // while the values are from our contact.html file 
      // where we refer to the name attributes inside the form
      // so the contactForm refers to the form tag
      "from_name": contactForm.name.value,
      "from_email": contactForm.emailaddress.value,
      "project_request": contactForm.projectsummary.value
  })
  // here we use the .then promise method
  // with a success and a error response
  .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
  }
