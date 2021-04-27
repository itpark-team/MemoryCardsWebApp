export interface Deck {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
  authorUserId: number;
  authorUserName: string;
}
//у нас они разные в двух файлах, оставил универсальный
