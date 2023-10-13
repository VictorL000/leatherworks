import cards from "./assets/cards.svg";
import coins from "./assets/coins.svg";
import pulltab from "./assets/pull-tab.svg";

const colorLookup = {
  "Hazelnut": "#BFA67A",
  "Burgundy": "#4d2c2d",
  "Whiskey": "#3f2913",
}

const imgLookup = {
  "cards": cards,
  "storage": coins,
  "pouch": pulltab,
}

const imgLookupFn = (text) => {
  //Gets the last word in the feature text and returns the corresponding image
  let txt = text.toLowerCase().split(" ");
  let ret = imgLookup[txt[txt.length -1]];
  console.log(ret);
  return ret;
}
export {colorLookup, imgLookupFn};