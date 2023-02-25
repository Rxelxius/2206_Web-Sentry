// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function(event) {

    // Get all the section elements
    const section1 = document.getElementById("navbarLibraries");
    const section2 = document.getElementById("navbarHeaders");
    const section3 = document.getElementById("navbarCookies");

    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'none';
  
    // Add a click event listener to the section1 link
    section1.addEventListener("click", function(event) {
  
      // Prevent the default link behavior
      event.preventDefault();

      // Show section1 and hide other sections
      document.getElementById('section1').style.display = 'block';
      document.getElementById('section2').style.display = 'none';
      document.getElementById('section3').style.display = 'none';

    });

    // Add a click event listener to the section2 link
    section2.addEventListener("click", function(event) {
  
        // Prevent the default link behavior
        event.preventDefault();
  
        // Show section2 and hide other sections
        document.getElementById('section1').style.display = 'none';
        document.getElementById('section2').style.display = 'block';
        document.getElementById('section3').style.display = 'none';
    
    });
    
    // Add a click event listener to the section3 link
    section3.addEventListener("click", function(event) {
  
        // Prevent the default link behavior
        event.preventDefault();
  
        // Show section3 and hide other sections
        document.getElementById('section1').style.display = 'none';
        document.getElementById('section2').style.display = 'none';
        document.getElementById('section3').style.display = 'block';

    });
  
});
  