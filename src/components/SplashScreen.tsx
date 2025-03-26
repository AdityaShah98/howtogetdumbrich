import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import '../animations.css';

interface SplashScreenProps {
  exitSplash: () => void;
}

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;
  overflow: visible;
`;

const Word = styled.span`
  display: inline-block;
  overflow: visible;
`;

const TitleChar = styled.span`
  display: inline-block;
  transform-origin: center;
  overflow: visible;
`;

const DollarSign = styled.span`
  color: #4CAF50;
  font-weight: 800;
  position: relative;
`;

const DollarSymbols = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  pointer-events: none;
  z-index: 2;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #666;
  margin: 1rem 0 0 0;
  opacity: 0;
  text-align: center;
  max-width: 80%;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const SplashScreen: React.FC<SplashScreenProps> = ({ exitSplash }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const dollarSymbolsRef = useRef<HTMLDivElement>(null);
  const [animationPreloaded, setAnimationPreloaded] = useState(false);

  // Preload GSAP animations before component is fully mounted
  useEffect(() => {
    // Preload GSAP and initialize it immediately
    gsap.config({ nullTargetWarn: false });
    gsap.ticker.lagSmoothing(0); // Reduce lag during initial animation
    setAnimationPreloaded(true);
    
    // Pre-create the animation timeline to have it ready
    const tl = gsap.timeline();
    return () => {
      // Clean up timeline on unmount
      tl.kill();
    };
  }, []);

  // Main animation effect runs after animations are preloaded
  useEffect(() => {
    if (!animationPreloaded) return;
    if (!containerRef.current) return;
    
    // Create dollar symbols for the animation immediately
    if (dollarSymbolsRef.current) {
      for (let i = 0; i < 20; i++) {
        const symbol = document.createElement('div');
        symbol.textContent = '$';
        symbol.style.position = 'absolute';
        symbol.style.top = '0';
        symbol.style.left = `${i%5 * 20 - 40}px`;
        symbol.style.color = '#4CAF50';
        symbol.style.opacity = '0';
        symbol.className = 'dollar-rain';
        dollarSymbolsRef.current.appendChild(symbol);
      }
    }

    // Create a main timeline - start immediately without delay
    const tl = gsap.timeline({
      onComplete: () => {
        // When animation completes, animate out the splash screen (fade out)
        gsap.to(containerRef.current, {
          opacity: 0, //this isnt fading everything out
          duration: 1,
          delay: 1, // Keep the 3 second delay before transitioning out
          onComplete: exitSplash
        });
      }
    });

    // Animate the background immediately
    tl.fromTo(backgroundRef.current, {
      backgroundPosition: '0% 0%',
    }, {
      backgroundPosition: '100% 100%',
      duration: 4,
      ease: "power1.inOut"
    }, 0);

    // Initial setup - show characters with opacity 0 but ready to animate
    if (charRefs.current.length > 0) {
      gsap.set(charRefs.current, { 
        opacity: 0, 
        scale: 0,
        y: -20 
      });
      
      // Start animation immediately
      tl.to(charRefs.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.03,
        stagger: 0.03,
        ease: "back.out(3)"
      }, 0.5); // Small delay to ensure DOM is ready
    }

    // Add a bounce effect to rich with dollar sign animation
    const richWord = wordRefs.current[4]; // "Rich" is the 5th word (index 4)
    
    if (richWord) {
      tl.to(richWord, {
        scale: 1.1,
        color: "#2a9d2a",
        duration: 0.3,
        ease: "back.out(2)",
        onComplete: () => {
          // Animate dollar symbols raining down
          if (dollarSymbolsRef.current) {
            const symbols = dollarSymbolsRef.current.querySelectorAll('.dollar-rain');
            symbols.forEach((symbol, index) => {
              gsap.to(symbol, {
                opacity: 1,
                y: Math.random() * 120 + 60,
                x: (Math.random() - 0.5) * 60,
                rotation: Math.random() * 360,
                duration: 1.5,
                delay: index * 0.1,
                ease: "power3.out",
                onComplete: () => {
                  gsap.to(symbol, {
                    opacity: 0,
                    duration: 0.3
                  });
                }
              });
            });
          }
        }
      }, "-=1");
      
      tl.to(richWord, {
        scale: 1,
        color: "#333",
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.8");
    }

    // Animate in the subtitle
    if (subtitleRef.current) {
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=4");
    }

  }, [exitSplash, animationPreloaded]);

  return (
    <SplashContainer ref={containerRef} className="initial-fade-in">
      <AnimatedBackground ref={backgroundRef} className="splash-gradient" />
      <Content>
        <Title ref={titleRef} className="shine-effect">
          {/* Split the title into words and characters for animation */}
          {"How To Get Dumb Rich".split(' ').map((word, wordIndex) => (
            <Word 
              key={wordIndex}
              ref={el => {
                if (el) wordRefs.current[wordIndex] = el;
              }}
            >
              {word === 'Rich' ? (
                <>
                  <DollarSign className="dollar-sign pulse">$</DollarSign>
                  <DollarSymbols ref={dollarSymbolsRef} />
                  {word.split('').map((char, charIndex) => (
                    <TitleChar
                      key={`${wordIndex}-${charIndex}`}
                      ref={el => {
                        if (el) charRefs.current.push(el);
                      }}
                    >
                      {char}
                    </TitleChar>
                  ))}
                </>
              ) : (
                word.split('').map((char, charIndex) => (
                  <TitleChar
                    key={`${wordIndex}-${charIndex}`}
                    ref={el => {
                      if (el) charRefs.current.push(el);
                    }}
                  >
                    {char}
                  </TitleChar>
                ))
              )}
              {wordIndex < 4 ? ' ' : ''}
            </Word>
          ))}
        </Title>
        <Subtitle ref={subtitleRef}>
          How much cash could you have made?
        </Subtitle>
      </Content>
    </SplashContainer>
  );
};

export default SplashScreen;