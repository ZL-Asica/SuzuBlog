const LoadingIndicator = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[var(--gray)]" />
    </div>
  )
}

export default LoadingIndicator
