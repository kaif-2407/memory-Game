import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const [cards, setCards] = useState(generateGrid());
  const [isLocked, setLocked] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLocked) {
      return;
    }

    const copyCards = [...cards];
    copyCards[index].isFlipped = true;
    setCards(copyCards);
    setFlippedCards([...flippedCards, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setLocked(true);
      setTimeout(() => {
        if (cards[flippedCards[0]].number !== cards[flippedCards[1]].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[flippedCards[0]].isFlipped = false;
            copyCards[flippedCards[1]].isFlipped = false;
            return copyCards;
          });
        }
        setLocked(false);
        setFlippedCards([]);
      }, 3000);
    }
  }, [flippedCards]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-semibold text-blue-400 mb-8">Memory Game</h1>
      <div className="grid place-items-center grid-cols-6 gap-3">
        {cards.map(({ id, number, isFlipped }) => {
          return (
            <div
              onClick={() => handleClick(id)}
              className="h-14 w-14 flex justify-center items-center bg-linear-to-br from-blue-400/40 via-sky-300/30 to-blue-600/40 backdrop-blur-xl border border-white/30 rounded-xl shadow-xl p-6 text-red-700 tex-xl font-semibold cursor-pointer hover:scale-105 transition duration-500"
              key={id}
            >
              {isFlipped ? number : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const generateGrid = () => {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);
  const cards = grid.map((item, index) => {
    return { id: index, number: item, isFlipped: false };
  });
  return cards;
};

export default MemoryGame;
