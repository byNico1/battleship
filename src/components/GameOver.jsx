const GameOver = ({ gameOver, restartGame }) => {
  return (
    <section
      className={`${
        gameOver.state ? "block" : "hidden"
      } absolute inset-0 grid place-items-center bg-black`}
    >
      <div>
        <h2 className="mb-5 text-2xl font-bold">Game Over</h2>
        <h3 className="mb-5 text-xl">Winner is: {gameOver.winner}</h3>
        <button onClick={restartGame}>Restart</button>
      </div>
    </section>
  );
};

export default GameOver;
