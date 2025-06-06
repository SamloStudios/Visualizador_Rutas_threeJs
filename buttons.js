const aboutLink = document.getElementById('about-link');
const aboutPopup = document.getElementById('about-popup');
const closeAboutPopupButton = document.getElementById('close-about-popup');
const cityPopup = document.getElementById('city-popup'); 
const overlay = document.querySelector('.overlay'); 


if (aboutLink) {
  aboutLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    aboutPopup.style.display = 'block'; // Show the about popup
    if (overlay) overlay.style.display = 'block'; // Show the overlay
  });
}

if (closeAboutPopupButton) {
  closeAboutPopupButton.addEventListener('click', () => {
    aboutPopup.style.display = 'none'; // Hide the about popup
    if (overlay) overlay.style.display = 'none'; // Hide the overlay
  });
}