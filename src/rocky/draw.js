module.exports = {
  drawDigital: function drawDigital(ctx, cx, cy, color, font) {
    var text = new Date()
                .toLocaleTimeString()
                .split(':')
                .splice(0,2)
                .join(':');
  
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.font = font;
    ctx.fillText(text, cx, cy, 70);
  },
  drawHand: function drawHand(ctx, cx, cy, angle, length, color) {
    // Find the end points
    var x2 = cx + Math.sin(angle) * length;
    var y2 = cy - Math.cos(angle) * length;
  
    // Configure how we want to draw the hand
    ctx.lineWidth = 8;
    ctx.strokeStyle = color;
  
    // Begin drawing
    ctx.beginPath();
  
    // Move to the center point, then draw the line
    ctx.moveTo(cx, cy);
    ctx.lineTo(x2, y2);
  
    // Stroke the line (output to display)
    ctx.stroke();
  },
  drawCircle: function drawCircle(ctx, cx, cy, radius, lineWidth, color) {
    ctx.fillStyle = color;
    ctx.rockyFillRadial(cx, cy, radius - lineWidth, radius, 0, 2 * Math.PI);
  },
  drawDay: function drawDay(ctx, cx, cy) {
    var day = '';
    switch (new Date().getDay()) {
      case 0:
          day = "SUN";
          break;
      case 1:
          day = "MON";
          break;
      case 2:
          day = "TUE";
          break;
      case 3:
          day = "WED";
          break;
      case 4:
          day = "THU";
          break;
      case 5:
          day = "FRI";
          break;
      case 6:
          day = "SAT";
      }
  
      ctx.fillStyle = 'lightgray';
      ctx.textAlign = 'center';
      ctx.font = '24px bold Gothic';
  
      ctx.fillText(day, cx, cy, 30);
  },
  drawWeather: function drawWeather(ctx, weather, cx, cy) {
    // Create a string describing the weather
    var weatherString = weather.celcius + 'ºC, ' + weather.desc;
  
    // Draw the text, top center
    ctx.fillStyle = 'lightgray';
    ctx.textAlign = 'center';
    ctx.font = '24px bold Gothic';
    ctx.fillText(weatherString, cx, cy, 100);
  }
};