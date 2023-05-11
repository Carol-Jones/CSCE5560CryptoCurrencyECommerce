//Array of the items to sell
import Item from "./Item";

const items = [];

const names = [
  "Witchy Black Cat",
  "Feline Intrigue",
  "Clifftop Majesty",
  "Castle Dreams",
  "Double the Fun",
  "Sunshine Yarn Delight",
  "Boxed In and Loving It",
  "Cosmic Curiosity",
  "Wild West Whiskers",
  "Lunar Companions",
  "Kittyzilla",
  "Fireside Feline",
  "Sun-Kissed Snoozer",
  "Mysterious Illumination",
];

//Create Items
for (let i = 1; i <= 14; i++) {
  const itemName = names[i - 1];
  const itemImgPath = `images/productImages/IMG_${i}.WEBP`;
  const itemPrice = i + 2;
  const item = new Item(i, itemName, itemPrice, itemImgPath);
  items.push(item);
}

export default items;
