import html2canvas from "html2canvas";

export function useHtmlToImage() {
  function generarImagen(div) {
    return html2canvas(div).then((canvas) => {
      return canvas.toDataURL("image/png");
    });
  }

  return { generarImagen };
}
