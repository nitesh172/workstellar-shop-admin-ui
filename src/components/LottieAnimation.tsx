import React, { useRef } from 'react'

const LottieAnimation = () => {
  const ref = useRef(null)
  React.useEffect(() => {
    import('@lottiefiles/lottie-player')
  })

  return (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoplay
      loop
      mode="normal"
      src='/loader/Loader.json'
      style={{ width: '160px' }}
    ></lottie-player>
  )
}

export default LottieAnimation
