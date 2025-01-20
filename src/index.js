import React, { useEffect } from 'react';
import './cursor.css';

const CustomCursor = () => {
  useEffect(() => {
    const cursorDot = document.createElement('div');
    const cursorCircle = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorCircle.className = 'cursor-circle';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorCircle);

    let position = { x: 0, y: 0 };
    let isHovered = false;

    const updatePosition = e => {
      position.x = e.clientX;
      position.y = e.clientY;
      if (!isHovered) {
        cursorDot.style.left = `${position.x}px`;
        cursorDot.style.top = `${position.y}px`;
        cursorCircle.style.left = `${position.x}px`;
        cursorCircle.style.top = `${position.y}px`;
      }
    };

    const handleMouseEnter = e => {
      isHovered = true;
      cursorDot.classList.add('cursor-dot-hidden');
      cursorCircle.classList.add('hovered');
      const rect = e.target.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(e.target);
      const isIcon = e.target.tagName === 'IMG' || computedStyle.borderRadius === '50%';
      Object.assign(cursorCircle.style, {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: isIcon ? '50%' : computedStyle.borderRadius,
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        border: '2px solid yellow'
      });
    };

    const handleMouseLeave = () => {
      isHovered = false;
      cursorDot.classList.remove('cursor-dot-hidden');
      cursorCircle.classList.remove('hovered');
      cursorCircle.style = '';
    };

    window.addEventListener('mousemove', updatePosition);
    document.querySelectorAll('button, a, .social-button').forEach(target => {
      target.addEventListener('mouseenter', handleMouseEnter);
      target.addEventListener('mouseleave', handleMouseLeave);
      if (window.getComputedStyle(target).position === 'static') {
        target.style.position = 'relative';
      }
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      cursorDot.remove();
      cursorCircle.remove();
    };
  }, []);

  return null;
};

export { CustomCursor };
export default CustomCursor;