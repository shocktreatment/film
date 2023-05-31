const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('#theme-switch-toggle');
const footerDarktheme = document.querySelector('.footer');
const LOCALSTORAGE_THEME_KEY = 'theme';

export { setThemeFromLocalStorage };

function setThemeFromLocalStorage() {
  if (localStorage.getItem(LOCALSTORAGE_THEME_KEY)) {
    bodyRef.classList.add('dark-theme');
    toggleRef.checked = true;
  } else {
    toggleRef.checked = false;
  }
}

toggleRef.addEventListener('change', event => {
  if (!bodyRef.classList.contains('dark-theme')) {
    bodyRef.classList.add('dark-theme');
    localStorage.setItem(LOCALSTORAGE_THEME_KEY, 'dark-theme');
  } else {
    bodyRef.classList.remove('dark-theme');
    localStorage.removeItem(LOCALSTORAGE_THEME_KEY);
  }
});

setThemeFromLocalStorage();
