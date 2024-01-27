const normalizeCards = (cards, myId) => {
  console.log("myId", myId);
  if (!cards) return null;
  const newCards = cards.map((card) => ({
    ...card,
    liked: card.likes.includes(myId),
  }));
  console.log(newCards, "newCards");
  return newCards;
};

export default normalizeCards;
