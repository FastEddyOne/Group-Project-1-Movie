fetch('https://api.watchmode.com/v1/sources/?apiKey=R4p1DztdqOo4OnAVqProfjk203wluPqWA2esGkj0')
  .then(response => response.json())
  .then(data => console.log(data));