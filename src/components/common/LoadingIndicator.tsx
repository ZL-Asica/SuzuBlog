interface LoadingIndicatorProps {
  className?: string
}

const LoadingIndicator = ({ className = '' }: LoadingIndicatorProps) => {
  return (
    <div className={`flex items-center justify-center h-full w-full ${className}`}>
      <div className="relative w-16 h-16">
        {/* Spinner */}
        <div className="absolute inset-0 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
        {/* Pulsating Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator
