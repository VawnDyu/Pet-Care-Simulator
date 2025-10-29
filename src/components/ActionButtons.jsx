function ActionButtons({ onFeed, onPlay, onRest, canPlay, canRest, canFeed }) {
  return (
    <div className="buttons">
      <button
        onClick={onFeed}
        disabled={!canFeed}
        className={!canFeed ? 'disabled' : ''}
      >
        🍖 Feed
      </button>
      <button
        onClick={onPlay}
        disabled={!canPlay}
        className={!canPlay ? 'disabled' : ''}
      >
        🎮 Play
      </button>
      <button
        onClick={onRest}
        disabled={!canRest}
        className={!canRest ? 'disabled' : ''}
      >
        💤 Rest
      </button>
    </div>
  );
}

export default ActionButtons;