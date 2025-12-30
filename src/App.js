import React, { useState, useEffect, useMemo, useCallback } from 'react';

const App = () => {
  const [language, setLanguage] = useState('es');
  const [traceType, setTraceType] = useState('microstrip');
  const [traceWidth, setTraceWidth] = useState(0.2);
  const [traceThickness, setTraceThickness] = useState(0.035);
  const [dielectricHeight, setDielectricHeight] = useState(0.1);
  const [substrateHeight, setSubstrateHeight] = useState(0.8);
  const [relativePermittivity, setRelativePermittivity] = useState(4.4);
  const [units, setUnits] = useState('mm');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [preset, setPreset] = useState('custom');
  const [materialName, setMaterialName] = useState('FR4');
  const [isModified, setIsModified] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
          "1. Selecciona el tipo de trazo (microstrip o stripline)",
          "2. Ajusta los parámetros usando los sliders",
          "3. Observa la impedancia calculada y la visualización del stack-up",
          "4. Experimenta cambiando valores para ver cómo afectan la impedancia"
        ],
        faqBasics: "Conceptos Básicos",
        faqBasicsAnswer: "La impedancia característica es la resistencia que una señal de alta frecuencia 've' al viajar por una línea de transmisión. Es crucial para evitar reflexiones de señal y asegurar la integridad del señal en diseños de alta velocidad. Valores comunes son 50Ω (RF) y 100Ω (diferencial).",
        faqImportance: "Importancia",
        faqImportanceAnswer: "Una impedancia mal controlada causa reflexiones de señal, distorsión, y pérdida de datos. En aplicaciones de alta velocidad (>100MHz) o RF, el control de impedancia es esencial para el rendimiento del circuito.",
        credits: "Desarrollado por",
        using: "Usando el desarrollador web de",
        toggleLanguage: "EN/ES",
        presets: "Ajustes Predefinidos",
        custom: "Personalizado",
        fr4_50ohm: "FR4 50Ω Microstrip",
        fr4_100ohm: "FR4 100Ω Diferencial",
        ro4350: "Rogers RO4350B",
        isola370hr: "Isola 370HR"
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
          "1. Select trace type (microstrip or stripline)",
          "2. Adjust parameters using sliders",
          "3. Observe calculated impedance and stack-up visualization",
          "4. Experiment by changing values to see how they affect impedance"
        ],
        faqBasics: "Basic Concepts",
        faqBasicsAnswer: "Characteristic impedance is the resistance that a high-frequency signal 'sees' when traveling along a transmission line. It's crucial to prevent signal reflections and ensure signal integrity in high-speed designs. Common values are 50Ω (RF) and 100Ω (differential).",
        faqImportance: "Importance",
        faqImportanceAnswer: "Poorly controlled impedance causes signal reflections, distortion, and data loss. In high-speed (>100MHz) or RF applications, impedance control is essential for circuit performance.",
        credits: "Developed by",
        using: "Using Qwen web developer",
        toggleLanguage: "ES/EN",
        presets: "Presets",
        custom: "Custom",
        fr4_50ohm: "FR4 50Ω Microstrip",
        fr4_100ohm: "FR4 100Ω Differential",
        ro4350: "Rogers RO4350B",
        isola370hr: "Isola 370HR"
      }
    };
    return translations[language][key] || key;
  };

  // Preset configurations WITH CORRECTED VALUES
  const presets = {
    custom: { materialName: 'Custom' },
    fr4_50ohm: {
      traceType: 'microstrip',
      traceWidth: 0.25,
      traceThickness: 0.035,
      dielectricHeight: 0.127,
      substrateHeight: 0.8,
      relativePermittivity: 4.4,
      materialName: 'FR4'
    },
    fr4_100ohm: {
      traceType: 'stripline',
      traceWidth: 0.15,
      traceThickness: 0.035,
      dielectricHeight: 0,
      substrateHeight: 0.6, // CORRECTED: was 0.254, now 0.6mm for realistic 100Ω stripline
      relativePermittivity: 4.4,
      materialName: 'FR4'
    },
    ro4350: {
      traceType: 'microstrip',
      traceWidth: 0.48, // CORRECTED: was 0.3, now 0.48mm for 50Ω on RO4350B
      traceThickness: 0.035,
      dielectricHeight: 0.254,
      substrateHeight: 0.8,
      relativePermittivity: 3.66,
      materialName: 'Rogers RO4350B'
    },
    isola370hr: {
      traceType: 'microstrip',
      traceWidth: 0.2,
      traceThickness: 0.035,
      dielectricHeight: 0.1,
      substrateHeight: 0.8,
      relativePermittivity: 4.0,
      materialName: 'Isola 370HR'
    }
  };

  // Apply preset when selected
  const applyPreset = useCallback((presetKey) => {
    if (presetKey === 'custom') {
      setPreset('custom');
      return;
    }
    
    const config = presets[presetKey];
    setTraceType(config.traceType);
    setTraceWidth(config.traceWidth);
    setTraceThickness(config.traceThickness);
    setDielectricHeight(config.dielectricHeight);
    setSubstrateHeight(config.substrateHeight);
    setRelativePermittivity(config.relativePermittivity);
    setMaterialName(config.materialName);
    setPreset(presetKey);
    setIsModified(false);
  }, [presets]);

  // Handle preset selection
  useEffect(() => {
    applyPreset(preset);
  }, [preset, applyPreset]);

  // Detect manual changes and switch to custom
  useEffect(() => {
    if (preset !== 'custom' && isModified) {
      setPreset('custom');
    }
  }, [traceType, traceWidth, traceThickness, dielectricHeight, substrateHeight, relativePermittivity, preset, isModified]);

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

  // Stack-up visualization dimensions - REDUCED SIZE FOR BETTER FIT
  const svgWidth = 550;
  const svgHeight = 320;
  const margin = 40;
  const availableHeight = svgHeight - 2 * margin;
  const availableWidth = svgWidth - 2 * margin;

  // Reduce internal content to 70% of available space
  const contentWidth = availableWidth * 0.7;
  const contentHeight = availableHeight * 0.8;
  const contentX = margin + (availableWidth - contentWidth) / 2;
  const contentY = margin + (availableHeight - contentHeight) / 2;

  // Calculate layer heights within the constrained content area
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
    { question: t('faqImportance'), answer: t('faqImportanceAnswer') }
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

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Controls Panel */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
            <div className="space-y-7">
              {/* Presets Selection */}
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
                  <option value="fr4_50ohm">{t('fr4_50ohm')}</option>
                  <option value="fr4_100ohm">{t('fr4_100ohm')}</option>
                  <option value="ro4350">{t('ro4350')}</option>
                  <option value="isola370hr">{t('isola370hr')}</option>
                </select>
              </div>

              {/* Trace Type Selection */}
              <div>
                <label className="block text-lg font-semibold text-cyan-300 mb-3">
                  {t('traceType')}
                </label>
                <div className="flex space-x-3">
                  <button
                    onClick={(e) => handleInputChange(setTraceType, 'microstrip')}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                      traceType === 'microstrip'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {t('microstrip')}
                  </button>
                  <button
                    onClick={(e) => handleInputChange(setTraceType, 'stripline')}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
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
              <div className="space-y-5">
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
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-7 text-center border border-cyan-500/30">
                <div className="text-cyan-300 text-lg font-medium mb-2">{t('impedance')}</div>
                <div className="text-5xl font-bold text-white">{impedance.toFixed(1)} {t('ohms')}</div>
                {impedance > 150 || impedance < 20 ? (
                  <div className="text-yellow-300 text-sm mt-3 font-medium">{t('warning')}</div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Visualization Panel - CORRECTED MATERIAL DISPLAY */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {traceType === 'microstrip' ? t('microstrip') : t('stripline')} {t('stackUp')}
              </h2>
              <p className="text-slate-400">{t('crossSection')}</p>
            </div>
            
            <div className="flex justify-center">
              <svg width={svgWidth} height={svgHeight} className="border border-slate-600 rounded-xl bg-slate-900/30">
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
                
                {/* Substrate/Dielectric - NOW SHOWS CORRECT MATERIAL NAME */}
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

                {/* Dimension lines - FULLY CONTAINED */}
                {traceType === 'microstrip' ? (
                  <>
                    {/* Height dimension - inside SVG */}
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
                    {/* Total height dimension - inside SVG */}
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

                {/* Width dimension - inside SVG */}
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
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('about')}</h3>
          <div className="grid md:grid-cols-2 gap-8 text-slate-300">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-cyan-400">{t('microstrip')}</h4>
              <p className="text-lg leading-relaxed">
                {t('microstripInfo')}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-cyan-400">{t('stripline')}</h4>
              <p className="text-lg leading-relaxed">
                {t('striplineInfo')}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section - COLLAPSIBLE WITH PROPER LIST */}
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
                      <ol className="text-slate-300 text-lg leading-relaxed space-y-2 list-decimal pl-5">
                        {faq.answer.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-slate-300 text-lg leading-relaxed">{faq.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Credits */}
        <div className="mt-16 text-center text-slate-400 text-lg pb-12">
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
      `}</style>
    </div>
  );
};

export default App;
