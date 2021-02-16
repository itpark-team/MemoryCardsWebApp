using System;
using System.Collections.Generic;

#nullable disable

namespace MemoryCardsWebApp.Models.Entities
{
    public partial class Card
    {
        public Card()
        {
            DecksCards = new HashSet<DecksCard>();
        }

        public int Id { get; set; }
        public string FrontText { get; set; }
        public string BackText { get; set; }
        public string FrontImage { get; set; }
        public string BackImage { get; set; }
        public string Color { get; set; }

        public virtual ICollection<DecksCard> DecksCards { get; set; }
    }
}
