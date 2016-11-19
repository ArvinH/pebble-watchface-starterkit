var rocky = require('rocky');
var drawAPI = require('./draw');

function fractionToRadian(fraction) {
  return fraction * 2 * Math.PI;
}

// Global object to store weather data
var weather;

rocky.on('draw', function(event) {
  var ctx = event.context;
  var d = new Date();

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Determine the center point of the display
  // and the max size of watch hands
  var cx = w / 2;
  var cy = h / 2;

  // -20 so we're inset 10px on each side
  var maxLength = (Math.min(w, h) - 40) / 2;

  // Calculate the minute hand angle
  var minuteFraction = (d.getMinutes()) / 60;
  var minuteAngle = fractionToRadian(minuteFraction);

  // Draw the minute hand
  drawAPI.drawHand(ctx, cx, cy, minuteAngle, maxLength, "white");

  // Calculate the hour hand angle
  var hourFraction = (d.getHours() % 12 + minuteFraction) / 12;
  var hourAngle = fractionToRadian(hourFraction);

  // Draw the hour hand
  drawAPI.drawHand(ctx, cx, cy, hourAngle, maxLength * 0.6, "lightblue");
  
  // drawAPI.drawCircle(ctx, cx, cy, maxLength * 1.5, 2, 'lightgray');
  drawAPI.drawDigital(ctx, w * (4/5) - 5, h * (4/5) , 'white', '24px bold Gothic' );
  drawAPI.drawDay(ctx, w / 5, h * (4/5));
  // Draw Weather on the bottom of the screen, if available
  if (weather) {
    drawAPI.drawWeather(ctx, weather, w / 2, 2);
  }
});

rocky.on('minutechange', function(event) {
  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});

rocky.on('hourchange', function(event) {
  // Send a message to fetch the weather information (on startup and every hour)
  rocky.postMessage({'fetch': true});
});


rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.weather) {
    // Save the weather data
    weather = message.weather;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});