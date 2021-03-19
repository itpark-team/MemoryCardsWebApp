using System;
using System.Collections.Generic;

#nullable disable

namespace MemoryCardsWebApp.Models.DbEntities
{
    public partial class User
    {
        public User()
        {
            Decks = new HashSet<Deck>();
            UsersDecks = new HashSet<UsersDeck>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string AvatarImage { get; set; }
        public byte SubStatus { get; set; }
        public DateTime? SubExpire { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Deck> Decks { get; set; }
        public virtual ICollection<UsersDeck> UsersDecks { get; set; }
    }
}
