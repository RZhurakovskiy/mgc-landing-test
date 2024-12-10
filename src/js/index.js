gsap.registerPlugin(ScrollTrigger);

const blocks = gsap.utils.toArray(".systems");

// Изначально показываем первый блок, скрываем остальные
blocks.forEach((block, index) => {
  gsap.set(block, { opacity: index === 0 ? 1 : 0 });
});

const totalTransitions = blocks.length - 1; // Количество переходов
const transitionDuration = 1; // Продолжительность каждого перехода (в секундах)
const transitionDelay = 0.2; // Задержка между анимациями переходов (в секундах)
const endDelay = 2; // Задержка до следующей секции

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".mgc-systems",
    start: "top top",
    end: "+=" + ((totalTransitions + 1) * 100) + "%",
    pin: true,
    scrub: true
  }
});

// Анимации для плавного растворения
blocks.slice(1).forEach((block, index) => {
  const startTime = (index + 1) * (transitionDuration + transitionDelay);
  
  tl.to(blocks[index], { 
      opacity: 0, 
      ease: "power4.out", 
      duration: transitionDuration 
    }, startTime - transitionDuration)
    .to(block, { 
      opacity: 1, 
      ease: "power4.in", 
      duration: transitionDuration 
    }, startTime - transitionDuration);

  // Задержка между переходами
  tl.to({}, { duration: transitionDelay });
});

// Пауза после последнего блока перед скроллом к следующей секции
tl.to({}, { duration: endDelay });
