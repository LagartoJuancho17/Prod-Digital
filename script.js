let currentMode = 'analogo';

// Función principal para mostrar colores según el modo actual
function mostrarColores() {
    const baseColor = generarColorAleatorio();
    let colores = [];

    switch (currentMode) {
        case 'analogo':
            colores = generarAnalogos(baseColor);
            break;
        case 'monocromatico':
            colores = generarMonocromaticos(baseColor);
            break;
        case 'complementario':
            colores = generarComplementarios(baseColor);
            break;
        case 'complementarios-adyacentes':
            colores = generarComplementariosAdyacentes(baseColor);
            break;
    }

    // Asignar colores y mostrar códigos HEX en cada columna
    document.getElementById('columna1').style.backgroundColor = colores[0];
    document.getElementById('hex1').textContent = colores[0];

    document.getElementById('columna2').style.backgroundColor = colores[1];
    document.getElementById('hex2').textContent = colores[1];

    document.getElementById('columna3').style.backgroundColor = colores[2];
    document.getElementById('hex3').textContent = colores[2];
}

// Cambiar el modo de generación de colores
function cambiarModo(modo) {
    currentMode = modo;
    mostrarColores();
}

// Generar un color aleatorio en formato HEX
function generarColorAleatorio() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Generar colores análogos
function generarAnalogos(baseColor) {
    const baseHue = hexToHSL(baseColor).h;
    return [
        hslToHex((baseHue + 30) % 360, 70, 50),
        baseColor,
        hslToHex((baseHue + 330) % 360, 70, 50)
    ];
}

// Generar colores monocromáticos
function generarMonocromaticos(baseColor) {
    const baseHSL = hexToHSL(baseColor);
    return [
        hslToHex(baseHSL.h, baseHSL.s, baseHSL.l + 20),
        baseColor,
        hslToHex(baseHSL.h, baseHSL.s, baseHSL.l - 20)
    ];
}

// Generar colores complementarios
function generarComplementarios(baseColor) {
    const baseHue = hexToHSL(baseColor).h;
    return [
        baseColor,
        hslToHex((baseHue + 180) % 360, 70, 50),
        hslToHex((baseHue + 360) % 360, 70, 50)
    ];
}

// Generar colores complementarios adyacentes
function generarComplementariosAdyacentes(baseColor) {
    const baseHue = hexToHSL(baseColor).h;
    return [
        hslToHex((baseHue + 150) % 360, 70, 50),
        baseColor,
        hslToHex((baseHue + 210) % 360, 70, 50)
    ];
}

// Convertir HEX a HSL
function hexToHSL(H) {
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
        r = parseInt(H[1] + H[1], 16);
        g = parseInt(H[2] + H[2], 16);
        b = parseInt(H[3] + H[3], 16);
    } else if (H.length === 7) {
        r = parseInt(H[1] + H[2], 16);
        g = parseInt(H[3] + H[4], 16);
        b = parseInt(H[5] + H[6], 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

// Convertir HSL a HEX
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}
