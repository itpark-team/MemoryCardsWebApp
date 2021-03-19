using System.Collections.Generic;

namespace MemoryCardsWebApp.Models.TsEntities
{
    public class DeckToSend
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Visibility { get; set; }
        public int AuthorUserId { get; set; }
        public string AuthorUser { get; set; }
    }
}