interface ColorLookup {
  [key: string]: string;
}

const colorLookup: ColorLookup= {
  "Hazelnut": "#BFA67A",
  "Burgundy": "#4d2c2d",
  "Whiskey": "#3f2913",
}

// const imgLookup: {[key: string]: string} = {
//   "cards": "./assets/cards.svg",
//   "storage": "/assets/coins.svg",
//   "pouch": "/assets/pull-tab.svg",
// }

// const imgLookupFn = (text: string) => {
//   //Gets the last word in the feature text and returns the corresponding image
//   const txt = text.toLowerCase().split(" ");
//   const ret = imgLookup[txt[txt.length - 1]];
//   console.log(ret);
//   return ret;
// }
// export {colorLookup, imgLookupFn};
export {colorLookup};