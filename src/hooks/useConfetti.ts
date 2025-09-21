import { useCallback } from "react";

export const useConfetti = () => {
  const triggerConfetti = useCallback((element?: HTMLElement) => {
    const targetElement = element || document.body;
    
    // Create confetti container
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "9999";
    
    // Generate confetti pieces
    const colors = ["#6C3EA0", "#FFC107", "#28A745", "#FF6B6B", "#4ECDC4"];
    const pieces = 50;
    
    for (let i = 0; i < pieces; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "absolute";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = Math.random() * 100 + "%";
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      confetti.style.animation = `confetti-fall ${Math.random() * 2 + 1}s linear forwards`;
      
      // Add CSS animation
      const style = document.createElement("style");
      style.textContent = `
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      
      if (!document.head.querySelector('[data-confetti-style]')) {
        style.setAttribute('data-confetti-style', 'true');
        document.head.appendChild(style);
      }
      
      confettiContainer.appendChild(confetti);
    }
    
    targetElement.appendChild(confettiContainer);
    
    // Clean up after animation
    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer);
      }
    }, 3000);
  }, []);

  return { triggerConfetti };
};