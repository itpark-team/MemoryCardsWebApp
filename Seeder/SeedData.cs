using System.Collections.Generic;
using System.Threading.Tasks;
using MemoryCardsWebApp.Models;
using MemoryCardsWebApp.Models.DbEntities;
using Microsoft.EntityFrameworkCore;

namespace Seeder
{
    public class SeedData
    {
        private MemoryCardsContext dbContext { get; set; }

        public SeedData()
        {
            MemoryCardsContext dbContext = new MemoryCardsContext();
        }

        private async Task<List<User>> GetSeededUser()
        {
            List<User> users = new List<User>();
            users.Add(new User()
            {
                Id = 1,
                Username = "user1",
                Email = "user1@a.a",
                PasswordHash =
                    "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                AvatarImage = null,
                SubStatus = 1,
                SubExpire = 1640995199,
                IsActive = false
            });
            users.Add(new User()
            {
                Id = 2,
                Username = "user2",
                Email = "user2@a.a",
                PasswordHash =
                    "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                AvatarImage = null,
                SubStatus = 1,
                SubExpire = 1640995199,
                IsActive = false
            });
            users.Add(new User()
            {
                Id = 3,
                Username = "user3",
                Email = "user3@a.a",
                PasswordHash =
                    "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2",
                AvatarImage = null,
                SubStatus = 1,
                SubExpire = 1640995199,
                IsActive = false
            });
            return users;
        }

        private async Task<List<Deck>> GetSeededDecks()
        {
            List<Deck> decks = new List<Deck>();

            #region User1 decks

            decks.Add(new Deck()
            {
                Id = 1,
                Title = "Deck 1 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = true,
                AuthorUserId = 1
            });
            decks.Add(new Deck()
            {
                Id = 2,
                Title = "Deck 2 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = true,
                AuthorUserId = 1
            });
            decks.Add(new Deck()
            {
                Id = 3,
                Title = "Deck 3 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = false,
                AuthorUserId = 1
            });
            decks.Add(new Deck()
            {
                Id = 4,
                Title = "Deck 4 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = false,
                AuthorUserId = 1
            });

            #endregion

            #region User2 decks

            decks.Add(new Deck()
            {
                Id = 5,
                Title = "Deck 5 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = true,
                AuthorUserId = 2
            });
            decks.Add(new Deck()
            {
                Id = 6,
                Title = "Deck 6 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = true,
                AuthorUserId = 2
            });
            decks.Add(new Deck()
            {
                Id = 7,
                Title = "Deck 7 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = false,
                AuthorUserId = 2
            });
            decks.Add(new Deck()
            {
                Id = 8,
                Title = "Deck 8 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = false,
                AuthorUserId = 2
            });

            #endregion

            #region User3 decks

            decks.Add(new Deck()
            {
                Id = 9,
                Title = "Deck 9 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = true,
                AuthorUserId = 3
            });
            decks.Add(new Deck()
            {
                Id = 10,
                Title = "Deck 10 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = true,
                AuthorUserId = 3
            });
            decks.Add(new Deck()
            {
                Id = 11,
                Title = "Deck 11 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = false,
                AuthorUserId = 3
            });
            decks.Add(new Deck()
            {
                Id = 12,
                Title = "Deck 12 for test APP",
                Description =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Visibility = false,
                AuthorUserId = 3
            });

            #endregion

            return decks;
        }

        private async Task<List<Card>> GetSeededCards()
        {
            List<Card> cards = new List<Card>();
            List<string> frongImages = new List<string>()
            {
                "https://www.meme-arsenal.com/memes/b6e61c943e2ca8dc4e468c2f60b3432a.jpg",
                "https://pm1.narvii.com/6820/73ea2fcace602faa9d93ca0efbd6c86998fc2689v2_hq.jpg",
                "https://pbs.twimg.com/media/EOpBkp8XkAAR7NM.jpg",
                "https://w7.pngwing.com/pngs/476/475/png-transparent-ryuko-matoi-anime-senketsu-manga-nonon-jakuzure-anime.png"
            };
            List<string> backImages = new List<string>()
            {
                "https://i.ytimg.com/vi/fHxEMKq9aYQ/maxresdefault.jpg",
                "https://animekayo.com/wp-content/uploads/2018/12/darling-in-the-franxx-480p-bd-dual-audio-hevc.png",
                "https://media.kg-portal.ru/anime/a/attackmovie1/posters/attackmovie1_1.jpg",
                "https://i.pinimg.com/736x/eb/4c/a2/eb4ca2cc0a52a021786ea2cae3efcec3.jpg"
            };
            List<string> frontTexts = new List<string>() {"Aqua", "Zero Two", "Hanji Zoe", "Matoi Ryuko"};
            List<string> backTexts = new List<string>()
                {"Kanosuba", "Darling in the Franxx", "Attack on Titan", "Kill la Kill"};
            List<string> colors = new List<string>() {"#00fff7", "#ff00e0", "#dcf357", "#ff3c1d"};
            for (int i = 0; i < 192; i++)
            {
                cards.Add(new Card()
                {
                    Id = i + 1,
                    FrontImage = frongImages[i % 4],
                    FrontText = frontTexts[i % 4],
                    BackImage = backImages[i % 4],
                    BackText = backTexts[i % 4]
                });
            }

            return cards;
        }

        private async Task<List<DecksCard>> GetSeedeDecksCards()
        {
            List<DecksCard> decksCards = new List<DecksCard>();
            for (int i = 0; i < 12; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    decksCards.Add(new DecksCard()
                    {
                        DeckId = i + 1,
                        CardId = i * 4 + j + 1
                    });
                }
            }

            return decksCards;
        }

        private async Task<List<UsersDeck>> GetSeededUsersDeck()
        {
            List<UsersDeck> usersDecks = new List<UsersDeck>();
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    usersDecks.Add(new UsersDeck()
                    {
                        UserId = i + 1,
                        DeckId = i * 4 + j + 1
                    });
                }
            }

            return usersDecks;
        }

        private async Task SeedUsers()
        {
            List<User> users = await GetSeededUser();
            foreach (var user in users)
            {
                dbContext.Users.Add(user);
            }
        }

        private async Task SeedDecks()
        {
            List<Deck> decks = await GetSeededDecks();
            foreach (var deck in decks)
            {
                dbContext.Decks.Add(deck);
            }
        }

        private async Task SeedCards()
        {
            List<Card> cards = await GetSeededCards();
            foreach (var card in cards)
            {
                dbContext.Cards.Add(card);
            }
        }

        private async Task SeedDecksCards()
        {
            List<DecksCard> decksCards = await GetSeedeDecksCards();
            foreach (var decksCard in decksCards)
            {
                dbContext.DecksCards.Add(decksCard);
            }
        }

        private async Task SeedUsersDeck()
        {
            List<UsersDeck> usersDecks = await GetSeededUsersDeck();
            foreach (var usersDeck in usersDecks)
            {
                dbContext.UsersDecks.Add(usersDeck);
            }
        }

        public async Task Seed()
        {
            dbContext.Cards.FromSqlRaw("TRUNCATE ");
            await SeedUsers();
            await SeedCards();
            await SeedDecks();
            await SeedDecksCards();
            await SeedUsersDeck();
        }
    }
}