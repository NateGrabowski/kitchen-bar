import React, { useState } from 'react';

export default function CabinetFaceOptionsV2() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [showDimensions, setShowDimensions] = useState(true);
  const [cabinetColor, setCabinetColor] = useState('white');
  const [showLED, setShowLED] = useState(true);
  
  const barLength = 92; // Updated to 92"
  const cabinetHeight = 38;
  
  const colorSchemes = {
    white: { cabinet: '#f5f5f0', accent: '#3d4a5c', drawer: '#e8e8e3', glass: 'rgba(200, 220, 240, 0.25)', open: '#1a1a2e', wood: '#c4a77d' },
    sage: { cabinet: '#8b9a7d', accent: '#2d3a28', drawer: '#7a8970', glass: 'rgba(180, 200, 180, 0.25)', open: '#1a2a1e', wood: '#a89070' },
    navy: { cabinet: '#3d4f5f', accent: '#1a252e', drawer: '#344555', glass: 'rgba(150, 180, 210, 0.25)', open: '#0f1a24', wood: '#b8996f' },
    warmGray: { cabinet: '#8a8580', accent: '#4a4540', drawer: '#7a7570', glass: 'rgba(180, 175, 170, 0.25)', open: '#1a1815', wood: '#c4a77d' },
    natural: { cabinet: '#c4a77d', accent: '#5b4434', drawer: '#b8996f', glass: 'rgba(220, 200, 170, 0.25)', open: '#1a1510', wood: '#a07d50' },
    black: { cabinet: '#2a2a2a', accent: '#1a1a1a', drawer: '#3a3a3a', glass: 'rgba(100, 100, 100, 0.25)', open: '#0a0a0a', wood: '#c4a77d' },
  };
  
  const colors = colorSchemes[cabinetColor];
  
  // Section types: 
  // - door: single shaker door
  // - split-door: double doors (split in middle)
  // - drawer-door: drawer on top, door below
  // - drawer-split: drawer on top, split doors below
  // - glass: single glass door
  // - split-glass: double glass doors
  // - open: open shelving
  // - x-panel: farmhouse X pattern door
  // - split-x: double X pattern doors
  // - fluted-glass: ribbed/fluted glass door
  // - barn-door: sliding barn door section

  const options = [
    {
      name: "Classic Three-Door",
      description: "Three equal shaker doors. Clean, balanced, traditional farmhouse.",
      sections: [
        { type: 'door', width: 30.5, style: 'shaker' },
        { type: 'door', width: 31, style: 'shaker' },
        { type: 'door', width: 30.5, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Center Split Doors",
      description: "Single doors on ends, wide split-door section in the center. Great focal point.",
      sections: [
        { type: 'door', width: 23.5, style: 'shaker' },
        { type: 'split-door', width: 45, style: 'shaker' },
        { type: 'door', width: 23.5, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Double Split Layout",
      description: "Two wide split-door sections. Maximum storage access, furniture-like feel.",
      sections: [
        { type: 'split-door', width: 46, style: 'shaker' },
        { type: 'split-door', width: 46, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Drawer + Split Combo",
      description: "Drawers on top for easy access, split doors below. Very functional layout.",
      sections: [
        { type: 'drawer-split', width: 31, drawerHeight: 9 },
        { type: 'drawer-split', width: 30, drawerHeight: 9 },
        { type: 'drawer-split', width: 31, drawerHeight: 9 },
      ],
      hasTopShelf: false,
    },
    {
      name: "Glass Center Display",
      description: "Split glass doors in center flanked by solid doors. Show off nice items.",
      sections: [
        { type: 'door', width: 25.5, style: 'shaker' },
        { type: 'split-glass', width: 41 },
        { type: 'door', width: 25.5, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Open + Split Mix",
      description: "Open display niche flanked by split-door storage. Layered visual interest.",
      sections: [
        { type: 'split-door', width: 33.5, style: 'shaker' },
        { type: 'open', width: 25 },
        { type: 'split-door', width: 33.5, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Farmhouse X-Panel Split",
      description: "Split X-pattern doors across the full width. Bold farmhouse statement.",
      sections: [
        { type: 'split-x', width: 31 },
        { type: 'split-x', width: 30 },
        { type: 'split-x', width: 31 },
      ],
      hasTopShelf: false,
    },
    {
      name: "Asymmetric Modern",
      description: "Off-center split doors with single door end. Dynamic, contemporary farmhouse.",
      sections: [
        { type: 'door', width: 22, style: 'shaker' },
        { type: 'split-door', width: 47, style: 'shaker' },
        { type: 'open', width: 23 },
      ],
      hasTopShelf: false,
    },
    {
      name: "Floating Shelf + Storage",
      description: "Open display shelf above, split doors below. Like your reference image (idea3).",
      sections: [
        { type: 'split-door', width: 31, style: 'shaker' },
        { type: 'split-door', width: 30, style: 'shaker' },
        { type: 'split-door', width: 31, style: 'shaker' },
      ],
      hasTopShelf: true,
      topShelfHeight: 10,
      topShelfStyle: 'floating',
    },
    {
      name: "Fluted Glass Elegance",
      description: "Ribbed/fluted glass split doors in center. Modern luxury farmhouse look.",
      sections: [
        { type: 'door', width: 23.5, style: 'shaker' },
        { type: 'split-fluted', width: 45 },
        { type: 'door', width: 23.5, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Triple Glass Display",
      description: "Three split-glass sections with LED lighting. Maximum display potential.",
      sections: [
        { type: 'split-glass', width: 31 },
        { type: 'split-glass', width: 30 },
        { type: 'split-glass', width: 31 },
      ],
      hasTopShelf: false,
    },
    {
      name: "Sideboard Classic",
      description: "Four equal split-door sections like a traditional sideboard buffet.",
      sections: [
        { type: 'split-door', width: 23, style: 'shaker' },
        { type: 'split-door', width: 23, style: 'shaker' },
        { type: 'split-door', width: 23, style: 'shaker' },
        { type: 'split-door', width: 23, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Mixed Materials",
      description: "Alternating glass and solid split doors. Visual rhythm and variety.",
      sections: [
        { type: 'split-glass', width: 31 },
        { type: 'split-door', width: 30, style: 'shaker' },
        { type: 'split-glass', width: 31 },
      ],
      hasTopShelf: false,
    },
    {
      name: "Barn Door Feature",
      description: "Sliding barn door section with open storage. Maximum farmhouse character.",
      sections: [
        { type: 'door', width: 23.5, style: 'shaker' },
        { type: 'barn-door', width: 45 },
        { type: 'door', width: 23.5, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
    {
      name: "Wine Bar Layout",
      description: "Split glass center for wine display, drawers + doors on ends for accessories.",
      sections: [
        { type: 'drawer-door', width: 25.5, drawerHeight: 8 },
        { type: 'split-glass', width: 41 },
        { type: 'drawer-door', width: 25.5, drawerHeight: 8 },
      ],
      hasTopShelf: false,
    },
    {
      name: "Drawer Bank + Display",
      description: "Bank of drawers on one end, open display center, split doors on other.",
      sections: [
        { type: 'triple-drawer', width: 28 },
        { type: 'open', width: 29 },
        { type: 'split-door', width: 35, style: 'shaker' },
      ],
      hasTopShelf: false,
    },
  ];
  
  const current = options[selectedOption];
  const scale = 4.0;
  
  const renderDoorStyle = (style, x, y, w, h) => {
    if (style === 'shaker') {
      const inset = Math.min(8, w * 0.08);
      return (
        <rect 
          x={x + inset} 
          y={y + inset} 
          width={w - inset * 2} 
          height={h - inset * 2} 
          fill="none" 
          stroke={colors.accent} 
          strokeWidth="1.5"
          rx="2"
        />
      );
    }
    if (style === 'x-panel') {
      const inset = Math.min(6, w * 0.06);
      return (
        <g>
          <rect 
            x={x + inset} 
            y={y + inset} 
            width={w - inset * 2} 
            height={h - inset * 2} 
            fill="none" 
            stroke={colors.accent} 
            strokeWidth="1.5"
            rx="2"
          />
          <line 
            x1={x + inset + 4} 
            y1={y + inset + 4} 
            x2={x + w - inset - 4} 
            y2={y + h - inset - 4} 
            stroke={colors.accent} 
            strokeWidth="2"
          />
          <line 
            x1={x + w - inset - 4} 
            y1={y + inset + 4} 
            x2={x + inset + 4} 
            y2={y + h - inset - 4} 
            stroke={colors.accent} 
            strokeWidth="2"
          />
        </g>
      );
    }
    return null;
  };
  
  const renderFlutedPattern = (x, y, w, h) => {
    const numLines = Math.floor(w / 6);
    const spacing = w / numLines;
    return (
      <g>
        {Array.from({ length: numLines }).map((_, i) => (
          <line
            key={i}
            x1={x + i * spacing + spacing/2}
            y1={y + 4}
            x2={x + i * spacing + spacing/2}
            y2={y + h - 4}
            stroke={colors.accent}
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
      </g>
    );
  };
  
  const renderSection = (section, xOffset, cabinetTop, mainHeight) => {
    const w = section.width * scale;
    const x = xOffset;
    const gap = 3; // Gap between split doors
    
    // Single shaker door
    if (section.type === 'door') {
      return (
        <g key={`door-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle(section.style, x, cabinetTop, w, mainHeight)}
          <rect x={x + w - 16} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Split double doors
    if (section.type === 'split-door') {
      const halfW = (w - gap) / 2;
      return (
        <g key={`split-${x}`}>
          {/* Left door */}
          <rect x={x} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle(section.style, x, cabinetTop, halfW, mainHeight)}
          <rect x={x + halfW - 14} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
          {/* Right door */}
          <rect x={x + halfW + gap} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle(section.style, x + halfW + gap, cabinetTop, halfW, mainHeight)}
          <rect x={x + halfW + gap + 9} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Split X-panel doors
    if (section.type === 'split-x') {
      const halfW = (w - gap) / 2;
      return (
        <g key={`splitx-${x}`}>
          <rect x={x} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle('x-panel', x, cabinetTop, halfW, mainHeight)}
          <rect x={x + halfW - 14} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
          <rect x={x + halfW + gap} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle('x-panel', x + halfW + gap, cabinetTop, halfW, mainHeight)}
          <rect x={x + halfW + gap + 9} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Drawer + single door
    if (section.type === 'drawer-door') {
      const drawerH = section.drawerHeight * scale;
      const doorH = mainHeight - drawerH - 4;
      return (
        <g key={`dd-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={drawerH} fill={colors.drawer} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <rect x={x + w/2 - 18} y={cabinetTop + drawerH/2 - 3} width="36" height="6" fill={colors.accent} rx="2"/>
          <rect x={x} y={cabinetTop + drawerH + 4} width={w} height={doorH} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle('shaker', x, cabinetTop + drawerH + 4, w, doorH)}
          <rect x={x + w - 16} y={cabinetTop + drawerH + 4 + doorH/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Drawer + split doors
    if (section.type === 'drawer-split') {
      const drawerH = section.drawerHeight * scale;
      const doorH = mainHeight - drawerH - 4;
      const halfW = (w - gap) / 2;
      return (
        <g key={`ds-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={drawerH} fill={colors.drawer} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <rect x={x + w/2 - 18} y={cabinetTop + drawerH/2 - 3} width="36" height="6" fill={colors.accent} rx="2"/>
          <rect x={x} y={cabinetTop + drawerH + 4} width={halfW} height={doorH} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle('shaker', x, cabinetTop + drawerH + 4, halfW, doorH)}
          <rect x={x + halfW - 14} y={cabinetTop + drawerH + 4 + doorH/2 - 10} width="5" height="20" fill={colors.accent} rx="2"/>
          <rect x={x + halfW + gap} y={cabinetTop + drawerH + 4} width={halfW} height={doorH} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderDoorStyle('shaker', x + halfW + gap, cabinetTop + drawerH + 4, halfW, doorH)}
          <rect x={x + halfW + gap + 9} y={cabinetTop + drawerH + 4 + doorH/2 - 10} width="5" height="20" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Triple drawer bank
    if (section.type === 'triple-drawer') {
      const drawerH = (mainHeight - 8) / 3;
      return (
        <g key={`triple-${x}`}>
          {[0, 1, 2].map(i => (
            <g key={i}>
              <rect x={x} y={cabinetTop + i * (drawerH + 4)} width={w} height={drawerH} fill={colors.drawer} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
              <rect x={x + w/2 - 20} y={cabinetTop + i * (drawerH + 4) + drawerH/2 - 3} width="40" height="6" fill={colors.accent} rx="2"/>
            </g>
          ))}
        </g>
      );
    }
    
    // Single glass door
    if (section.type === 'glass') {
      return (
        <g key={`glass-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <rect x={x + 8} y={cabinetTop + 8} width={w - 16} height={mainHeight - 16} fill={colors.glass} stroke={colors.accent} strokeWidth="1" rx="2"/>
          {/* Mullions */}
          <line x1={x + w/2} y1={cabinetTop + 8} x2={x + w/2} y2={cabinetTop + mainHeight - 8} stroke={colors.accent} strokeWidth="1.5"/>
          <line x1={x + 8} y1={cabinetTop + mainHeight/2} x2={x + w - 8} y2={cabinetTop + mainHeight/2} stroke={colors.accent} strokeWidth="1.5"/>
          {/* LED glow */}
          {showLED && <rect x={x + 10} y={cabinetTop + 10} width={w - 20} height="3" fill="#fbbf24" opacity="0.5" rx="1"/>}
          {/* Items inside */}
          <rect x={x + 15} y={cabinetTop + mainHeight * 0.55} width={w * 0.25} height={mainHeight * 0.35} fill={colors.accent} rx="2" opacity="0.2"/>
          <rect x={x + w - 15} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Split glass doors
    if (section.type === 'split-glass') {
      const halfW = (w - gap) / 2;
      return (
        <g key={`splitglass-${x}`}>
          {/* Left glass door */}
          <rect x={x} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <rect x={x + 6} y={cabinetTop + 6} width={halfW - 12} height={mainHeight - 12} fill={colors.glass} stroke={colors.accent} strokeWidth="1" rx="2"/>
          <line x1={x + halfW/2} y1={cabinetTop + 6} x2={x + halfW/2} y2={cabinetTop + mainHeight - 6} stroke={colors.accent} strokeWidth="1.5"/>
          {showLED && <rect x={x + 8} y={cabinetTop + 8} width={halfW - 16} height="3" fill="#fbbf24" opacity="0.5" rx="1"/>}
          <rect x={x + halfW - 12} y={cabinetTop + mainHeight/2 - 10} width="4" height="20" fill={colors.accent} rx="2"/>
          {/* Right glass door */}
          <rect x={x + halfW + gap} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <rect x={x + halfW + gap + 6} y={cabinetTop + 6} width={halfW - 12} height={mainHeight - 12} fill={colors.glass} stroke={colors.accent} strokeWidth="1" rx="2"/>
          <line x1={x + halfW + gap + halfW/2} y1={cabinetTop + 6} x2={x + halfW + gap + halfW/2} y2={cabinetTop + mainHeight - 6} stroke={colors.accent} strokeWidth="1.5"/>
          {showLED && <rect x={x + halfW + gap + 8} y={cabinetTop + 8} width={halfW - 16} height="3" fill="#fbbf24" opacity="0.5" rx="1"/>}
          <rect x={x + halfW + gap + 8} y={cabinetTop + mainHeight/2 - 10} width="4" height="20" fill={colors.accent} rx="2"/>
          {/* Items inside */}
          <rect x={x + 12} y={cabinetTop + mainHeight * 0.55} width={halfW * 0.4} height={mainHeight * 0.32} fill={colors.accent} rx="2" opacity="0.15"/>
          <rect x={x + halfW + gap + 15} y={cabinetTop + mainHeight * 0.58} width={halfW * 0.35} height={mainHeight * 0.28} fill={colors.accent} rx="2" opacity="0.15"/>
        </g>
      );
    }
    
    // Split fluted glass doors
    if (section.type === 'split-fluted') {
      const halfW = (w - gap) / 2;
      return (
        <g key={`fluted-${x}`}>
          <rect x={x} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <rect x={x + 6} y={cabinetTop + 6} width={halfW - 12} height={mainHeight - 12} fill={colors.glass} stroke={colors.accent} strokeWidth="1" rx="2"/>
          {renderFlutedPattern(x + 6, cabinetTop + 6, halfW - 12, mainHeight - 12)}
          {showLED && <rect x={x + 8} y={cabinetTop + 8} width={halfW - 16} height="3" fill="#fbbf24" opacity="0.4" rx="1"/>}
          <rect x={x + halfW - 12} y={cabinetTop + mainHeight/2 - 10} width="4" height="20" fill={colors.accent} rx="2"/>
          
          <rect x={x + halfW + gap} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <rect x={x + halfW + gap + 6} y={cabinetTop + 6} width={halfW - 12} height={mainHeight - 12} fill={colors.glass} stroke={colors.accent} strokeWidth="1" rx="2"/>
          {renderFlutedPattern(x + halfW + gap + 6, cabinetTop + 6, halfW - 12, mainHeight - 12)}
          {showLED && <rect x={x + halfW + gap + 8} y={cabinetTop + 8} width={halfW - 16} height="3" fill="#fbbf24" opacity="0.4" rx="1"/>}
          <rect x={x + halfW + gap + 8} y={cabinetTop + mainHeight/2 - 10} width="4" height="20" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Open shelving
    if (section.type === 'open') {
      return (
        <g key={`open-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {/* Shelves */}
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.5} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.5} stroke={colors.cabinet} strokeWidth="4"/>
          {/* LED under shelf */}
          {showLED && <rect x={x + 8} y={cabinetTop + mainHeight * 0.5 + 4} width={w - 16} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          {/* Display items */}
          <rect x={x + 12} y={cabinetTop + mainHeight * 0.55} width={w * 0.25} height={mainHeight * 0.38} fill={colors.cabinet} rx="2" opacity="0.4"/>
          <rect x={x + w * 0.45} y={cabinetTop + mainHeight * 0.6} width={w * 0.2} height={mainHeight * 0.32} fill={colors.cabinet} rx="2" opacity="0.3"/>
          <circle cx={x + w - 20} cy={cabinetTop + mainHeight * 0.75} r={10} fill={colors.cabinet} opacity="0.25"/>
          <rect x={x + 15} y={cabinetTop + mainHeight * 0.08} width={w * 0.2} height={mainHeight * 0.35} fill={colors.cabinet} rx="2" opacity="0.35"/>
          <rect x={x + w * 0.5} y={cabinetTop + mainHeight * 0.12} width={w * 0.15} height={mainHeight * 0.3} fill={colors.cabinet} rx="2" opacity="0.3"/>
        </g>
      );
    }
    
    // Barn door section
    if (section.type === 'barn-door') {
      const doorW = w * 0.48;
      return (
        <g key={`barn-${x}`}>
          {/* Cabinet back / open area */}
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {/* Shelves */}
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.33} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.33} stroke={colors.cabinet} strokeWidth="3"/>
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.66} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.66} stroke={colors.cabinet} strokeWidth="3"/>
          {showLED && <rect x={x + 8} y={cabinetTop + 6} width={w - 16} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          {/* Display items */}
          <rect x={x + w * 0.4} y={cabinetTop + mainHeight * 0.38} width={20} height={mainHeight * 0.22} fill={colors.cabinet} rx="2" opacity="0.3"/>
          <rect x={x + w * 0.55} y={cabinetTop + mainHeight * 0.4} width={15} height={mainHeight * 0.18} fill={colors.cabinet} rx="2" opacity="0.25"/>
          <rect x={x + w * 0.45} y={cabinetTop + mainHeight * 0.7} width={25} height={mainHeight * 0.22} fill={colors.cabinet} rx="2" opacity="0.3"/>
          {/* Track */}
          <rect x={x - 4} y={cabinetTop - 10} width={w + 8} height="7" fill={colors.accent} rx="2"/>
          {/* Sliding door */}
          <rect x={x + 8} y={cabinetTop - 3} width={doorW} height={mainHeight + 3} fill={colors.cabinet} stroke={colors.accent} strokeWidth="2" rx="3"/>
          {/* X pattern */}
          <line x1={x + 16} y1={cabinetTop + 8} x2={x + doorW} y2={cabinetTop + mainHeight - 8} stroke={colors.accent} strokeWidth="2.5"/>
          <line x1={x + doorW} y1={cabinetTop + 8} x2={x + 16} y2={cabinetTop + mainHeight - 8} stroke={colors.accent} strokeWidth="2.5"/>
          {/* Handle */}
          <rect x={x + doorW - 8} y={cabinetTop + mainHeight/2 - 16} width="6" height="32" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    return null;
  };
  
  const totalWidth = barLength * scale;
  const mainCabinetHeight = current.hasTopShelf 
    ? (cabinetHeight - (current.topShelfHeight || 10) - 2) * scale 
    : cabinetHeight * scale;
  const topShelfY = 30;
  const cabinetTop = current.hasTopShelf ? topShelfY + (current.topShelfHeight || 10) * scale + 8 : topShelfY;
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-400 mb-1">Cabinet Face Layout Options</h1>
          <p className="text-slate-400 text-sm">92" wide × 38" tall — with split door configurations</p>
        </div>
        
        {/* Controls row */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-wide">Color:</span>
            {Object.keys(colorSchemes).map(color => (
              <button
                key={color}
                onClick={() => setCabinetColor(color)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-all ${
                  cabinetColor === color 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {color === 'warmGray' ? 'Gray' : color}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showLED} 
                onChange={e => setShowLED(e.target.checked)}
                className="rounded accent-amber-500"
              />
              LED lighting
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showDimensions} 
                onChange={e => setShowDimensions(e.target.checked)}
                className="rounded"
              />
              Dimensions
            </label>
          </div>
        </div>
        
        {/* Option grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 mb-4">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedOption(i)}
              className={`p-2 rounded text-left transition-all ${
                selectedOption === i 
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="font-medium text-xs leading-tight">{opt.name}</div>
            </button>
          ))}
        </div>
        
        {/* Main visualization */}
        <div className="bg-slate-800 rounded-xl p-4 md:p-6 mb-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">{current.name}</h2>
            <p className="text-slate-400 text-sm">{current.description}</p>
          </div>
          
          <div className="flex justify-center overflow-x-auto">
            <svg 
              viewBox={`0 0 ${totalWidth + 60} ${cabinetHeight * scale + 80}`} 
              className="w-full max-w-5xl min-w-[600px]"
              style={{ background: '#0f172a', borderRadius: 8 }}
            >
              {/* Butcher block counter top */}
              <defs>
                <pattern id="woodGrainV2" patternUnits="userSpaceOnUse" width="60" height="12">
                  <rect width="60" height="12" fill="#92400e"/>
                  <line x1="0" y1="4" x2="60" y2="4" stroke="#78350f" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="0" y1="8" x2="60" y2="8" stroke="#a16207" strokeWidth="0.3" opacity="0.4"/>
                </pattern>
              </defs>
              
              <rect 
                x="25" 
                y="8" 
                width={totalWidth + 10} 
                height="18" 
                fill="url(#woodGrainV2)"
                stroke="#b45309"
                strokeWidth="1.5"
                rx="2"
              />
              <text x={totalWidth/2 + 30} y="21" fill="#fcd34d" fontSize="8" textAnchor="middle" fontFamily="system-ui">
                BUTCHER BLOCK TOP
              </text>
              
              {/* Top shelf if applicable */}
              {current.hasTopShelf && (
                <g>
                  <rect 
                    x="30" 
                    y={topShelfY} 
                    width={totalWidth} 
                    height={(current.topShelfHeight || 10) * scale} 
                    fill={colors.open}
                    stroke={colors.accent}
                    strokeWidth="1.5"
                    rx="3"
                  />
                  {/* LED strip */}
                  {showLED && (
                    <rect 
                      x="35" 
                      y={topShelfY + (current.topShelfHeight || 10) * scale - 4} 
                      width={totalWidth - 10} 
                      height="3" 
                      fill="#fbbf24"
                      opacity="0.5"
                      rx="1"
                    />
                  )}
                  {/* Display items */}
                  <rect x="50" y={topShelfY + 6} width="28" height={(current.topShelfHeight || 10) * scale - 14} fill={colors.cabinet} rx="2" opacity="0.4"/>
                  <circle cx="120" cy={topShelfY + (current.topShelfHeight || 10) * scale / 2} r="14" fill={colors.cabinet} opacity="0.3"/>
                  <rect x="180" y={topShelfY + 8} width="22" height={(current.topShelfHeight || 10) * scale - 16} fill={colors.cabinet} rx="2" opacity="0.35"/>
                  <rect x={totalWidth - 60} y={topShelfY + 7} width="25" height={(current.topShelfHeight || 10) * scale - 15} fill={colors.cabinet} rx="2" opacity="0.4"/>
                  <rect x={totalWidth - 25} y={topShelfY + 10} width="18" height={(current.topShelfHeight || 10) * scale - 18} fill={colors.cabinet} rx="2" opacity="0.3"/>
                </g>
              )}
              
              {/* Render cabinet sections */}
              {(() => {
                let xOffset = 30;
                return current.sections.map((section, i) => {
                  const rendered = renderSection(section, xOffset, cabinetTop, mainCabinetHeight);
                  xOffset += section.width * scale;
                  return rendered;
                });
              })()}
              
              {/* Toe kick / pedestal base */}
              <rect 
                x="34" 
                y={cabinetTop + mainCabinetHeight + 2} 
                width={totalWidth - 8} 
                height="16" 
                fill={colors.accent}
                rx="2"
              />
              <rect 
                x="40" 
                y={cabinetTop + mainCabinetHeight + 5} 
                width={totalWidth - 20} 
                height="10" 
                fill="#0a0f18"
                rx="2"
              />
              
              {/* Dimensions */}
              {showDimensions && (
                <g>
                  {/* Width */}
                  <line x1="30" y1={cabinetTop + mainCabinetHeight + 32} x2={30 + totalWidth} y2={cabinetTop + mainCabinetHeight + 32} stroke="#fbbf24" strokeWidth="1"/>
                  <line x1="30" y1={cabinetTop + mainCabinetHeight + 27} x2="30" y2={cabinetTop + mainCabinetHeight + 37} stroke="#fbbf24" strokeWidth="1"/>
                  <line x1={30 + totalWidth} y1={cabinetTop + mainCabinetHeight + 27} x2={30 + totalWidth} y2={cabinetTop + mainCabinetHeight + 37} stroke="#fbbf24" strokeWidth="1"/>
                  <text x={30 + totalWidth/2} y={cabinetTop + mainCabinetHeight + 48} fill="#fbbf24" fontSize="11" textAnchor="middle" fontFamily="monospace">92"</text>
                  
                  {/* Height */}
                  <line x1={totalWidth + 45} y1={topShelfY} x2={totalWidth + 45} y2={cabinetTop + mainCabinetHeight} stroke="#4ade80" strokeWidth="1"/>
                  <line x1={totalWidth + 40} y1={topShelfY} x2={totalWidth + 50} y2={topShelfY} stroke="#4ade80" strokeWidth="1"/>
                  <line x1={totalWidth + 40} y1={cabinetTop + mainCabinetHeight} x2={totalWidth + 50} y2={cabinetTop + mainCabinetHeight} stroke="#4ade80" strokeWidth="1"/>
                  <text x={totalWidth + 55} y={(topShelfY + cabinetTop + mainCabinetHeight) / 2 + 4} fill="#4ade80" fontSize="10" fontFamily="monospace">38"</text>
                  
                  {/* Section widths */}
                  {(() => {
                    let xPos = 30;
                    return current.sections.map((section, i) => {
                      const w = section.width * scale;
                      const midX = xPos + w/2;
                      xPos += w;
                      return (
                        <text 
                          key={i}
                          x={midX} 
                          y={cabinetTop - 6} 
                          fill="#94a3b8" 
                          fontSize="9" 
                          textAnchor="middle" 
                          fontFamily="monospace"
                        >
                          {section.width}"
                        </text>
                      );
                    });
                  })()}
                </g>
              )}
            </svg>
          </div>
        </div>
        
        {/* Info panels */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-blue-400 font-medium text-sm mb-3">Layout Details</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Width</span>
                <span className="text-slate-200 font-mono">92"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cabinet Height</span>
                <span className="text-slate-200 font-mono">38"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sections</span>
                <span className="text-slate-200">{current.sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Has Split Doors</span>
                <span className={current.sections.some(s => s.type.includes('split')) ? "text-green-400" : "text-slate-500"}>
                  {current.sections.some(s => s.type.includes('split')) ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Top Shelf</span>
                <span className={current.hasTopShelf ? "text-green-400" : "text-slate-500"}>
                  {current.hasTopShelf ? `Yes (${current.topShelfHeight}")` : "No"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-blue-400 font-medium text-sm mb-3">Modern Farmhouse Tips</h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Matte black or oil-rubbed bronze hardware</li>
              <li>• Shaker doors = classic farmhouse</li>
              <li>• X-panels add barn door character</li>
              <li>• Mix open + closed for visual interest</li>
              <li>• Consider beadboard backing in open sections</li>
              <li>• LED strips add warmth, especially at night</li>
            </ul>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-blue-400 font-medium text-sm mb-3">Split Door Benefits</h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Furniture-like appearance (less "cabinet-y")</li>
              <li>• Easier access to deep storage</li>
              <li>• Doors swing clear of each other</li>
              <li>• Creates visual rhythm across the face</li>
              <li>• Pairs well with traditional hardware</li>
              <li>• Works with any door style (shaker, glass, X)</li>
            </ul>
          </div>
        </div>
        
        {/* Recommendation */}
        <div className="mt-4 bg-gradient-to-r from-blue-900/40 to-slate-800 rounded-lg p-4 border border-blue-800/50">
          <h3 className="text-blue-400 font-medium text-sm mb-2">My Recommendations for Your Space</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Based on your reference photos and the "balcony bar" viewing angle, I'd highlight three options:
          </p>
          <ul className="mt-2 text-sm text-slate-400 space-y-1">
            <li><strong className="text-white">Center Split Doors (#2)</strong> — Creates a clear focal point with the wide center section. Very furniture-like.</li>
            <li><strong className="text-white">Floating Shelf + Storage (#9)</strong> — Matches your idea3 reference image. The open shelf on top adds display space and visual lightness.</li>
            <li><strong className="text-white">Glass Center Display (#5)</strong> — The split glass doors let you show off nice items while the solid end doors hide everyday stuff.</li>
          </ul>
          <p className="mt-3 text-slate-400 text-sm">
            The 92" width gives you room for wider split-door sections that will look more like proper sideboard furniture than standard base cabinets.
          </p>
        </div>
      </div>
    </div>
  );
}
