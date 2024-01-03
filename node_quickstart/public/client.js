
const myButton = document.getElementById('discover');

myButton.addEventListener("click", function(e) {
    fetch('/discover', {method: 'POST'})
  });
