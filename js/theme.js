const html = document.querySelector('html');
const checkbox = document.querySelector('input[name=theme]');

const getStyle = (element, style) => {
  window
    .getComputedStyle(element)
    .getPropertyValue(style)
}

// const initialColors = {
//   bg: getStyle(html, '--bg'),
//   button: getStyle(html, '--button'),
// }

const initialColors = {
  bg: "#6a5acb",
  button: "#af00ff",
}

const darkTheme = {
  bg: '#1C1C1C',
  button: '#595959'
}

const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map(key => {
    html.style.setProperty(transformKey(key), colors[key])
  })
  // console.log(colors);
}

checkbox.addEventListener('change', ({ target }) => {
  target.checked ? changeColors(darkTheme) : changeColors(initialColors);
});