let ctx = canvas.getContext('2d');
let width, height;

let getScale = (figure) => {
  width = height = canvas.width / figure.length;
}

let drawFirstFigure = async () => {

  try {
    let response = await fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json');
    let figure = await response.json();
    getScale(figure);

    figure.forEach((row, i) => {
      row.forEach((column, j) => {
        ctx.fillStyle = '#' + column;
        ctx.fillRect(width * j, height * i, width * (j + 1), height * (i + 1));
      })
    });
  } catch(e) {
    console.log(e);
  }
}

let drawSecondFigure = async () => {
  try {
    let response = await fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json');
    let figure = await response.json();
    getScale(figure);

    figure.forEach((row, i) => {
      row.forEach((column, j) => {
        column[column.length - 1] /= 255;
        column[column.length - 1] = column[column.length - 1].toFixed(1);

        ctx.fillStyle = `rgba(${column.join()})`;
        ctx.fillRect(width * j, height * i, width * (j + 1), height * (i + 1));
      })
    });
  } catch(e) {
    console.log(e);
  }
}

let drawImage = async () => {
  try {
    let img = new Image();
    img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png';

    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  } catch(e) {
    console.log(e);
  }
  
}

let clearCanvas = (e) => {
  document.querySelectorAll('.canvas-switcher__btn').forEach(button => {
    button.classList.remove('active');
  });

  e.currentTarget.classList.add('active');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

firstButton.addEventListener('click', (e) => {
  clearCanvas(e);
  drawFirstFigure();
});

secondButton.addEventListener('click', (e) => {
  clearCanvas(e);
  drawSecondFigure();
});

thirdButton.addEventListener('click', (e) => {
  clearCanvas(e);
  drawImage();
});