using System;
using System.Collections.Generic;

#nullable disable

namespace MemoryCardsWebApp.Models.Entities
{
    public partial class DecksCard
    {
        public int DeckId { get; set; }
        public int CardId { get; set; }

        public virtual Card Card { get; set; }
        public virtual Deck Deck { get; set; }
    }
}
