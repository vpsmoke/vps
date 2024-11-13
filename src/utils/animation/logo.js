import { gsap } from 'gsap/dist/gsap'

export default function logoAnimation(section) {
  const letras = {
    Ponto: document.querySelector(`${section} .letra-0`),
    N: document.querySelector(`${section} .letra-1`),
    O: document.querySelector(`${section} .letra-2`),
    V: document.querySelector(`${section} .letra-3`),
    A1: document.querySelector(`${section} .letra-4`),
    D: document.querySelector(`${section} .letra-5`),
    A2: document.querySelector(`${section} .letra-6`),
    T: document.querySelector(`${section} .letra-8`),
    A3: document.querySelector(`${section} .letra-7`),
  }

  const letrasOcultas = [
    letras.O,
    letras.V,
    letras.A2,
    letras.A1,
    letras.A3,
  ]
  const letrasVisivies = [letras.Ponto, letras.N, letras.D, letras.T]

  const logoAnimation = gsap
    .timeline({
      overwrite: true,
      delay: 0,
      ease: 'none',
      transformOrigin: 'left right',
      paused: true,
    })
    .set(letrasOcultas, {
      opacity: 0,
      translateZ: 0,
    })

    .set([letras.Ponto], {
      x: 55,
      translateZ: 0,
    })
    .set([letras.N], {
      x: 55,
      translateZ: 0,
    })
    .set([letras.D], {
      x: -20,
      translateZ: 0,
    })
    .set([letras.T], {
      x: -48,
      translateZ: 0,
    })
    .to(letrasOcultas, {
      opacity: 1,
      duration: 0.6,
      delay: 1.6,
    })
    .to(
      letrasVisivies,
      {
        x: 0,
        duration: 0.5,
      },
      '<'
    )

  const logoAnimationToNovadata = gsap
    .timeline({
      overwrite: true,
      delay: 0,
      ease: 'none',
      transformOrigin: 'left right',
      paused: true,
    })
    .to(
      letrasOcultas,
      {
        opacity: 0,
      },
      'juntas'
    )
    .to(
      [letras.Ponto],
      {
        x: 55,
      },
      'juntas'
    )

    .to(
      [letras.N],
      {
        x: 55,
      },
      'juntas'
    )

    .to(
      [letras.D],
      {
        x: -20,
      },
      'juntas'
    )
    .to(
      [letras.T],
      {
        x: -48,
      },
      'juntas'
    )
    .to(
      letrasOcultas,
      {
        opacity: 1,
        duration: 0.6,
      },
      'juntas'
    )
    .to(
      letrasVisivies,
      {
        x: 0,
        duration: 0.5,
      },
      'juntas'
    )

  const logoAnimationToNDT = gsap
    .timeline({
      overwrite: true,
      delay: 0,
      ease: 'sine',
      transformOrigin: 'left right',
      paused: true,
    })
    .from(letrasOcultas, {
      opacity: 1,
      duration: 0,
    })
    .from(letrasVisivies, {
      x: 0,
    })
    .to(
      letrasOcultas,
      {
        opacity: 0,
      },
      'juntas'
    )
    .to(
      [letras.Ponto],
      {
        x: 55,
      },
      'juntas'
    )
    .to(
      [letras.N],
      {
        x: 55,
      },
      'juntas'
    )
    .to(
      [letras.D],
      {
        x: -20,
      },
      'juntas'
    )
    .to(
      [letras.T],
      {
        x: -48,
      },
      'juntas'
    )

  // window.logoAnimationToNovadata = logoAnimationToNovadata
  // window.logoAnimationToNDT = logoAnimationToNDT
  // window.animationGrave = animationGrave
  // window.animationGrave2 = animationGrave2
  return {
    logoAnimation,
    logoAnimationToNovadata,
    logoAnimationToNDT,
  }
}
