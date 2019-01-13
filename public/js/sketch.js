// // An array of news headlines
// var {headlines} = require('./homepage');

// let font,
// fontsize= 32;

// function preload(){
//     font = loadFont('assets/dot_digital-7.ttf');
// }

// var x;
// var index = 0;

  
//   void setup() {
//     size(400,200);
//     // Initialize headline offscreen to the right 
//     x = width; 
//   };
  
//   void draw() {
//     background(255);
//     fill(0);
//     textFont(font);
//     textSize(fontsize);
//     // Display headline at x  location      
//     textAlign(LEFT);
//     text(headlines[index],x,180); 
  
//     // Decrement x
//     x = x - 3;
  
//     // If x is less than the negative width, 
//     // then it is off the screen
//     var w = textWidth(headlines[index]);
//     if (x < -w) {
//       x = width; 
//       index = (index + 1) % headlines.length;
//     };
//   };




// var hello = $(".hello")
// var welcome = $(".welcome")

// function setup() {
//     createCanvas(500,500);
// }

// function draw() {

// }