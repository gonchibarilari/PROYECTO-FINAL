
document.addEventListener("DOMContentLoaded", () => {
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  const calcularBtn = document.getElementById("calcularBtn");
  const showHistoryBtn = document.getElementById("showHistoryBtn");
  const hideHistoryBtn = document.getElementById("hideHistoryBtn");
  const resultadoDiv = document.getElementById("resultado");
  const historialDiv = document.getElementById("historial");
  const historialList = document.getElementById("historialList");

  const obtenerNumeroValido = (valor, condicion) => {
    const numero = parseFloat(valor);
    return !isNaN(numero) && condicion(numero) ? numero : null;
  };

  const calcularImpuestoIVA = (precio) => {
    return precio * 0.21;
  };

  const calcularDescuento = (precio, porcentaje) => {
    return (precio * porcentaje) / 100;
  };

  const calcularPrecioFinal = (precio, descuento, impuestoIVA) => {
    const precioConDescuento = precio - descuento;
    return precioConDescuento + impuestoIVA;
  };

  const mostrarResultados = (precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal) => {
    document.getElementById("precioFinal").innerText = 
      `Precio del artículo: ${precio.toFixed(2)}\n` +
      `Descuento: ${descuento.toFixed(2)} (${porcentajeDescuento.toFixed(2)}%)\n` +
      `Impuesto IVA: ${impuestoIVA.toFixed(2)}\n` +
      `Precio final: ${precioFinal.toFixed(2)}`;
    resultadoDiv.classList.remove("ocultar");
  };

  const agregarAlHistorial = (precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal) => {
    const nuevoItem = {
      precio,
      descuento,
      porcentajeDescuento,
      impuestoIVA,
      precioFinal
    };
    historial.push(nuevoItem);
    localStorage.setItem("historial", JSON.stringify(historial));
  };

  const mostrarHistorial = () => {
    if (historial.length === 0) {
      historialList.innerHTML = "<li>No realizaste ningún cálculo.</li>";
      return;
    }
    historialList.innerHTML = historial.map((item, index) => `
      <li>
        Artículo ${index + 1}:
        <ul>
          <li>Precio: ${item.precio.toFixed(2)}</li>
          <li>Descuento: ${item.descuento.toFixed(2)} (${item.porcentajeDescuento.toFixed(2)}%)</li>
          <li>Impuesto IVA: ${item.impuestoIVA.toFixed(2)}</li>
          <li>Precio Final: ${item.precioFinal.toFixed(2)}</li>
        </ul>
      </li>
    `).join('');
  };

  calcularBtn.addEventListener("click", () => {
    const precio = obtenerNumeroValido(document.getElementById("precio").value, (num) => num > 0);
    const porcentajeDescuento = obtenerNumeroValido(document.getElementById("descuento").value, (num) => num >= 0 && num <= 100);
    
    if (precio === null || porcentajeDescuento === null) {
      alert("Por favor, ingresa valores válidos.");
      return;
    }

    const incluirIVA = document.getElementById("incluirIVA").checked;
    const impuestoIVA = incluirIVA ? calcularImpuestoIVA(precio) : 0;
    const descuento = calcularDescuento(precio, porcentajeDescuento);
    const precioFinalArticulo = calcularPrecioFinal(precio, descuento, impuestoIVA);

    mostrarResultados(precio, descuento, porcentajeDescuento, impuestoIVA, precioFinalArticulo);
    agregarAlHistorial(precio, descuento, porcentajeDescuento, impuestoIVA, precioFinalArticulo);
  });

  showHistoryBtn.addEventListener("click", () => {
    mostrarHistorial();
    historialDiv.classList.remove("ocultar");
    showHistoryBtn.classList.add("ocultar");
    hideHistoryBtn.classList.remove("ocultar");
  });

  hideHistoryBtn.addEventListener("click", () => {
    historialDiv.classList.add("ocultar");
    showHistoryBtn.classList.remove("ocultar");
    hideHistoryBtn.classList.add("ocultar");
  });

  // Mostrar historial al cargar la página si ya hay cálculos guardados
  mostrarHistorial();
});

localStorage.clear();
