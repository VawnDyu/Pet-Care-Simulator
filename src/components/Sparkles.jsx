function Sparkles({ show, timestamp }) {
  if (!show) return null;

  return (
    <div className="sparkles-container" key={timestamp}>
      <span className="sparkle sparkle-1">✨</span>
      <span className="sparkle sparkle-2">✨</span>
      <span className="sparkle sparkle-3">✨</span>
      <span className="sparkle sparkle-4">✨</span>
      <span className="sparkle sparkle-5">✨</span>
      <span className="sparkle sparkle-6">✨</span>
    </div>
  );
}

export default Sparkles;