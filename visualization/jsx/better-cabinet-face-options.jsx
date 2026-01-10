import React, { useState } from 'react';

export default function DrawerBankVariations() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [showDimensions, setShowDimensions] = useState(true);
  const [cabinetColor, setCabinetColor] = useState('navy');
  const [showLED, setShowLED] = useState(true);
  const [showXFrameEnds, setShowXFrameEnds] = useState(true);
  
  // Locked specifications
  const barLength = 92; // 90" cabinet + 2" filler
  const cabinetBodyHeight = 34.5; // Standard base cabinet
  const toeKickHeight = 4;
  const cabinetDepth = 14;
  const butcherBlockThickness = 1.5;
  
  // Visual height (cabinet + toe kick area shown)
  const visualHeight = cabinetBodyHeight;
  
  const colorSchemes = {
    white: { 
      cabinet: '#f5f5f0', 
      accent: '#2d3a28', 
      drawer: '#e8e8e3', 
      glass: 'rgba(200, 220, 240, 0.25)', 
      open: '#1a1a2e', 
      wood: '#c4a77d',
      xFrame: '#c4a77d'
    },
    sage: { 
      cabinet: '#8b9a7d', 
      accent: '#2d3a28', 
      drawer: '#7a8970', 
      glass: 'rgba(180, 200, 180, 0.25)', 
      open: '#1a2a1e', 
      wood: '#a89070',
      xFrame: '#5b4a3a'
    },
    navy: { 
      cabinet: '#3d4f5f', 
      accent: '#1a252e', 
      drawer: '#344555', 
      glass: 'rgba(150, 180, 210, 0.25)', 
      open: '#0f1a24', 
      wood: '#b8996f',
      xFrame: '#b8996f'
    },
    warmGray: { 
      cabinet: '#6a6560', 
      accent: '#3a3530', 
      drawer: '#5a5550', 
      glass: 'rgba(180, 175, 170, 0.25)', 
      open: '#1a1815', 
      wood: '#c4a77d',
      xFrame: '#c4a77d'
    },
    charcoal: { 
      cabinet: '#3a3a3a', 
      accent: '#1a1a1a', 
      drawer: '#4a4a4a', 
      glass: 'rgba(100, 100, 100, 0.25)', 
      open: '#0a0a0a', 
      wood: '#c4a77d',
      xFrame: '#c4a77d'
    },
    natural: { 
      cabinet: '#c4a77d', 
      accent: '#5b4434', 
      drawer: '#b8996f', 
      glass: 'rgba(220, 200, 170, 0.25)', 
      open: '#2a2015', 
      wood: '#a07d50',
      xFrame: '#5b4434'
    },
  };
  
  const colors = colorSchemes[cabinetColor];
  
  // Variations of Drawer Bank + Display with farmhouse elements
  const options = [
    {
      id: 'original',
      name: "Original Drawer Bank + Display",
      description: "Your current favorite: drawer bank, open center, split doors. Great foundation.",
      sections: [
        { type: 'triple-drawer', width: 28 },
        { type: 'open', width: 29 },
        { type: 'split-door', width: 35, style: 'shaker' },
      ],
      hasTopShelf: false,
      xFrameEnds: false,
      notes: "Functional and balanced. Open display breaks up the mass nicely."
    },
    {
      id: 'barn-center',
      name: "Barn Door Center",
      description: "Sliding barn door as the centerpiece, drawers on one end, X-panel on other.",
      sections: [
        { type: 'triple-drawer', width: 26 },
        { type: 'barn-door', width: 40 },
        { type: 'x-panel-door', width: 26 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Maximum farmhouse impact. Barn door becomes the conversation piece."
    },
    {
      id: 'drawer-barn-open',
      name: "Drawer + Barn + Open Cubby",
      description: "Drawers, narrow barn door, and open display cubbies. Like idea10 reference.",
      sections: [
        { type: 'triple-drawer', width: 28 },
        { type: 'barn-door-narrow', width: 32 },
        { type: 'open-cubbies', width: 32 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Mix of closed and open. Barn door adds farmhouse, cubbies add display."
    },
    {
      id: 'asymmetric-barn',
      name: "Asymmetric Barn Feature",
      description: "Wide barn door section anchoring one side. Very dynamic composition.",
      sections: [
        { type: 'barn-door-wide', width: 46 },
        { type: 'open', width: 22 },
        { type: 'double-drawer', width: 24 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Bold asymmetry. The wide barn door dominates visually."
    },
    {
      id: 'floating-shelf-barn',
      name: "Floating Shelf + Barn Below",
      description: "Open display shelf on top, barn door and drawers below. Layered look.",
      sections: [
        { type: 'triple-drawer', width: 30 },
        { type: 'barn-door-narrow', width: 32 },
        { type: 'split-x', width: 30 },
      ],
      hasTopShelf: true,
      topShelfHeight: 8,
      xFrameEnds: true,
      notes: "The floating shelf adds visual lightness above the barn door."
    },
    {
      id: 'drawer-open-x',
      name: "Drawers + Open + X-Split",
      description: "Keeping open center but X-panel doors instead of shaker. More farmhouse.",
      sections: [
        { type: 'triple-drawer', width: 28 },
        { type: 'open', width: 29 },
        { type: 'split-x', width: 35 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Similar to original but X-panels add farmhouse character."
    },
    {
      id: 'four-section',
      name: "Four-Section Balance",
      description: "Drawers, barn door, open, X-door. Every element you like in one.",
      sections: [
        { type: 'double-drawer', width: 22 },
        { type: 'barn-door-narrow', width: 26 },
        { type: 'open-narrow', width: 22 },
        { type: 'x-panel-door', width: 22 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Busy but interesting. Each section has its own purpose."
    },
    {
      id: 'bookend-drawers',
      name: "Bookend Drawers",
      description: "Drawer banks on BOTH ends with barn door center. Maximum drawer storage.",
      sections: [
        { type: 'double-drawer', width: 24 },
        { type: 'barn-door', width: 44 },
        { type: 'double-drawer', width: 24 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Symmetrical and very functional. Barn door as clear focal point."
    },
    {
      id: 'sideboard-barn',
      name: "Sideboard with Barn Accent",
      description: "Wide drawers with a single barn door accent. Clean, furniture-like.",
      sections: [
        { type: 'wide-drawer-pair', width: 32 },
        { type: 'barn-door-narrow', width: 28 },
        { type: 'wide-drawer-pair', width: 32 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Sideboard aesthetic. Barn door breaks up the drawer runs."
    },
    {
      id: 'open-shelf-focus',
      name: "Open Shelf Focus",
      description: "Large open display area flanked by drawers and X-door. Display-forward design.",
      sections: [
        { type: 'triple-drawer', width: 26 },
        { type: 'open-wide', width: 40 },
        { type: 'x-panel-door', width: 26 },
      ],
      hasTopShelf: false,
      xFrameEnds: true,
      notes: "Great for displaying items. The open area becomes the focal point."
    },
  ];
  
  const current = options[selectedOption];
  const scale = 4.2;
  
  // Render individual sections
  const renderSection = (section, xOffset, cabinetTop, mainHeight) => {
    const w = section.width * scale;
    const x = xOffset;
    const gap = 3;
    
    // Shaker door styling
    const renderShakerInset = (dx, dy, dw, dh) => {
      const inset = Math.min(8, dw * 0.08);
      return (
        <rect 
          x={dx + inset} 
          y={dy + inset} 
          width={dw - inset * 2} 
          height={dh - inset * 2} 
          fill="none" 
          stroke={colors.accent} 
          strokeWidth="1.5"
          rx="2"
        />
      );
    };
    
    // X-panel styling
    const renderXPanel = (dx, dy, dw, dh) => {
      const inset = Math.min(6, dw * 0.06);
      return (
        <g>
          <rect 
            x={dx + inset} 
            y={dy + inset} 
            width={dw - inset * 2} 
            height={dh - inset * 2} 
            fill="none" 
            stroke={colors.accent} 
            strokeWidth="1.5"
            rx="2"
          />
          <line 
            x1={dx + inset + 4} 
            y1={dy + inset + 4} 
            x2={dx + dw - inset - 4} 
            y2={dy + dh - inset - 4} 
            stroke={colors.accent} 
            strokeWidth="2.5"
          />
          <line 
            x1={dx + dw - inset - 4} 
            y1={dy + inset + 4} 
            x2={dx + inset + 4} 
            y2={dy + dh - inset - 4} 
            stroke={colors.accent} 
            strokeWidth="2.5"
          />
        </g>
      );
    };
    
    // Triple drawer bank
    if (section.type === 'triple-drawer') {
      const drawerH = (mainHeight - 8) / 3;
      return (
        <g key={`triple-${x}`}>
          {[0, 1, 2].map(i => (
            <g key={i}>
              <rect 
                x={x} 
                y={cabinetTop + i * (drawerH + 4)} 
                width={w} 
                height={drawerH} 
                fill={colors.drawer} 
                stroke={colors.accent} 
                strokeWidth="1.5" 
                rx="3"
              />
              {renderShakerInset(x, cabinetTop + i * (drawerH + 4), w, drawerH)}
              {/* Drawer pull - bar style */}
              <rect 
                x={x + w/2 - 24} 
                y={cabinetTop + i * (drawerH + 4) + drawerH/2 - 3} 
                width="48" 
                height="6" 
                fill={colors.accent} 
                rx="2"
              />
            </g>
          ))}
        </g>
      );
    }
    
    // Double drawer
    if (section.type === 'double-drawer') {
      const drawerH = (mainHeight - 4) / 2;
      return (
        <g key={`double-${x}`}>
          {[0, 1].map(i => (
            <g key={i}>
              <rect 
                x={x} 
                y={cabinetTop + i * (drawerH + 4)} 
                width={w} 
                height={drawerH} 
                fill={colors.drawer} 
                stroke={colors.accent} 
                strokeWidth="1.5" 
                rx="3"
              />
              {renderShakerInset(x, cabinetTop + i * (drawerH + 4), w, drawerH)}
              <rect 
                x={x + w/2 - 24} 
                y={cabinetTop + i * (drawerH + 4) + drawerH/2 - 3} 
                width="48" 
                height="6" 
                fill={colors.accent} 
                rx="2"
              />
            </g>
          ))}
        </g>
      );
    }
    
    // Wide drawer pair (2 wide drawers stacked)
    if (section.type === 'wide-drawer-pair') {
      const drawerH = (mainHeight - 4) / 2;
      return (
        <g key={`widedrawer-${x}`}>
          {[0, 1].map(i => (
            <g key={i}>
              <rect 
                x={x} 
                y={cabinetTop + i * (drawerH + 4)} 
                width={w} 
                height={drawerH} 
                fill={colors.drawer} 
                stroke={colors.accent} 
                strokeWidth="1.5" 
                rx="3"
              />
              {renderShakerInset(x, cabinetTop + i * (drawerH + 4), w, drawerH)}
              <rect 
                x={x + w/2 - 30} 
                y={cabinetTop + i * (drawerH + 4) + drawerH/2 - 3} 
                width="60" 
                height="6" 
                fill={colors.accent} 
                rx="2"
              />
            </g>
          ))}
        </g>
      );
    }
    
    // Split shaker doors
    if (section.type === 'split-door') {
      const halfW = (w - gap) / 2;
      return (
        <g key={`split-${x}`}>
          <rect x={x} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderShakerInset(x, cabinetTop, halfW, mainHeight)}
          <rect x={x + halfW - 14} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
          
          <rect x={x + halfW + gap} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderShakerInset(x + halfW + gap, cabinetTop, halfW, mainHeight)}
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
          {renderXPanel(x, cabinetTop, halfW, mainHeight)}
          <rect x={x + halfW - 14} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
          
          <rect x={x + halfW + gap} y={cabinetTop} width={halfW} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderXPanel(x + halfW + gap, cabinetTop, halfW, mainHeight)}
          <rect x={x + halfW + gap + 9} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Single X-panel door
    if (section.type === 'x-panel-door') {
      return (
        <g key={`xdoor-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.cabinet} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {renderXPanel(x, cabinetTop, w, mainHeight)}
          <rect x={x + w - 16} y={cabinetTop + mainHeight/2 - 12} width="5" height="24" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Open shelving
    if (section.type === 'open' || section.type === 'open-wide' || section.type === 'open-narrow') {
      return (
        <g key={`open-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {/* Shelves */}
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.5} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.5} stroke={colors.wood} strokeWidth="5"/>
          {/* LED under shelf */}
          {showLED && <rect x={x + 8} y={cabinetTop + mainHeight * 0.5 + 5} width={w - 16} height="2" fill="#fbbf24" opacity="0.5" rx="1"/>}
          {showLED && <rect x={x + 8} y={cabinetTop + 4} width={w - 16} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          {/* Display items */}
          <rect x={x + 12} y={cabinetTop + mainHeight * 0.55} width={w * 0.25} height={mainHeight * 0.38} fill={colors.wood} rx="2" opacity="0.3"/>
          <rect x={x + w * 0.45} y={cabinetTop + mainHeight * 0.6} width={w * 0.2} height={mainHeight * 0.32} fill={colors.wood} rx="2" opacity="0.25"/>
          <circle cx={x + w - 20} cy={cabinetTop + mainHeight * 0.75} r={10} fill={colors.wood} opacity="0.2"/>
          <rect x={x + 15} y={cabinetTop + mainHeight * 0.08} width={w * 0.22} height={mainHeight * 0.35} fill={colors.wood} rx="2" opacity="0.25"/>
        </g>
      );
    }
    
    // Open cubbies (2 compartments stacked)
    if (section.type === 'open-cubbies') {
      const cubbyH = (mainHeight - 4) / 2;
      return (
        <g key={`cubbies-${x}`}>
          {/* Top cubby */}
          <rect x={x} y={cabinetTop} width={w} height={cubbyH} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {showLED && <rect x={x + 6} y={cabinetTop + 4} width={w - 12} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          <rect x={x + 10} y={cabinetTop + 12} width={w * 0.3} height={cubbyH * 0.6} fill={colors.wood} rx="2" opacity="0.25"/>
          <circle cx={x + w - 25} cy={cabinetTop + cubbyH/2} r={12} fill={colors.wood} opacity="0.2"/>
          
          {/* Bottom cubby */}
          <rect x={x} y={cabinetTop + cubbyH + 4} width={w} height={cubbyH} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {showLED && <rect x={x + 6} y={cabinetTop + cubbyH + 8} width={w - 12} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          <rect x={x + w * 0.4} y={cabinetTop + cubbyH + 16} width={w * 0.35} height={cubbyH * 0.55} fill={colors.wood} rx="2" opacity="0.25"/>
          <rect x={x + 12} y={cabinetTop + cubbyH + 20} width={w * 0.2} height={cubbyH * 0.45} fill={colors.wood} rx="2" opacity="0.2"/>
        </g>
      );
    }
    
    // Barn door - standard
    if (section.type === 'barn-door') {
      const doorW = w * 0.52;
      return (
        <g key={`barn-${x}`}>
          {/* Cabinet back */}
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          {/* Shelves */}
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.33} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.33} stroke={colors.wood} strokeWidth="4"/>
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.66} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.66} stroke={colors.wood} strokeWidth="4"/>
          {showLED && <rect x={x + 8} y={cabinetTop + 6} width={w - 16} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          {/* Display items behind door */}
          <rect x={x + w * 0.55} y={cabinetTop + mainHeight * 0.38} width={18} height={mainHeight * 0.22} fill={colors.wood} rx="2" opacity="0.25"/>
          <rect x={x + w * 0.6} y={cabinetTop + mainHeight * 0.7} width={22} height={mainHeight * 0.22} fill={colors.wood} rx="2" opacity="0.25"/>
          
          {/* Track */}
          <rect x={x - 4} y={cabinetTop - 10} width={w + 8} height="8" fill={colors.accent} rx="2"/>
          
          {/* Sliding door */}
          <rect x={x + 6} y={cabinetTop - 2} width={doorW} height={mainHeight + 2} fill={colors.cabinet} stroke={colors.accent} strokeWidth="2" rx="3"/>
          {/* X pattern on door */}
          <line x1={x + 14} y1={cabinetTop + 8} x2={x + doorW - 2} y2={cabinetTop + mainHeight - 8} stroke={colors.xFrame} strokeWidth="3"/>
          <line x1={x + doorW - 2} y1={cabinetTop + 8} x2={x + 14} y2={cabinetTop + mainHeight - 8} stroke={colors.xFrame} strokeWidth="3"/>
          {/* Handle */}
          <rect x={x + doorW - 6} y={cabinetTop + mainHeight/2 - 18} width="6" height="36" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Barn door - narrow
    if (section.type === 'barn-door-narrow') {
      const doorW = w * 0.55;
      return (
        <g key={`barnn-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.5} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.5} stroke={colors.wood} strokeWidth="4"/>
          {showLED && <rect x={x + 8} y={cabinetTop + 6} width={w - 16} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          <rect x={x + w * 0.6} y={cabinetTop + mainHeight * 0.55} width={16} height={mainHeight * 0.35} fill={colors.wood} rx="2" opacity="0.25"/>
          <rect x={x + w * 0.65} y={cabinetTop + mainHeight * 0.1} width={14} height={mainHeight * 0.32} fill={colors.wood} rx="2" opacity="0.2"/>
          
          <rect x={x - 3} y={cabinetTop - 10} width={w + 6} height="8" fill={colors.accent} rx="2"/>
          <rect x={x + 4} y={cabinetTop - 2} width={doorW} height={mainHeight + 2} fill={colors.cabinet} stroke={colors.accent} strokeWidth="2" rx="3"/>
          <line x1={x + 12} y1={cabinetTop + 8} x2={x + doorW - 4} y2={cabinetTop + mainHeight - 8} stroke={colors.xFrame} strokeWidth="2.5"/>
          <line x1={x + doorW - 4} y1={cabinetTop + 8} x2={x + 12} y2={cabinetTop + mainHeight - 8} stroke={colors.xFrame} strokeWidth="2.5"/>
          <rect x={x + doorW - 4} y={cabinetTop + mainHeight/2 - 16} width="5" height="32" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    // Barn door - wide
    if (section.type === 'barn-door-wide') {
      const doorW = w * 0.48;
      return (
        <g key={`barnw-${x}`}>
          <rect x={x} y={cabinetTop} width={w} height={mainHeight} fill={colors.open} stroke={colors.accent} strokeWidth="1.5" rx="3"/>
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.33} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.33} stroke={colors.wood} strokeWidth="4"/>
          <line x1={x + 5} y1={cabinetTop + mainHeight * 0.66} x2={x + w - 5} y2={cabinetTop + mainHeight * 0.66} stroke={colors.wood} strokeWidth="4"/>
          {showLED && <rect x={x + 8} y={cabinetTop + 6} width={w - 16} height="2" fill="#fbbf24" opacity="0.4" rx="1"/>}
          
          <rect x={x - 4} y={cabinetTop - 10} width={w + 8} height="8" fill={colors.accent} rx="2"/>
          <rect x={x + 8} y={cabinetTop - 2} width={doorW} height={mainHeight + 2} fill={colors.cabinet} stroke={colors.accent} strokeWidth="2" rx="3"/>
          <line x1={x + 16} y1={cabinetTop + 8} x2={x + doorW} y2={cabinetTop + mainHeight - 8} stroke={colors.xFrame} strokeWidth="3"/>
          <line x1={x + doorW} y1={cabinetTop + 8} x2={x + 16} y2={cabinetTop + mainHeight - 8} stroke={colors.xFrame} strokeWidth="3"/>
          <rect x={x + doorW - 4} y={cabinetTop + mainHeight/2 - 18} width="6" height="36" fill={colors.accent} rx="2"/>
        </g>
      );
    }
    
    return null;
  };
  
  // Render X-frame end panel
  const renderXFrameEnd = (x, y, w, h, side) => {
    if (!showXFrameEnds || !current.xFrameEnds) return null;
    
    const frameW = 12;
    const actualX = side === 'left' ? x - frameW : x;
    
    return (
      <g key={`xframe-${side}`}>
        <rect 
          x={actualX} 
          y={y} 
          width={frameW} 
          height={h} 
          fill={colors.xFrame} 
          stroke={colors.accent} 
          strokeWidth="1"
          rx="2"
        />
        {/* X pattern */}
        <line 
          x1={actualX + 2} 
          y1={y + 4} 
          x2={actualX + frameW - 2} 
          y2={y + h - 4} 
          stroke={colors.accent} 
          strokeWidth="2"
        />
        <line 
          x1={actualX + frameW - 2} 
          y1={y + 4} 
          x2={actualX + 2} 
          y2={y + h - 4} 
          stroke={colors.accent} 
          strokeWidth="2"
        />
      </g>
    );
  };
  
  const totalWidth = barLength * scale;
  const mainCabinetHeight = current.hasTopShelf 
    ? (visualHeight - (current.topShelfHeight || 8) - 2) * scale 
    : visualHeight * scale;
  const topShelfY = 30;
  const cabinetTop = current.hasTopShelf ? topShelfY + (current.topShelfHeight || 8) * scale + 8 : topShelfY;
  
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-400 mb-1">Drawer Bank + Display Variations</h1>
          <p className="text-slate-400 text-sm">Based on your favorite layout — with barn doors and X-frame options</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-slate-800 rounded text-slate-400">92" wide</span>
            <span className="px-2 py-1 bg-slate-800 rounded text-slate-400">34.5" cabinet</span>
            <span className="px-2 py-1 bg-slate-800 rounded text-slate-400">14" deep</span>
            <span className="px-2 py-1 bg-slate-800 rounded text-slate-400">4" toe kick</span>
          </div>
        </div>
        
        {/* Controls */}
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
                {color}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showXFrameEnds} 
                onChange={e => setShowXFrameEnds(e.target.checked)}
                className="rounded accent-amber-600"
              />
              X-Frame Ends
            </label>
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
        
        {/* Options grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {options.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => setSelectedOption(i)}
              className={`p-3 rounded text-left transition-all ${
                selectedOption === i 
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="font-medium text-xs leading-tight mb-1">{opt.name}</div>
              <div className="text-[10px] opacity-70 line-clamp-2">{opt.description}</div>
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
              viewBox={`0 0 ${totalWidth + 80} ${visualHeight * scale + 100}`} 
              className="w-full max-w-5xl min-w-[600px]"
              style={{ background: '#0f172a', borderRadius: 8 }}
            >
              {/* Butcher block counter top */}
              <defs>
                <pattern id="chevronWood" patternUnits="userSpaceOnUse" width="40" height="20">
                  <rect width="40" height="20" fill="#92400e"/>
                  <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="#a16207" opacity="0.3"/>
                  <path d="M20,10 L30,0 L40,10 L30,20 Z" fill="#78350f" opacity="0.3"/>
                </pattern>
              </defs>
              
              {/* Butcher block */}
              <rect 
                x="28" 
                y="6" 
                width={totalWidth + 24} 
                height="20" 
                fill="url(#chevronWood)"
                stroke="#b45309"
                strokeWidth="1.5"
                rx="2"
              />
              <text x={totalWidth/2 + 40} y="20" fill="#fcd34d" fontSize="8" textAnchor="middle" fontFamily="system-ui">
                CHEVRON BUTCHER BLOCK (1.5" thick)
              </text>
              
              {/* Top shelf if applicable */}
              {current.hasTopShelf && (
                <g>
                  <rect 
                    x="40" 
                    y={topShelfY} 
                    width={totalWidth} 
                    height={(current.topShelfHeight || 8) * scale} 
                    fill={colors.open}
                    stroke={colors.accent}
                    strokeWidth="1.5"
                    rx="3"
                  />
                  {showLED && (
                    <rect 
                      x="45" 
                      y={topShelfY + (current.topShelfHeight || 8) * scale - 4} 
                      width={totalWidth - 10} 
                      height="3" 
                      fill="#fbbf24"
                      opacity="0.5"
                      rx="1"
                    />
                  )}
                  {/* Display items */}
                  <rect x="55" y={topShelfY + 5} width="25" height={(current.topShelfHeight || 8) * scale - 12} fill={colors.wood} rx="2" opacity="0.35"/>
                  <circle cx="130" cy={topShelfY + (current.topShelfHeight || 8) * scale / 2} r="12" fill={colors.wood} opacity="0.25"/>
                  <rect x={totalWidth - 50} y={topShelfY + 6} width="22" height={(current.topShelfHeight || 8) * scale - 14} fill={colors.wood} rx="2" opacity="0.3"/>
                </g>
              )}
              
              {/* X-frame end panels */}
              {renderXFrameEnd(40, cabinetTop, 12, mainCabinetHeight, 'left')}
              {renderXFrameEnd(40 + totalWidth, cabinetTop, 12, mainCabinetHeight, 'right')}
              
              {/* Render cabinet sections */}
              {(() => {
                let xOffset = 40;
                return current.sections.map((section, i) => {
                  const rendered = renderSection(section, xOffset, cabinetTop, mainCabinetHeight);
                  xOffset += section.width * scale;
                  return rendered;
                });
              })()}
              
              {/* Toe kick */}
              <rect 
                x="44" 
                y={cabinetTop + mainCabinetHeight + 2} 
                width={totalWidth - 8} 
                height={toeKickHeight * scale * 0.4} 
                fill={colors.accent}
                rx="2"
              />
              <rect 
                x="50" 
                y={cabinetTop + mainCabinetHeight + 5} 
                width={totalWidth - 20} 
                height={toeKickHeight * scale * 0.3} 
                fill="#0a0f18"
                rx="2"
              />
              
              {/* Dimensions */}
              {showDimensions && (
                <g>
                  {/* Width */}
                  <line x1="40" y1={cabinetTop + mainCabinetHeight + 35} x2={40 + totalWidth} y2={cabinetTop + mainCabinetHeight + 35} stroke="#fbbf24" strokeWidth="1"/>
                  <line x1="40" y1={cabinetTop + mainCabinetHeight + 30} x2="40" y2={cabinetTop + mainCabinetHeight + 40} stroke="#fbbf24" strokeWidth="1"/>
                  <line x1={40 + totalWidth} y1={cabinetTop + mainCabinetHeight + 30} x2={40 + totalWidth} y2={cabinetTop + mainCabinetHeight + 40} stroke="#fbbf24" strokeWidth="1"/>
                  <text x={40 + totalWidth/2} y={cabinetTop + mainCabinetHeight + 52} fill="#fbbf24" fontSize="11" textAnchor="middle" fontFamily="monospace">{barLength}"</text>
                  
                  {/* Height */}
                  <line x1={totalWidth + 55} y1={cabinetTop} x2={totalWidth + 55} y2={cabinetTop + mainCabinetHeight} stroke="#4ade80" strokeWidth="1"/>
                  <line x1={totalWidth + 50} y1={cabinetTop} x2={totalWidth + 60} y2={cabinetTop} stroke="#4ade80" strokeWidth="1"/>
                  <line x1={totalWidth + 50} y1={cabinetTop + mainCabinetHeight} x2={totalWidth + 60} y2={cabinetTop + mainCabinetHeight} stroke="#4ade80" strokeWidth="1"/>
                  <text x={totalWidth + 65} y={(cabinetTop + cabinetTop + mainCabinetHeight) / 2 + 4} fill="#4ade80" fontSize="10" fontFamily="monospace">{cabinetBodyHeight}"</text>
                  
                  {/* Section widths */}
                  {(() => {
                    let xPos = 40;
                    return current.sections.map((section, i) => {
                      const w = section.width * scale;
                      const midX = xPos + w/2;
                      xPos += w;
                      return (
                        <text 
                          key={i}
                          x={midX} 
                          y={cabinetTop - 8} 
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
          
          {/* Notes for current option */}
          {current.notes && (
            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="text-xs text-amber-400 font-medium mb-1">Design Notes</div>
              <p className="text-sm text-slate-300">{current.notes}</p>
            </div>
          )}
        </div>
        
        {/* Info panels */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-amber-400 font-medium text-sm mb-3">Why These Variations?</h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• All based on your "Drawer Bank + Display" favorite</li>
              <li>• Added barn door options you mentioned missing</li>
              <li>• X-frame elements for modern farmhouse look</li>
              <li>• Various drawer configurations for function</li>
              <li>• Open display options for visual interest</li>
            </ul>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-amber-400 font-medium text-sm mb-3">From Your Reference Images</h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• <strong className="text-white">Idea 8:</strong> X-frame ends, open shelves, rustic wood</li>
              <li>• <strong className="text-white">Idea 9:</strong> Blue-gray with X-panel on island end</li>
              <li>• <strong className="text-white">Idea 10:</strong> Open shelf + drawers below (very similar!)</li>
              <li>• <strong className="text-white">Idea 11:</strong> X-frame ends with butcher block</li>
              <li>• <strong className="text-white">Idea 12:</strong> Dark with chevron top, open ends</li>
            </ul>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-amber-400 font-medium text-sm mb-3">Locked Specs Applied</h3>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Bar length</span>
                <span className="text-green-400 font-mono">92"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cabinet height</span>
                <span className="text-green-400 font-mono">34.5"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cabinet depth</span>
                <span className="text-green-400 font-mono">14"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Toe kick</span>
                <span className="text-green-400 font-mono">4"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Butcher block</span>
                <span className="text-green-400 font-mono">1.5"</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="bg-gradient-to-r from-amber-900/30 to-slate-800 rounded-lg p-4 border border-amber-800/50">
          <h3 className="text-amber-400 font-medium text-sm mb-2">My Top 3 Recommendations</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <div className="bg-slate-800/50 rounded p-3">
              <div className="text-white font-medium text-sm mb-1">🥇 Barn Door Center</div>
              <p className="text-xs text-slate-400">
                The barn door becomes a true focal point. Drawers on one side for function, X-panel door on other for balance. Maximum farmhouse impact.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded p-3">
              <div className="text-white font-medium text-sm mb-1">🥈 Drawer + Barn + Open Cubby</div>
              <p className="text-xs text-slate-400">
                Most similar to your idea10 reference. Great mix of closed storage (drawers), display (cubbies), and character (barn door).
              </p>
            </div>
            <div className="bg-slate-800/50 rounded p-3">
              <div className="text-white font-medium text-sm mb-1">🥉 Bookend Drawers</div>
              <p className="text-xs text-slate-400">
                If you want maximum drawer storage but still want the barn door centerpiece. Symmetrical and very functional.
              </p>
            </div>
          </div>
        </div>
        
        {/* Visual comparison callout */}
        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
          <h3 className="text-blue-400 font-medium text-sm mb-2">Key Elements in These Variations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.drawer }}></div>
              <span className="text-slate-400">Drawer sections</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.open }}></div>
              <span className="text-slate-400">Open display</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.xFrame }}></div>
              <span className="text-slate-400">X-frame accents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-500"></div>
              <span className="text-slate-400">LED lighting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
