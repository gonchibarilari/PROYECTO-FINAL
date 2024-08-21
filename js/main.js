const evaluador = () => {
    // Array para almacenar el historial de cálculos
    let historial = [];

    // Función para obtener un número válido de acuerdo a una condición y mensaje
    const obtenerNumeroValido = (mensaje, condicion, maxIntentos = 3) => {
        let numero;
        let intentos = 0;

        while (intentos < maxIntentos) {
            const entrada = prompt(mensaje);
            numero = parseFloat(entrada);

            if (!isNaN(numero) && condicion(numero)) {
                return numero;
            }

            intentos++;
            alert(`Valor incorrecto. Intento ${intentos} de ${maxIntentos}. Por favor, ingresa un número válido.`);
        }

        alert("Número máximo de intentos alcanzado, vuelva pronto.");
        return null;
    };

    // Función para calcular el impuesto IVA (21%)
    const calcularImpuestoIVA = (precio) => {
        return precio * 0.21;
    };

    // Función para calcular el descuento en base al porcentaje
    const calcularDescuento = (precio, porcentaje) => {
        return (precio * porcentaje) / 100;
    };

    // Función para calcular el precio final del artículo
    const calcularPrecioFinal = (precio, descuento, impuestoIVA) => {
        const precioConDescuento = precio - descuento;
        return precioConDescuento + impuestoIVA;
    };

    // Función para mostrar los resultados al usuario
    const mostrarResultados = (precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal) => {
        alert(
            `Precio del artículo: ${precio.toFixed(2)}\n` +
            `Descuento: ${descuento.toFixed(2)} (${porcentajeDescuento.toFixed(2)}%)\n` +
            `Impuesto IVA: ${impuestoIVA.toFixed(2)}\n` +
            `Precio final: ${precioFinal.toFixed(2)}`
        );
    };

    // Función para agregar un cálculo al historial
    const agregarAlHistorial = (precio, descuento, porcentajeDescuento, impuestoIVA, precioFinal) => {
        historial.push({
            precio,
            descuento,
            porcentajeDescuento,
            impuestoIVA,
            precioFinal
        });
    };

    // Función para mostrar el historial
    const mostrarHistorial = () => {
        if (historial.length === 0) {
            alert("No hay historial de cálculos.");
            return;
        }

        let historialTexto = "Historial de Cálculos:\n";
        historial.forEach((item, index) => {
            historialTexto += `\nArtículo ${index + 1}:\n` +
                              `Precio: ${item.precio.toFixed(2)}\n` +
                              `Descuento: ${item.descuento.toFixed(2)} (${item.porcentajeDescuento.toFixed(2)}%)\n` +
                              `Impuesto IVA: ${item.impuestoIVA.toFixed(2)}\n` +
                              `Precio Final: ${item.precioFinal.toFixed(2)}\n`;
        });

        alert(historialTexto);
    };

    // Función para manejar el proceso de cálculo del impuesto del artículo
    const procesoImpuestoDelArticulo = () => {
        const precioArticulo = obtenerNumeroValido(
            "Ingresa el precio del Artículo (debe ser mayor a 0)",
            (num) => num > 0
        );

        if (precioArticulo === null) return false;

        const porcentajeDescuento = obtenerNumeroValido(
            "Ingresa el porcentaje de descuento (por ejemplo, 10 para 10%, debe estar entre 0 y 100)",
            (num) => num >= 0 && num <= 100
        );

        if (porcentajeDescuento === null) return false;

        const impuestoIVA = calcularImpuestoIVA(precioArticulo);
        const descuento = calcularDescuento(precioArticulo, porcentajeDescuento);
        const precioFinalArticulo = calcularPrecioFinal(precioArticulo, descuento, impuestoIVA);

        mostrarResultados(precioArticulo, descuento, porcentajeDescuento, impuestoIVA, precioFinalArticulo);

        // Agregar el cálculo al historial
        agregarAlHistorial(precioArticulo, descuento, porcentajeDescuento, impuestoIVA, precioFinalArticulo);

        return true;
    };

    // Función para iniciar el proceso principal
    const iniciarProceso = () => {
        let continuar = true;
        while (continuar) {
            // Mostrar menú de opciones
            const opcion = prompt("Selecciona una opción:\n1. Realizar un cálculo\n2. Ver historial\n3. Salir");
            
            switch (opcion) {
                case "1":
                    continuar = procesoImpuestoDelArticulo();
                    break;
                case "2":
                    mostrarHistorial();
                    break;
                case "3":
                    continuar = false;
                    break;
                default:
                    alert("Opción no válida. Por favor, ingresa 1, 2 o 3.");
            }
        }

        alert("Gracias, vuelva pronto.");
    };

    // Ejecutar el proceso principal
    iniciarProceso();
};

// Ejecutar el código
evaluador();