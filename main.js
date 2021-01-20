const arr = [];
const larguraDoFogo = 50;
const alturaDoFogo = 50;
const paletaDeCores = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

function start() {
  estruturaDeDados();
  baseDoFogo();
  renderFogo();

  setInterval(propagaçãoDoFogo, 50);
}

function estruturaDeDados() {
  let numeroDePixels = larguraDoFogo * alturaDoFogo;
  for (let i = 0; i < numeroDePixels; i++) {
    arr[i] = 0;
  }

}

function baseDoFogo() {
  for (let coluna = 0; coluna <= larguraDoFogo; coluna++) {
    let base = (larguraDoFogo * alturaDoFogo) - coluna;
    arr[base] = 36;
  }
}

function propagaçãoDoFogo() {
  for (let coluna = 0; coluna < larguraDoFogo; coluna++) {
    for (let linha = 0; linha < alturaDoFogo; linha++) {

      let indexPixel = coluna + (larguraDoFogo * linha);
      calcularIntensidadeDoFogo(indexPixel);
    }
  }
  renderFogo();
}

function calcularIntensidadeDoFogo(currentindexPixel) {
  const pixelDeBaixo = currentindexPixel + larguraDoFogo;

  if (pixelDeBaixo >= larguraDoFogo * alturaDoFogo) {
    return
  }
  const decaimento = Math.floor(Math.random() * 3);
  const intensidadeDoPixelDeBaixo = arr[pixelDeBaixo];
  const novaIntensidade =
    intensidadeDoPixelDeBaixo - decaimento >= 0 ? intensidadeDoPixelDeBaixo - decaimento : 0;

  arr[currentindexPixel - decaimento] = novaIntensidade;
}

function renderFogo() {
  const debug = false;
  let html = '<table>';
  for (let linha = 0; linha < alturaDoFogo; linha++) {
    html += '<tr>';

    for (let coluna = 0; coluna < larguraDoFogo; coluna++) {
      let indexPixel = coluna + (larguraDoFogo * linha);
      let intensidadeDoFogo = arr[indexPixel];

      if (debug === true) {
        html += '<td>';
        html += `<div class= "styleIndex">${indexPixel}</div>`;
        html += intensidadeDoFogo;
        html += '</td>';
      } else {
        const cor = paletaDeCores[intensidadeDoFogo];
        const stringCor = `${cor.r},${cor.g},${cor.b}`;
        html += `<td class="pixel" style="background-color: rgb(${stringCor})"`;
        html += '</td>';
      }

    }

    html += '</tr>';
  }

  html += '</table>';
  document.querySelector('#tabelaDoFogo').innerHTML = html;
}
start();