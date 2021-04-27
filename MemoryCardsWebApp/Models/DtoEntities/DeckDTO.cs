namespace MemoryCardsWebApp.Models.DtoEntities
{
    public class DeckDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Visibility { get; set; }
        public int AuthorUserId { get; set; }
        public string AuthorUser { get; set; }
    }
}