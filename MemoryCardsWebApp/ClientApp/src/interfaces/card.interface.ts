export interface Card {
  id: number;
  frontText: string;
  backText: string;
  frontImage: string;
  backImage: string;
  color: string;
}

function Card(id: number, frontText: string, backText: string, frontImage: string, backImage: string, color: string): Card {
  return {id: id, frontText: frontText, backText: backText, frontImage: frontImage, backImage: backImage, color: color};
}

function Empty(): Card {
  return {id: -1, frontText: "", backText: "", frontImage: "", backImage: "", color: ""};
}

//?? не видит(
