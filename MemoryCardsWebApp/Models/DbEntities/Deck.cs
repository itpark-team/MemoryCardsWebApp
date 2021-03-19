using System;
using System.Collections.Generic;

#nullable disable

namespace MemoryCardsWebApp.Models.DbEntities
{
    public partial class Deck
    {
        public Deck()
        {
            DecksCards = new HashSet<DecksCard>();
            InviteLinks = new HashSet<InviteLink>();
            UsersDecks = new HashSet<UsersDeck>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Visibility { get; set; }
        public int AuthorUserId { get; set; }

        public virtual User AuthorUser { get; set; }
        public virtual ICollection<DecksCard> DecksCards { get; set; }
        public virtual ICollection<InviteLink> InviteLinks { get; set; }
        public virtual ICollection<UsersDeck> UsersDecks { get; set; }
    }
}
