import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for scroll-based animations using GSAP
 * @param {Object} options - Animation options
 * @returns {Object} - Ref to attach to element
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    once = false,
    animation = {},
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const triggerElement = trigger || element;

    // Default animation if not specified
    const defaultAnimation = {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    };

    const animationProps = { ...defaultAnimation, ...animation };

    // Set initial state
    gsap.set(element, {
      opacity: animationProps.opacity,
      y: animationProps.y,
      x: animationProps.x || 0,
      scale: animationProps.scale || 1,
      rotation: animationProps.rotation || 0,
    });

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub,
        markers,
        once,
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: animationProps.duration,
            ease: animationProps.ease,
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [trigger, start, end, scrub, markers, once, animation]);

  return elementRef;
};

/**
 * Stagger animation for multiple elements
 */
export const useStaggerAnimation = (options = {}) => {
  const containerRef = useRef(null);
  const { 
    childSelector = '.animate-item',
    start = 'top 80%',
    stagger = 0.1,
    animation = {} 
  } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(childSelector);
    
    const defaultAnimation = {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    };

    const animationProps = { ...defaultAnimation, ...animation };

    // Set initial state
    gsap.set(children, {
      opacity: 0,
      y: animationProps.y || 50,
    });

    // Create stagger animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: animationProps.duration,
          stagger,
          ease: animationProps.ease,
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [childSelector, start, stagger, animation]);

  return containerRef;
};

/**
 * Parallax effect hook
 */
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return elementRef;
};

export default useScrollAnimation;
