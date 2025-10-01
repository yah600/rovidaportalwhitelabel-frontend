import './GlassIcons.css';
import React from 'react';
import { motion } from 'motion/react';

interface GlassIconItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const GlassIcons = ({ items, className }: GlassIconsProps) => {
  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <motion.button
          key={index}
          className={`icon-btn`}
          aria-label={item.label}
          type="button"
          onClick={item.onClick}
          whileHover={{ scale: 1.2 }} // Magnify on hover
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default GlassIcons;