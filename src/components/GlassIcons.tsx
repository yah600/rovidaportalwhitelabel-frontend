import './GlassIcons.css';
import React from 'react';

interface GlassIconItem {
  icon: React.ReactNode;
  color: string;
  label: string;
  customClass?: string;
  onClick?: () => void;
}

interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const gradientMapping: { [key: string]: string } = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
  // Rovida palette additions
  'rovida-navy': 'linear-gradient(to bottom right, #183747, #2A4959)',
  'rovida-gold': 'linear-gradient(to bottom right, #C4972E, #E2A33B)',
  'rovida-slate-green-gray': 'linear-gradient(to bottom right, #7C8D89, #A9B9B5)',
  'rovida-error': 'linear-gradient(to bottom right, #B2433F, #D05A56)',
  'rovida-success': 'linear-gradient(to bottom right, #3A7D44, #4CAF50)',
};

const GlassIcons = ({ items, className }: GlassIconsProps) => {
  const getBackgroundStyle = (color: string) => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <button key={index} className={`icon-btn ${item.customClass || ''}`} aria-label={item.label} type="button" onClick={item.onClick}>
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;