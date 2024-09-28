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

  const calcular = (precio, porcentajeDescuento, incluirIVA) => {
    const impuestoIVA = incluirIVA ? precio * 0.21 : 0;
    const descuento = (precio * porcentajeDescuento) / 100;
    const precioFinal = (precio - descuento) + impuestoIVA;
    return { descuento, impuestoIVA, precioFinal };
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
    const nuevoItem = { precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal };
    historial.push(nuevoItem);
    localStorage.setItem("historial", JSON.stringify(historial));
  };

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

  calcularBtn.addEventListener("click", () => {
    const precio = obtenerNumeroValido(document.getElementById("precio").value, num => num > 0);
    const porcentajeDescuento = obtenerNumeroValido(document.getElementById("descuento").value, num => num >= 0 && num <= 100);
    
    if (precio === null || porcentajeDescuento === null) {
      alert("Por favor, ingresa valores válidos para precio y descuento.");
      return;
    }

    Swal.fire({
      title: 'Procesando resultado',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      const incluirIVA = document.getElementById("incluirIVA").checked;
      const { descuento, impuestoIVA, precioFinal } = calcular(precio, porcentajeDescuento, incluirIVA);
      
      mostrarResultados(precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal);
      agregarAlHistorial(precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal);
    });
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


  const borrarHistorial = () => {
    localStorage.removeItem("historial");
    historial = [];
    historialList.innerHTML = "<li>Historial borrado.</li>";
    Swal.fire({
      title: 'Historial Borrado',
      text: 'El historial ha sido eliminado exitosamente.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  };

  clearHistoryBtn.addEventListener("click", borrarHistorial);

  // Mostrar historial al cargar la página
  mostrarHistorial();
});
