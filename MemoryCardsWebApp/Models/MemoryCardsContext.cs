using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MemoryCardsWebApp.Models.Entities;

#nullable disable

namespace MemoryCardsWebApp.Models
{
    public partial class MemoryCardsContext : DbContext
    {
        public MemoryCardsContext()
        {
        }

        public MemoryCardsContext(DbContextOptions<MemoryCardsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Card> Cards { get; set; }
        public virtual DbSet<Deck> Decks { get; set; }
        public virtual DbSet<DecksCard> DecksCards { get; set; }
        public virtual DbSet<InviteLink> InviteLinks { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UsersDeck> UsersDecks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=u1236834.plsk.regruhosting.ru;Initial Catalog=u1236834_MemoryCards;User Id=u1236834_groups;Password=reallyStrongPwd123;Trusted_Connection=false;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Card>(entity =>
            {
                entity.Property(e => e.BackImage)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BackText)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Color)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('ffffffff')");

                entity.Property(e => e.FrontImage)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FrontText)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Deck>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.AuthorUser)
                    .WithMany(p => p.Decks)
                    .HasForeignKey(d => d.AuthorUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Decks_Users_Id");
            });

            modelBuilder.Entity<DecksCard>(entity =>
            {
                entity.HasKey(e => new { e.DeckId, e.CardId })
                    .HasName("PK_decks_cards");

                entity.HasOne(d => d.Card)
                    .WithMany(p => p.DecksCards)
                    .HasForeignKey(d => d.CardId)
                    .HasConstraintName("FK_DecksCards_Cards_Id");

                entity.HasOne(d => d.Deck)
                    .WithMany(p => p.DecksCards)
                    .HasForeignKey(d => d.DeckId)
                    .HasConstraintName("FK_DecksCards_Decks_Id");
            });

            modelBuilder.Entity<InviteLink>(entity =>
            {
                entity.Property(e => e.LinkHash)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Deck)
                    .WithMany(p => p.InviteLinks)
                    .HasForeignKey(d => d.DeckId)
                    .HasConstraintName("FK_InviteLinks_Decks_Id");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AvatarImage)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(35)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.SubExpire).HasColumnType("datetime");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UsersDeck>(entity =>
            {
                entity.HasKey(e => new { e.DeckId, e.UserId })
                    .HasName("PK_users_decks");

                entity.HasOne(d => d.Deck)
                    .WithMany(p => p.UsersDecks)
                    .HasForeignKey(d => d.DeckId)
                    .HasConstraintName("FK_UsersDecks_Decks_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersDecks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersDecks_Users_Id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
