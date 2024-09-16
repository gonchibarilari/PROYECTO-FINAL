document.addEventListener("DOMContentLoaded", () => {
  // Cargar historial desde localStorage o inicializar como vacío
  let historial = JSON.parse(localStorage.getItem("historial")) || [];

  // Obtener elementos del DOM
  const calcularBtn = document.getElementById("calcularBtn");
  const showHistoryBtn = document.getElementById("showHistoryBtn");
  const hideHistoryBtn = document.getElementById("hideHistoryBtn");
  const resultadoDiv = document.getElementById("resultado");
  const historialDiv = document.getElementById("historial");
  const historialList = document.getElementById("historialList");

  // Función para validar números
  const obtenerNumeroValido = (valor, condicion) => {
    const numero = parseFloat(valor);
    return !isNaN(numero) && condicion(numero) ? numero : null;
  };

  // Cálculo del IVA
  const calcularImpuestoIVA = (precio) => precio * 0.21;

  // Cálculo del descuento
  const calcularDescuento = (precio, porcentaje) => (precio * porcentaje) / 100;

  // Cálculo del precio final
  const calcularPrecioFinal = (precio, descuento, impuestoIVA) => (precio - descuento) + impuestoIVA;

  // Mostrar resultados en el DOM
  const mostrarResultados = (precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal) => {
    document.getElementById("precioFinal").innerText = 
      `Precio del artículo: ${precio.toFixed(2)}\n` +
      `Descuento: ${descuento.toFixed(2)} (${porcentajeDescuento.toFixed(2)}%)\n` +
      `Impuesto IVA: ${impuestoIVA.toFixed(2)}\n` +
      `Precio final: ${precioFinal.toFixed(2)}`;
    resultadoDiv.classList.remove("ocultar");
  };

  // Agregar al historial en localStorage
  const agregarAlHistorial = (precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal) => {
    const nuevoItem = { precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal };
    historial.push(nuevoItem);
    localStorage.setItem("historial", JSON.stringify(historial));
  };

  // Mostrar historial en el DOM
  const mostrarHistorial = () => {
    if (historial.length === 0) {
      historialList.innerHTML = "<li>No realizaste ningún cálculo.</li>";
    } else {
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
    }
  };

  // Evento para calcular el precio
  calcularBtn.addEventListener("click", () => {
    const precio = obtenerNumeroValido(document.getElementById("precio").value, num => num > 0);
    const porcentajeDescuento = obtenerNumeroValido(document.getElementById("descuento").value, num => num >= 0 && num <= 100);
    
    if (precio === null || porcentajeDescuento === null) {
      alert("Por favor, ingresa valores válidos para precio y descuento.");
      return;
    }

    const incluirIVA = document.getElementById("incluirIVA").checked;
    const impuestoIVA = incluirIVA ? calcularImpuestoIVA(precio) : 0;
    const descuento = calcularDescuento(precio, porcentajeDescuento);
    const precioFinalArticulo = calcularPrecioFinal(precio, descuento, impuestoIVA);

    mostrarResultados(precio, descuento, porcentajeDescuento, impuestoIVA, precioFinalArticulo);
    agregarAlHistorial(precio, descuento, porcentajeDescuento, impuestoIVA, precioFinalArticulo);
  });

  // Eventos para mostrar y ocultar historial
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

  // Mostrar historial al cargar la página
  mostrarHistorial();
});
