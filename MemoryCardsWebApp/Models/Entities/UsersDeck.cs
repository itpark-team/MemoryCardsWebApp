using System;
using System.Collections.Generic;

#nullable disable

namespace MemoryCardsWebApp.Models.Entities
{
    public partial class UsersDeck
    {
        public int UserId { get; set; }
        public int DeckId { get; set; }

        public virtual Deck Deck { get; set; }
        public virtual User User { get; set; }
    }
}
