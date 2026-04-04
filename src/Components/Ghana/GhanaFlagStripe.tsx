
const GhanaFlagStripe = () => {
  return (
    <>
     {/* === GHANA FLAG STRIPE WITH BLACK STAR === */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 shadow-lg z-50 flex items-center justify-center">
        {/* BLACK STAR */}
        <div className="absolute w-5 h-5 mt-0">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <path
              d="M50 10 L61.8 35.5 L88.2 38.6 L67.7 56.4 L71.8 82.8 L50 69.5 L28.2 82.8 L32.3 56.4 L11.8 38.6 L38.2 35.5 Z"
              fill="#000"
              stroke="#000"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </>
  )
}

export default GhanaFlagStripe


