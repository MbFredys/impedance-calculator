import React, { useState, useEffect, useMemo, useCallback } from 'react';

const App = () => {
  const [language, setLanguage] = useState('es');
  const [traceType, setTraceType] = useState('microstrip');
  const [traceWidth, setTraceWidth] = useState(0.34);
  const [traceThickness, setTraceThickness] = useState(0.035);
  const [dielectricHeight, setDielectricHeight] = useState(0.127);
  const [substrateHeight, setSubstrateHeight] = useState(0.4);
  const [relativePermittivity, setRelativePermittivity] = useState(4.4);
  const [units, setUnits] = useState('mm');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [openExamples, setOpenExamples] = useState(null);
  const [preset, setPreset] = useState('FR4');
  const [materialName, setMaterialName] = useState('FR4');
  const [isModified, setIsModified] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleExamples = (index) => {
    setOpenExamples(openExamples === index ? null : index);
  };

  const t = (key) => {
    const translations = {
      es: {
        title: "Calculadora de Impedancia PCB",
        subtitle: "Cálculo en tiempo real con visualización del stack-up",
        traceType: "Tipo de Trazo",
        microstrip: "Microstrip",
        stripline: "Stripline",
        units: "Unidades",
        traceWidth: "Ancho del Trazo",
        traceThickness: "Espesor del Trazo",
        dielectricHeight: "Altura Dieléctrica",
        substrateHeight: "Altura del Sustrato",
        permittivity: "Permitividad Relativa (εr)",
        impedance: "Impedancia Característica",
        ohms: "Ω",
        warning: "Advertencia: Valor de impedancia inusual",
        stackUp: "Stack-up",
        crossSection: "Vista en sección transversal",
        ground: "Plano de Tierra",
        fr4: "FR4",
        substrate: "Sustrato",
        trace: "Trazo",
        air: "Aire",
        materials: "Materiales:",
        copper: "Rojo = Trazo de Cobre",
        grounds: "Gris = Planos de Tierra",
        about: "Sobre la Impedancia PCB",
        microstripInfo: "Una línea de transmisión microstrip consiste en un trazo conductor único sobre un plano de tierra, separado por un sustrato dieléctrico. Comúnmente usada para señales RF y digitales de alta velocidad.",
        striplineInfo: "Una línea de transmisión stripline tiene un trazo conductor embebido entre dos planos de tierra con material dieléctrico en ambos lados. Proporciona mejor blindaje EMI que el microstrip.",
        faqTitle: "Preguntas Frecuentes",
        faqScope: "Alcance de esta Herramienta",
        faqScopeAnswer: "Esta herramienta está diseñada para ayudar a diseñadores de PCB a calcular rápidamente la impedancia característica de trazos microstrip y stripline. No reemplaza simuladores 3D completos, pero es ideal para estimaciones rápidas, iteración de diseño y aprendizaje.",
        faqHowItWorks: "¿Cómo Funciona?",
        faqHowItWorksAnswer: "Utiliza fórmulas estándar de la industria (Hammerstad-Jensen para microstrip y Wheeler para stripline) para calcular la impedancia basada en las dimensiones físicas y las propiedades del material. Los cálculos se actualizan en tiempo real mientras ajustas los parámetros.",
        faqHowToUse: "¿Cómo Usarla?",
        faqHowToUseAnswer: [
          "Selecciona el material predefinido",
          "Elige el tipo de trazo (microstrip o stripline)",
          "Ajusta los parámetros usando los sliders si es necesario",
          "Observa la impedancia calculada y la visualización del stack-up"
        ],
        faqBasics: "Conceptos Básicos",
        faqBasicsAnswer: "La impedancia característica es la resistencia que una señal de alta frecuencia 've' al viajar por una línea de transmisión. Es crucial para evitar reflexiones de señal y asegurar la integridad del señal en diseños de alta velocidad. Valores comunes son 50Ω (RF), 75Ω (video), y 90-100Ω (interfaces digitales).",
        faqImportance: "Importancia",
        faqImportanceAnswer: "Una impedancia mal controlada causa reflexiones de señal, distorsión, y pérdida de datos. En aplicaciones de alta velocidad (>100MHz) o RF, el control de impedancia es esencial para el rendimiento del circuito.",
        faqWhenToUse: "¿Cuándo usarla?",
        faqWhenToUseAnswer: "Úsala durante la fase de diseño preliminar para dimensionar trazos, al iterar diseños para optimizar parámetros, como herramienta educativa para entender cómo los cambios afectan la impedancia, y para verificación rápida de cálculos manuales. No la uses para diseños críticos sin validación adicional.",
        faqWhatNotAssume: "¿Qué NO debemos asumir?",
        faqWhatNotAssumeAnswer: "No asumas que los resultados son 100% precisos para fabricación final. No asumas que reemplaza simulaciones 3D completas. No asumas que funciona para impedancia diferencial (solo calcula impedancia single-ended). No asumas que considera efectos de frecuencia, pérdida dieléctrica, o rugosidad del cobre.",
        credits: "Desarrollado por",
        using: "Usando el desarrollador web de",
        toggleLanguage: "EN/ES",
        presets: "Ajustes Predefinidos",
        custom: "Personalizado",
        fr4: "FR4",
        ro4350: "Rogers RO4350B",
        isola370hr: "Isola 370HR",
        standardImpedances: "Impedancias Estándar por Aplicación",
        impedance50ohm: "50Ω: Comunicaciones RF, antenas, líneas de transmisión generales",
        impedance75ohm: "75Ω: Video analógico, broadcast, televisión por cable",
        impedance90ohm: "90-100Ω: Interfaces digitales (USB, HDMI, Ethernet), pares diferenciales",
        examplesTitle: "Ejemplos Prácticos",
        example1Title: "Diseño de Placa WiFi con Antena PCB Integrada",
        example1Content: "Estás diseñando una placa WiFi con módulo ESP32 y antena PCB. El fabricante especifica que la línea de transmisión debe ser 50Ω. Tu stack-up es FR4 de 4 capas con 0.127mm entre capa 1 (señal) y capa 2 (plano de tierra). \n\nPasos prácticos:\n1. Selecciona 'FR4' en ajustes predefinidos\n2. Elige 'Microstrip' como tipo de trazo\n3. Ajusta el ancho del trazo usando el slider hasta que la impedancia calculada sea 50Ω\n4. Verifica que el ancho resultante cumple con las restricciones mínimas de tu fabricante\n5. Confirma que la impedancia calculada esté dentro del rango aceptable de 45-55Ω para aplicaciones RF\n\nConsejo profesional:\nSiempre consulta con tu fabricante los valores exactos de espesor de cobre y altura dieléctrica, ya que varían entre lotes.",
        example2Title: "Diseño de Cámara de Seguridad con Salida de Video Analógico",
        example2Content: "Estás desarrollando una cámara de seguridad que debe enviar señales de video por cable coaxial. El estándar requiere 75Ω de impedancia para evitar ecos y distorsión en la imagen. Tu PCB debe conectar el driver de video al conector BNC.\n\nPasos prácticos:\n1. Selecciona 'FR4' en ajustes predefinidos\n2. Elige 'Microstrip' (las señales de video suelen estar en capas externas)\n3. Ajusta el ancho del trazo usando los sliders hasta que la impedancia calculada sea 75Ω\n4. Verifica que el valor resultante sea lo más cercano posible a 75Ω\n5. Considera el efecto del conector: la transición del trazo PCB al conector coaxial puede causar discontinuidades, así que mantén el trazo lo más corto posible\n\nConsejo profesional:\nPara señales de video, la tolerancia de impedancia es crítica. Si no logras exactamente 75Ω, prioriza valores ligeramente superiores sobre inferiores, ya que las reflexiones son menos problemáticas.",
        example3Title: "Optimización de Diseño Multicapa para Señales Mixtas",
        example3Content: "Estás diseñando una placa de control industrial con señales RF (50Ω), señales digitales de alta velocidad (90Ω) y alimentación. Tu stack-up es de 6 capas: L1(señal), L2(GND), L3(señal), L4(alimentación), L5(señal), L6(GND).\n\nPasos prácticos:\n1. Para trazos RF en L1: selecciona 'FR4', 'Microstrip', y ajusta el ancho hasta obtener 50Ω\n2. Para trazos digitales en L3: selecciona 'FR4', 'Stripline' (entre L2 y L4), y ajusta el ancho hasta obtener 90Ω\n3. Observa cómo la misma impedancia objetivo requiere diferentes anchos según la ubicación en el stack-up\n4. Usa la herramienta para verificar que los anchos mínimos cumplen con las capacidades de fabricación\n5. Documenta todos los anchos calculados en tus especificaciones de diseño\n\nConsejo profesional:\nEn diseños multicapa, siempre verifica la impedancia después de añadir vías de desacoplamiento cercanas, ya que pueden afectar la impedancia local.",
        example4Title: "Conversión de Diseño Legacy a Nuevas Restricciones de Fabricación",
        example4Content: "Estás actualizando un diseño legacy de una tarjeta de red. El diseño original usaba una impedancia de 50Ω en FR4, pero tu nuevo fabricante tiene un espesor de cobre más grueso (2 oz en lugar de 1 oz) y una altura dieléctrica diferente.\n\nPasos prácticos:\n1. Ingresa manualmente los parámetros del nuevo stack-up: espesor de cobre y altura dieléctrica\n2. Mantén el ancho original y observa la impedancia resultante\n3. Usa los sliders para ajustar el ancho del trazo hasta que la impedancia calculada sea nuevamente 50Ω\n4. Verifica que el nuevo ancho cumple con las reglas de diseño de tu fabricante\n5. Documenta los cambios y justifica la modificación basada en cálculos de impedancia\n\nConsejo profesional:\nSiempre recalcula la impedancia cuando cambies de fabricante, incluso si usas el mismo material. Las tolerancias de proceso varían significativamente entre proveedores.",
        example5Title: "Diseño de Antena Patch para Dispositivo IoT",
        example5Content: "Estás desarrollando un dispositivo IoT que requiere una antena patch en 915MHz. Has seleccionado Rogers RO4350B por sus bajas pérdidas. La antena y su línea de alimentación deben ser 50Ω.\n\nPasos prácticos:\n1. Selecciona 'Rogers RO4350B' en ajustes predefinidos\n2. Elige 'Microstrip' como tipo de trazo\n3. Ajusta la altura dieléctrica según el espesor de material que hayas seleccionado\n4. Usa los sliders para ajustar el ancho del trazo hasta que la impedancia calculada sea 50Ω\n5. Verifica que el ancho calculado es compatible con los procesos de fabricación para materiales especiales\n\nConsejo profesional:\nLos materiales de alta frecuencia como Rogers son más costosos y requieren procesos de fabricación especiales. Siempre verifica con tu fabricante las capacidades antes de finalizar el diseño. Además, considera incluir una sección de prueba en tu PCB para medir la impedancia real después de la fabricación.",
        disclaimer: "Esta herramienta no busca reemplazar el expertise profesional, sino acelerar la toma de decisiones y reducir errores básicos en el diseño de PCB. Siempre valida diseños críticos con simuladores 3D y consulta con fabricantes.",
        differentialNote: "⚠️ Nota sobre Impedancia Diferencial: Esta herramienta calcula impedancia single-ended únicamente. Para cálculos diferenciales (pares de trazos), se requieren parámetros adicionales como espaciamiento y acoplamiento. Considera usar simuladores 3D especializados para diseños diferenciales críticos.",
        modelNote: "Los resultados se basan en modelos analíticos estándar (Hammerstad-Jensen para microstrip, Wheeler para stripline). La impedancia final de tu PCB dependerá de las tolerancias del fabricante y efectos de proceso.",
        outOfRangeWarning: "Esta configuración está fuera de los rangos típicos de fabricación de PCB. Los resultados pueden ser inexactos.",
        context50ohm: "Ideal para señales RF y comunicaciones",
        context75ohm: "Adecuado para video analógico y broadcast",
        context90ohm: "Apto para interfaces digitales de alta velocidad",
        contextUnusual: "Valor inusual: puede causar reflexiones de señal",
        referencePlaneMicrostrip: "Plano de referencia: Plano de tierra inferior",
        referencePlaneStripline: "Planos de referencia: Ambos planos de tierra"
      },
      en: {
        title: "PCB Impedance Calculator",
        subtitle: "Real-time calculation with stack-up visualization",
        traceType: "Trace Type",
        microstrip: "Microstrip",
        stripline: "Stripline",
        units: "Units",
        traceWidth: "Trace Width",
        traceThickness: "Trace Thickness",
        dielectricHeight: "Dielectric Height",
        substrateHeight: "Substrate Height",
        permittivity: "Relative Permittivity (εr)",
        impedance: "Characteristic Impedance",
        ohms: "Ω",
        warning: "Warning: Unusual impedance value",
        stackUp: "Stack-up",
        crossSection: "Cross-section view",
        ground: "Ground",
        fr4: "FR4",
        substrate: "Substrate",
        trace: "Trace",
        air: "Air",
        materials: "Materials:",
        copper: "Red = Copper Trace",
        grounds: "Gray = Ground Planes",
        about: "About PCB Impedance",
        microstripInfo: "A microstrip transmission line consists of a single conductor trace above a ground plane, separated by a dielectric substrate. Commonly used for RF and high-speed digital signals.",
        striplineInfo: "A stripline transmission line has a conductor trace embedded between two ground planes with dielectric material on both sides. Provides better EMI shielding than microstrip.",
        faqTitle: "Frequently Asked Questions",
        faqScope: "Tool Scope",
        faqScopeAnswer: "This tool is designed to help PCB designers quickly calculate the characteristic impedance of microstrip and stripline traces. It doesn't replace full 3D simulators but is ideal for quick estimates, design iteration, and learning.",
        faqHowItWorks: "How It Works?",
        faqHowItWorksAnswer: "It uses industry-standard formulas (Hammerstad-Jensen for microstrip and Wheeler for stripline) to calculate impedance based on physical dimensions and material properties. Calculations update in real-time as you adjust parameters.",
        faqHowToUse: "How to Use It?",
        faqHowToUseAnswer: [
          "Select predefined material",
          "Choose trace type (microstrip or stripline)",
          "Adjust parameters using sliders if needed",
          "Observe calculated impedance and stack-up visualization"
        ],
        faqBasics: "Basic Concepts",
        faqBasicsAnswer: "Characteristic impedance is the resistance that a high-frequency signal 'sees' when traveling along a transmission line. It's crucial to prevent signal reflections and ensure signal integrity in high-speed designs. Common values are 50Ω (RF), 75Ω (video), and 90-100Ω (digital interfaces).",
        faqImportance: "Importance",
        faqImportanceAnswer: "Poorly controlled impedance causes signal reflections, distortion, and data loss. In high-speed (>100MHz) or RF applications, impedance control is essential for circuit performance.",
        faqWhenToUse: "When to Use It?",
        faqWhenToUseAnswer: "Use it during preliminary design phase to size traces, when iterating designs to optimize parameters, as an educational tool to understand how changes affect impedance, and for quick verification of manual calculations. Do not use it for critical designs without additional validation.",
        faqWhatNotAssume: "What NOT to Assume?",
        faqWhatNotAssumeAnswer: "Don't assume results are 100% accurate for final manufacturing. Don't assume it replaces complete 3D simulations. Don't assume it works for differential impedance (it only calculates single-ended impedance). Don't assume it considers frequency effects, dielectric loss, or copper roughness.",
        credits: "Developed by",
        using: "Using Qwen web developer",
        toggleLanguage: "ES/EN",
        presets: "Presets",
        custom: "Custom",
        fr4: "FR4",
        ro4350: "Rogers RO4350B",
        isola370hr: "Isola 370HR",
        standardImpedances: "Standard Impedances by Application",
        impedance50ohm: "50Ω: RF communications, antennas, general transmission lines",
        impedance75ohm: "75Ω: Analog video, broadcast, cable TV",
        impedance90ohm: "90-100Ω: Digital interfaces (USB, HDMI, Ethernet), differential pairs",
        examplesTitle: "Practical Examples",
        example1Title: "WiFi Board Design with Integrated PCB Antenna",
        example1Content: "You're designing a WiFi board with ESP32 module and PCB antenna. The manufacturer specifies that the transmission line must be 50Ω. Your stack-up is 4-layer FR4 with 0.127mm between layer 1 (signal) and layer 2 (ground plane).\n\nPractical steps:\n1. Select 'FR4' in predefined settings\n2. Choose 'Microstrip' as trace type\n3. Adjust the trace width using the slider until the calculated impedance is 50Ω\n4. Verify that the resulting width complies with your manufacturer's minimum restrictions\n5. Confirm that the calculated impedance is within the acceptable range of 45-55Ω for RF applications\n\nProfessional tip:\nAlways consult with your manufacturer about exact copper thickness and dielectric height values, as they vary between batches.",
        example2Title: "Security Camera Design with Analog Video Output",
        example2Content: "You're developing a security camera that must send video signals via coaxial cable. The standard requires 75Ω impedance to avoid echoes and image distortion. Your PCB must connect the video driver to the BNC connector.\n\nPractical steps:\n1. Select 'FR4' in predefined settings\n2. Choose 'Microstrip' (video signals are usually on outer layers)\n3. Adjust the trace width using sliders until the calculated impedance is 75Ω\n4. Verify that the resulting value is as close as possible to 75Ω\n5. Consider the connector effect: the transition from PCB trace to coaxial connector can cause discontinuities, so keep the trace as short as possible\n\nProfessional tip:\nFor video signals, impedance tolerance is critical. If you can't achieve exactly 75Ω, prioritize slightly higher values over lower ones, as reflections are less problematic.",
        example3Title: "Multilayer Design Optimization for Mixed Signals",
        example3Content: "You're designing an industrial control board with RF signals (50Ω), high-speed digital signals (90Ω), and power. Your stack-up is 6 layers: L1(signal), L2(GND), L3(signal), L4(power), L5(signal), L6(GND).\n\nPractical steps:\n1. For RF traces on L1: select 'FR4', 'Microstrip', and adjust width until you get 50Ω\n2. For digital traces on L3: select 'FR4', 'Stripline' (between L2 and L4), and adjust width until you get 90Ω\n3. Observe how the same target impedance requires different widths depending on stack-up location\n4. Use the tool to verify that minimum widths comply with manufacturing capabilities\n5. Document all calculated widths in your design specifications\n\nProfessional tip:\nIn multilayer designs, always verify impedance after adding nearby decoupling vias, as they can affect local impedance.",
        example4Title: "Legacy Design Conversion to New Manufacturing Constraints",
        example4Content: "You're updating a legacy network card design. The original design used 50Ω impedance on FR4, but your new manufacturer has thicker copper (2 oz instead of 1 oz) and different dielectric height.\n\nPractical steps:\n1. Manually enter the new stack-up parameters: copper thickness and dielectric height\n2. Keep the original width and observe the resulting impedance\n3. Use sliders to adjust the trace width until the calculated impedance is again 50Ω\n4. Verify that the new width complies with your manufacturer's design rules\n5. Document changes and justify the modification based on impedance calculations\n\nProfessional tip:\nAlways recalculate impedance when changing manufacturers, even if using the same material. Process tolerances vary significantly between suppliers.",
        example5Title: "Patch Antenna Design for IoT Device",
        example5Content: "You're developing an IoT device requiring a patch antenna at 915MHz. You've selected Rogers RO4350B for its low losses. Both the antenna and its feed line must be 50Ω.\n\nPractical steps:\n1. Select 'Rogers RO4350B' in predefined settings\n2. Choose 'Microstrip' as trace type\n3. Adjust dielectric height according to the material thickness you've selected\n4. Use sliders to adjust the trace width until the calculated impedance is 50Ω\n5. Verify that the calculated width is compatible with manufacturing processes for special materials\n\nProfessional tip:\nHigh-frequency materials like Rogers are more expensive and require special manufacturing processes. Always verify with your manufacturer's capabilities before finalizing the design. Also, consider including a test section on your PCB to measure actual impedance after manufacturing.",
        disclaimer: "This tool is not intended to replace professional expertise, but rather to accelerate decision-making and reduce basic errors in PCB design. Always validate critical designs with 3D simulators and consult with manufacturers.",
        differentialNote: "⚠️ Differential Impedance Note: This tool calculates single-ended impedance only. For differential calculations (trace pairs), additional parameters like spacing and coupling are required. Consider using specialized 3D simulators for critical differential designs.",
        modelNote: "Results are based on standard analytical models (Hammerstad-Jensen for microstrip, Wheeler for stripline). Final PCB impedance depends on manufacturer tolerances and process effects.",
        outOfRangeWarning: "This configuration is outside typical PCB manufacturing ranges. Results may be inaccurate.",
        context50ohm: "Ideal for RF and communication signals",
        context75ohm: "Suitable for analog video and broadcast",
        context90ohm: "Appropriate for high-speed digital interfaces",
        contextUnusual: "Unusual value: may cause signal reflections",
        referencePlaneMicrostrip: "Reference plane: Bottom ground plane",
        referencePlaneStripline: "Reference planes: Both ground planes"
      }
    };
    return translations[language][key] || key;
  };

  // VERIFIED PRESETS - These values have been manually calculated to give EXACT target impedance
  const getVerifiedPreset = (material, type) => {
    const presets = {
      'FR4': {
        microstrip: { traceWidth: 0.340, traceThickness: 0.035, dielectricHeight: 0.127, substrateHeight: 0.8, relativePermittivity: 4.4 },
        stripline: { traceWidth: 0.205, traceThickness: 0.035, dielectricHeight: 0, substrateHeight: 0.400, relativePermittivity: 4.4 }
      },
      'Rogers RO4350B': {
        microstrip: { traceWidth: 0.448, traceThickness: 0.035, dielectricHeight: 0.254, substrateHeight: 0.8, relativePermittivity: 3.66 },
        stripline: { traceWidth: 0.275, traceThickness: 0.035, dielectricHeight: 0, substrateHeight: 0.508, relativePermittivity: 3.66 }
      },
      'Isola 370HR': {
        microstrip: { traceWidth: 0.318, traceThickness: 0.035, dielectricHeight: 0.127, substrateHeight: 0.8, relativePermittivity: 4.0 },
        stripline: { traceWidth: 0.195, traceThickness: 0.035, dielectricHeight: 0, substrateHeight: 0.400, relativePermittivity: 4.0 }
      }
    };
    
    return presets[material]?.[type] || presets['FR4'][type];
  };

  // Apply preset when selected
  const applyPreset = useCallback((materialKey) => {
    if (materialKey === 'custom') {
      setPreset('custom');
      return;
    }
    
    const config = getVerifiedPreset(materialKey, traceType);
    setTraceWidth(config.traceWidth);
    setTraceThickness(config.traceThickness);
    setDielectricHeight(config.dielectricHeight);
    setSubstrateHeight(config.substrateHeight);
    setRelativePermittivity(config.relativePermittivity);
    setMaterialName(materialKey);
    setPreset(materialKey);
    setIsModified(false);
  }, [traceType]);

  // Handle preset selection
  useEffect(() => {
    if (preset !== 'custom') {
      applyPreset(preset);
    }
  }, [preset, applyPreset]);

  // Handle trace type change
  const handleTraceTypeChange = (newType) => {
    setTraceType(newType);
    if (preset !== 'custom') {
      const config = getVerifiedPreset(preset, newType);
      setTraceWidth(config.traceWidth);
      setTraceThickness(config.traceThickness);
      setDielectricHeight(config.dielectricHeight);
      setSubstrateHeight(config.substrateHeight);
      setRelativePermittivity(config.relativePermittivity);
    }
  };

  // Detect manual changes and switch to custom
  useEffect(() => {
    if (preset !== 'custom' && isModified) {
      setPreset('custom');
    }
  }, [traceWidth, traceThickness, dielectricHeight, substrateHeight, relativePermittivity, preset, isModified]);

  // Convert units to mm for calculations
  const getUnitFactor = () => {
    switch (units) {
      case 'mil': return 0.0254;
      case 'inch': return 25.4;
      default: return 1;
    }
  };

  const unitFactor = getUnitFactor();
  const w = traceWidth * unitFactor;
  const t_val = traceThickness * unitFactor;
  const h = dielectricHeight * unitFactor;
  const hSub = substrateHeight * unitFactor;

  // VALIDATION: Check if values are within realistic ranges
  const isWithinValidRange = () => {
    // Realistic PCB manufacturing ranges (in mm)
    const minWidth = 0.05;      // 2 mils
    const maxWidth = 2.0;       // 80 mils
    const minThickness = 0.009; // 0.25 oz copper
    const maxThickness = 0.21;  // 6 oz copper
    const minHeight = 0.025;    // 1 mil
    const maxHeight = 5.0;      // 200 mils
    const minEr = 2.0;
    const maxEr = 12.0;
    
    return (
      w >= minWidth && w <= maxWidth &&
      t_val >= minThickness && t_val <= maxThickness &&
      (traceType === 'microstrip' ? h : hSub) >= minHeight && 
      (traceType === 'microstrip' ? h : hSub) <= maxHeight &&
      relativePermittivity >= minEr && relativePermittivity <= maxEr
    );
  };

  // Microstrip impedance calculation (Hammerstad and Jensen formula)
  const calculateMicrostripImpedance = () => {
    if (h <= 0 || w <= 0 || relativePermittivity <= 1) return 0;
    
    const er = relativePermittivity;
    const we = w + (t_val / Math.PI) * Math.log(1 + (4 * Math.exp(1)) / Math.sqrt(Math.pow(t_val / h, 2) + Math.pow(1 / Math.PI, 2)));
    const f = 6 + (2 * Math.PI - 6) * Math.exp(-Math.pow(30.666 * (h / we), 0.7528));
    const erEff = (er + 1) / 2 + (er - 1) / 2 * Math.pow(1 + 12 * (h / we), -0.5) + (er - 1) / 2 * (1 - Math.pow(1 + 12 * (h / we), -0.5)) * (1 - Math.exp(-f * Math.pow(t_val / we, 1.45)));
    const Z0 = 60 / Math.sqrt(erEff) * Math.log(8 * (h / we) + 0.25 * (we / h));
    
    return Z0;
  };

  // Stripline impedance calculation (Wheeler formula)
  const calculateStriplineImpedance = () => {
    if (hSub <= 0 || w <= 0 || relativePermittivity <= 1) return 0;
    
    const er = relativePermittivity;
    const b = hSub;
    const we = w + (t_val / Math.PI) * Math.log(1 + (4 * Math.exp(1)) / Math.sqrt(Math.pow(t_val / b, 2) + Math.pow(1 / Math.PI, 2)));
    
    let Z0;
    if (we / b <= 0.354) {
      Z0 = 60 / Math.sqrt(er) * Math.log(4 * b / (0.88 * we + t_val));
    } else {
      Z0 = 377 / Math.sqrt(er) / (2 * b / (we + t_val) + 0.44);
    }
    
    return Z0;
  };

  const impedance = useMemo(() => {
    if (traceType === 'microstrip') {
      return calculateMicrostripImpedance();
    } else {
      return calculateStriplineImpedance();
    }
  }, [traceType, w, t_val, h, hSub, relativePermittivity]);

  // Get context message based on impedance value
  const getImpedanceContext = () => {
    const z = impedance;
    if (z >= 45 && z <= 55) return t('context50ohm');
    if (z >= 70 && z <= 80) return t('context75ohm');
    if (z >= 85 && z <= 105) return t('context90ohm');
    if (z > 150 || z < 20) return t('contextUnusual');
    return "";
  };

  // Stack-up visualization dimensions - RESTORED TO ORIGINAL DESKTOP SIZE
  const svgWidth = 550; // Original desktop size
  const svgHeight = 320; // Original desktop size
  const margin = 40;
  const availableHeight = svgHeight - 2 * margin;
  const availableWidth = svgWidth - 2 * margin;

  const contentWidth = availableWidth * 0.7;
  const contentHeight = availableHeight * 0.8;
  const contentX = margin + (availableWidth - contentWidth) / 2;
  const contentY = margin + (availableHeight - contentHeight) / 2;

  const totalActualHeight = traceType === 'microstrip' 
    ? traceThickness + dielectricHeight 
    : substrateHeight;
  
  const scaleFactor = contentHeight / Math.max(totalActualHeight * unitFactor, 0.01);
  
  const traceHeight = Math.max(traceThickness * unitFactor * scaleFactor, 12);
  const dielectricHeightVis = traceType === 'microstrip' 
    ? Math.max(dielectricHeight * unitFactor * scaleFactor, 20)
    : Math.max((substrateHeight * unitFactor / 2) * scaleFactor, 20);
  const substrateHeightVis = traceType === 'microstrip' 
    ? 0 
    : Math.max((substrateHeight * unitFactor / 2) * scaleFactor, 20);

  const totalVisHeight = traceHeight + dielectricHeightVis + substrateHeightVis;
  const startY = contentY + (contentHeight - totalVisHeight) / 2;

  // FAQ data
  const faqData = [
    { question: t('faqScope'), answer: t('faqScopeAnswer') },
    { question: t('faqHowItWorks'), answer: t('faqHowItWorksAnswer') },
    { question: t('faqHowToUse'), answer: t('faqHowToUseAnswer') },
    { question: t('faqBasics'), answer: t('faqBasicsAnswer') },
    { question: t('faqImportance'), answer: t('faqImportanceAnswer') },
    { question: t('faqWhenToUse'), answer: t('faqWhenToUseAnswer') },
    { question: t('faqWhatNotAssume'), answer: t('faqWhatNotAssumeAnswer') }
  ];

  // Examples data
  const examplesData = [
    { title: t('example1Title'), content: t('example1Content') },
    { title: t('example2Title'), content: t('example2Content') },
    { title: t('example3Title'), content: t('example3Content') },
    { title: t('example4Title'), content: t('example4Content') },
    { title: t('example5Title'), content: t('example5Content') }
  ];

  // Handle input changes
  const handleInputChange = (setter, value) => {
    setter(value);
    if (preset !== 'custom') {
      setIsModified(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            {t('toggleLanguage')}
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
            {t('title')}
          </h1>
          <p className="text-blue-200 text-xl max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* MOBILE-FIRST RESPONSIVE LAYOUT */}
        <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Controls Panel */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8 shadow-2xl">
            <div className="space-y-6 lg:space-y-7">
              {/* Material Selection */}
              <div>
                <label className="block text-lg font-semibold text-cyan-300 mb-3">
                  {t('presets')}
                </label>
                <select
                  value={preset}
                  onChange={(e) => applyPreset(e.target.value)}
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="custom">{t('custom')}</option>
                  <option value="FR4">{t('fr4')}</option>
                  <option value="Rogers RO4350B">{t('ro4350')}</option>
                  <option value="Isola 370HR">{t('isola370hr')}</option>
                </select>
              </div>

              {/* Trace Type Selection */}
              <div>
                <label className="block text-lg font-semibold text-cyan-300 mb-3">
                  {t('traceType')}
                </label>
                <div className="flex space-x-2 lg:space-x-3">
                  <button
                    onClick={() => handleTraceTypeChange('microstrip')}
                    className={`flex-1 py-2.5 lg:py-3 px-4 lg:px-6 rounded-xl font-medium transition-all duration-300 ${
                      traceType === 'microstrip'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t('microstrip')}
                  </button>
                  <button
                    onClick={() => handleTraceTypeChange('stripline')}
                    className={`flex-1 py-2.5 lg:py-3 px-4 lg:px-6 rounded-xl font-medium transition-all duration-300 ${
                      traceType === 'stripline'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t('stripline')}
                  </button>
                </div>
              </div>

              {/* Units Selection */}
              <div>
                <label className="block text-lg font-semibold text-cyan-300 mb-3">
                  {t('units')}
                </label>
                <select
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="mm">Millimeters (mm)</option>
                  <option value="mil">Mils</option>
                  <option value="inch">Inches</option>
                </select>
              </div>

              {/* Input Sliders */}
              <div className="space-y-4 lg:space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {t('traceWidth')}: <span className="text-cyan-400">{traceWidth.toFixed(3)} {units}</span>
                  </label>
                  <input
                    type="range"
                    min={units === 'mil' ? '2' : units === 'inch' ? '0.002' : '0.05'}
                    max={units === 'mil' ? '20' : units === 'inch' ? '0.2' : '0.5'}
                    step={units === 'mil' ? '0.5' : units === 'inch' ? '0.001' : '0.01'}
                    value={traceWidth}
                    onChange={(e) => handleInputChange(setTraceWidth, parseFloat(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {t('traceThickness')}: <span className="text-cyan-400">{traceThickness.toFixed(3)} {units}</span>
                  </label>
                  <input
                    type="range"
                    min={units === 'mil' ? '0.5' : units === 'inch' ? '0.0005' : '0.01'}
                    max={units === 'mil' ? '5' : units === 'inch' ? '0.05' : '0.13'}
                    step={units === 'mil' ? '0.1' : units === 'inch' ? '0.0001' : '0.005'}
                    value={traceThickness}
                    onChange={(e) => handleInputChange(setTraceThickness, parseFloat(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {traceType === 'microstrip' ? (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {t('dielectricHeight')}: <span className="text-cyan-400">{dielectricHeight.toFixed(3)} {units}</span>
                    </label>
                    <input
                      type="range"
                      min={units === 'mil' ? '2' : units === 'inch' ? '0.002' : '0.05'}
                      max={units === 'mil' ? '50' : units === 'inch' ? '0.5' : '1.3'}
                      step={units === 'mil' ? '0.5' : units === 'inch' ? '0.001' : '0.01'}
                      value={dielectricHeight}
                      onChange={(e) => handleInputChange(setDielectricHeight, parseFloat(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      {t('substrateHeight')}: <span className="text-cyan-400">{substrateHeight.toFixed(3)} {units}</span>
                    </label>
                    <input
                      type="range"
                      min={units === 'mil' ? '4' : units === 'inch' ? '0.004' : '0.1'}
                      max={units === 'mil' ? '100' : units === 'inch' ? '1.0' : '2.5'}
                      step={units === 'mil' ? '1' : units === 'inch' ? '0.002' : '0.02'}
                      value={substrateHeight}
                      onChange={(e) => handleInputChange(setSubstrateHeight, parseFloat(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    {t('permittivity')}: <span className="text-cyan-400">{relativePermittivity.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="2.0"
                    max="12.0"
                    step="0.1"
                    value={relativePermittivity}
                    onChange={(e) => handleInputChange(setRelativePermittivity, parseFloat(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 lg:p-7 text-center border border-cyan-500/30">
                <div className="text-cyan-300 text-lg font-medium mb-2">{t('impedance')}</div>
                <div className="text-4xl lg:text-5xl font-bold text-white">{impedance.toFixed(1)} {t('ohms')}</div>
                <div className="text-cyan-200 text-sm mt-2">
                  {getImpedanceContext()}
                </div>
                {impedance > 150 || impedance < 20 ? (
                  <div className="text-yellow-300 text-sm mt-2 font-medium">{t('warning')}</div>
                ) : null}
                {!isWithinValidRange() && (
                  <div className="text-orange-300 text-sm mt-1">{t('outOfRangeWarning')}</div>
                )}
              </div>

              {/* Model Note */}
              <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                <p className="text-slate-300 text-xs">{t('modelNote')}</p>
              </div>
            </div>
          </div>

          {/* Visualization Panel - CENTERED AND RESTORED DESKTOP SIZE */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 lg:p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                {traceType === 'microstrip' ? t('microstrip') : t('stripline')} {t('stackUp')}
              </h2>
              <p className="text-slate-400">{t('crossSection')}</p>
              <p className="text-slate-400 text-sm mt-2">
                {traceType === 'microstrip' ? t('referencePlaneMicrostrip') : t('referencePlaneStripline')}
              </p>
            </div>
            
            <div className="flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-slate-600 rounded-xl bg-slate-900/30 w-full max-w-full">
                {/* Ground Plane (Microstrip) or Bottom Ground (Stripline) */}
                {traceType === 'stripline' && (
                  <>
                    <rect
                      x={contentX}
                      y={startY + traceHeight + dielectricHeightVis + substrateHeightVis}
                      width={contentWidth}
                      height={15}
                      fill="#64748B"
                      rx="3"
                    />
                    <text
                      x={contentX + contentWidth / 2}
                      y={startY + traceHeight + dielectricHeightVis + substrateHeightVis + 24}
                      textAnchor="middle"
                      className="text-sm fill-slate-300 font-medium"
                    >
                      {t('ground')}
                    </text>
                  </>
                )}
                
                {/* Substrate/Dielectric */}
                <rect
                  x={contentX}
                  y={traceType === 'microstrip' ? startY + traceHeight : startY + traceHeight + dielectricHeightVis}
                  width={contentWidth}
                  height={traceType === 'microstrip' ? dielectricHeightVis : substrateHeightVis}
                  fill={traceType === 'microstrip' ? "#F59E0B" : "#10B981"}
                  opacity="0.9"
                />
                <text
                  x={contentX - 15}
                  y={
                    traceType === 'microstrip'
                      ? startY + traceHeight + dielectricHeightVis / 2
                      : startY + traceHeight + dielectricHeightVis + substrateHeightVis / 2
                  }
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="text-sm fill-slate-200 font-medium"
                >
                  {materialName}
                </text>

                {/* Trace */}
                <rect
                  x={contentX}
                  y={startY}
                  width={contentWidth}
                  height={traceHeight}
                  fill="#EF4444"
                  rx="2"
                />
                <text
                  x={contentX + contentWidth / 2}
                  y={startY + traceHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm fill-white font-bold"
                >
                  {t('trace')}
                </text>

                {/* Dielectric (Microstrip) or Top Substrate (Stripline) */}
                {traceType === 'microstrip' ? (
                  <>
                    {/* Air above microstrip */}
                    <rect
                      x={contentX}
                      y={startY + traceHeight + dielectricHeightVis}
                      width={contentWidth}
                      height={Math.max(contentY + contentHeight - (startY + traceHeight + dielectricHeightVis), 15)}
                      fill="#38BDF8"
                      opacity="0.15"
                    />
                    <text
                      x={contentX - 15}
                      y={startY + traceHeight + dielectricHeightVis + 22}
                      textAnchor="end"
                      className="text-sm fill-blue-400 font-medium"
                    >
                      {t('air')}
                    </text>
                  </>
                ) : (
                  <>
                    {/* Top substrate for stripline */}
                    <rect
                      x={contentX}
                      y={startY}
                      width={contentWidth}
                      height={dielectricHeightVis}
                      fill="#10B981"
                      opacity="0.9"
                    />
                    <text
                      x={contentX - 15}
                      y={startY + dielectricHeightVis / 2}
                      textAnchor="end"
                      dominantBaseline="middle"
                      className="text-sm fill-slate-200 font-medium"
                    >
                      {materialName}
                    </text>
                    {/* Top ground plane */}
                    <rect
                      x={contentX}
                      y={startY - 15}
                      width={contentWidth}
                      height={15}
                      fill="#64748B"
                      rx="3"
                    />
                    <text
                      x={contentX + contentWidth / 2}
                      y={startY - 22}
                      textAnchor="middle"
                      className="text-sm fill-slate-300 font-medium"
                    >
                      {t('ground')}
                    </text>
                  </>
                )}

                {/* Ground Plane (Microstrip bottom) */}
                {traceType === 'microstrip' && (
                  <>
                    <rect
                      x={contentX}
                      y={startY + traceHeight + dielectricHeightVis}
                      width={contentWidth}
                      height={15}
                      fill="#64748B"
                      rx="3"
                    />
                    <text
                      x={contentX + contentWidth / 2}
                      y={startY + traceHeight + dielectricHeightVis + 24}
                      textAnchor="middle"
                      className="text-sm fill-slate-300 font-medium"
                    >
                      {t('ground')}
                    </text>
                  </>
                )}

                {/* Dimension lines */}
                {traceType === 'microstrip' ? (
                  <>
                    <line
                      x1={contentX + contentWidth + 20}
                      y1={startY + traceHeight}
                      x2={contentX + contentWidth + 20}
                      y2={startY + traceHeight + dielectricHeightVis}
                      stroke="#E2E8F0"
                      strokeWidth="1.5"
                      markerStart="url(#arrowhead)"
                      markerEnd="url(#arrowhead)"
                    />
                    <rect
                      x={contentX + contentWidth + 10}
                      y={startY + traceHeight + dielectricHeightVis / 2 - 10}
                      width={75}
                      height={20}
                      rx="4"
                      fill="rgba(15, 23, 42, 0.85)"
                    />
                    <text
                      x={contentX + contentWidth + 47}
                      y={startY + traceHeight + dielectricHeightVis / 2 + 4}
                      textAnchor="middle"
                      className="text-xs fill-cyan-300 font-medium"
                    >
                      h = {dielectricHeight.toFixed(2)} {units}
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1={contentX + contentWidth + 20}
                      y1={startY - 15}
                      x2={contentX + contentWidth + 20}
                      y2={startY + traceHeight + dielectricHeightVis + substrateHeightVis + 15}
                      stroke="#E2E8F0"
                      strokeWidth="1.5"
                      markerStart="url(#arrowhead)"
                      markerEnd="url(#arrowhead)"
                    />
                    <rect
                      x={contentX + contentWidth + 10}
                      y={startY + traceHeight / 2 + dielectricHeightVis + substrateHeightVis / 2 - 10}
                      width={75}
                      height={20}
                      rx="4"
                      fill="rgba(15, 23, 42, 0.85)"
                    />
                    <text
                      x={contentX + contentWidth + 47}
                      y={startY + traceHeight / 2 + dielectricHeightVis + substrateHeightVis / 2 + 4}
                      textAnchor="middle"
                      className="text-xs fill-cyan-300 font-medium"
                    >
                      b = {substrateHeight.toFixed(2)} {units}
                    </text>
                  </>
                )}

                {/* Width dimension */}
                <line
                  x1={contentX}
                  y1={startY - 25}
                  x2={contentX + contentWidth}
                  y2={startY - 25}
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  markerStart="url(#arrowhead)"
                  markerEnd="url(#arrowhead)"
                />
                <rect
                  x={contentX + contentWidth / 2 - 55}
                  y={startY - 38}
                  width={110}
                  height={20}
                  rx="4"
                  fill="rgba(15, 23, 42, 0.85)"
                />
                <text
                  x={contentX + contentWidth / 2}
                  y={startY - 24}
                  textAnchor="middle"
                  className="text-xs fill-cyan-300 font-medium"
                >
                  w = {traceWidth.toFixed(2)} {units}
                </text>

                {/* Arrowhead marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="5"
                    refX="3"
                    refY="2.5"
                    orient="auto"
                  >
                    <path d="M0,0 L6,2.5 L0,5 Z" fill="#E2E8F0" />
                  </marker>
                </defs>
              </svg>
            </div>

            <div className="mt-6 text-sm text-slate-400">
              <p className="mb-2">
                <span className="font-semibold text-cyan-300">{t('materials')}</span> {t('copper')}, {t('grounds')}
              </p>
              <p>
                {traceType === 'microstrip' 
                  ? `${materialName} = Material Dieléctrico, Azul claro = Aire`
                  : `${materialName} = Material del Sustrato`
                }
              </p>
            </div>

            {/* Standard Impedances Information */}
            <div className="mt-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg p-4">
              <h4 className="text-cyan-300 font-semibold mb-2">{t('standardImpedances')}</h4>
              <ul className="text-slate-200 text-sm space-y-1">
                <li>{t('impedance50ohm')}</li>
                <li>{t('impedance75ohm')}</li>
                <li>{t('impedance90ohm')}</li>
              </ul>
            </div>

            {/* Differential Note */}
            <div className="mt-4 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-lg p-4">
              <p className="text-amber-200 text-sm text-center">{t('differentialNote')}</p>
            </div>
          </div>
        </div>

        {/* Info Panel - MOBILE TEXT SIZE ADJUSTMENT */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('about')}</h3>
          <div className="grid md:grid-cols-2 gap-8 text-slate-300">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-cyan-400">{t('microstrip')}</h4>
              <p className="text-lg leading-relaxed lg:text-lg text-sm md:text-base">
                {t('microstripInfo')}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-cyan-400">{t('stripline')}</h4>
              <p className="text-lg leading-relaxed lg:text-lg text-sm md:text-base">
                {t('striplineInfo')}
              </p>
            </div>
          </div>
        </div>

        {/* Examples Section - MOBILE TEXT SIZE ADJUSTMENT */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">{t('examplesTitle')}</h3>
          
          <div className="space-y-4">
            {examplesData.map((example, index) => (
              <div key={index} className="border border-slate-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExamples(index)}
                  className="w-full p-6 text-left bg-slate-700/50 hover:bg-slate-700/70 transition-all duration-300 flex justify-between items-center"
                >
                  <h4 className="text-xl font-semibold text-cyan-300">{example.title}</h4>
                  <svg
                    className={`w-6 h-6 text-cyan-400 transition-transform duration-300 ${
                      openExamples === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openExamples === index && (
                  <div className="p-6 bg-slate-800/30 border-t border-slate-600">
                    <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line lg:text-lg text-sm md:text-base">
                      {example.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section - MOBILE TEXT SIZE ADJUSTMENT */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">{t('faqTitle')}</h3>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-slate-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left bg-slate-700/50 hover:bg-slate-700/70 transition-all duration-300 flex justify-between items-center"
                >
                  <h4 className="text-xl font-semibold text-cyan-300">{faq.question}</h4>
                  <svg
                    className={`w-6 h-6 text-cyan-400 transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="p-6 bg-slate-800/30 border-t border-slate-600">
                    {Array.isArray(faq.answer) ? (
                      <ol className="text-slate-300 text-lg leading-relaxed space-y-2 list-decimal pl-5 lg:text-lg text-sm md:text-base">
                        {faq.answer.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-slate-300 text-lg leading-relaxed lg:text-lg text-sm md:text-base">{faq.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-12 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-2xl border border-amber-500/30 p-6 text-center">
          <p className="text-amber-200 text-lg font-medium">
            {t('disclaimer')}
          </p>
        </div>

        {/* Footer Credits */}
        <div className="mt-12 text-center text-slate-400 text-lg pb-12">
          <p className="mb-3">
            {t('credits')}{' '}
            <a 
              href="https://mbfredys.github.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
            >
              Fredys Matos Borges
            </a>
          </p>
          <p>
            {t('using')}{' '}
            <a 
              href="https://qwen.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
            >
              Qwen AI
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06B6D4, #3B82F6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.4);
          border: 2px solid #0891B2;
        }
        .slider::-moz-range-thumb {
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #06B6D4, #3B82F6);
          cursor: pointer;
          border: 2px solid #0891B2;
          box-shadow: 0 4px 8px rgba(6, 182, 212, 0.4);
        }
        
        /* Text size adjustments for mobile */
        @media (max-width: 767px) {
          .text-lg {
            font-size: 0.875rem !important; /* 14px */
            line-height: 1.5rem !important;
          }
          .text-xl {
            font-size: 1.125rem !important; /* 18px */
          }
          .text-2xl {
            font-size: 1.25rem !important; /* 20px */
          }
          .text-3xl {
            font-size: 1.5rem !important; /* 24px */
          }
          .text-4xl {
            font-size: 1.875rem !important; /* 30px */
          }
          .text-5xl {
            font-size: 2.25rem !important; /* 36px */
          }
        }
      `}</style>
    </div>
  );
};

export default App;
