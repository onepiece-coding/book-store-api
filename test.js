const path = require("path");

// __dirname is a Node JS global variable
console.log(__dirname); // C:\Users\PC\Desktop\Book Store API

const imagesPath = path.join(__dirname, "images");
console.log(imagesPath); // C:\Users\PC\Desktop\Book Store API\images

// FileName
console.log(Date.now()); // 1741638217718
console.log(new Date().toISOString()); // 2025-03-10T20:23:37.719Z
console.log(new Date().toISOString().replace(/:/g, "-")); // 2025-03-10T20-25-54.174Z
