using System;
using System.Collections.Generic;

#nullable disable

namespace MemoryCardsWebApp.Models.Entities
{
    public partial class InviteLink
    {
        public int Id { get; set; }
        public int DeckId { get; set; }
        public string LinkHash { get; set; }

        public virtual Deck Deck { get; set; }
    }
}
