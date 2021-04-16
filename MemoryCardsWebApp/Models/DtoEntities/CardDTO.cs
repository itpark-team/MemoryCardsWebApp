using MemoryCardsWebApp.Models.DbEntities;

namespace MemoryCardsWebApp.Models.DtoEntities
{
    public class CardDTO
    {
        public Card Card { get; set; }
        public int DeckId { get; set; }
    }
}