class Clock {
  static draw(canvas, ctx) {
    ctx.save()
    ctx.translate(0, canvas.height/2);

    const spacing = canvas.width / 60;

    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()

    this.drawUnit(ctx, spacing, -spacing * 2, s, 'blue')
    this.drawUnit(ctx, spacing, 0, m, 'red')
    this.drawUnit(ctx, spacing, spacing * 2, h, 'purple')

    ctx.restore()
  }

  static drawUnit(ctx, spacing, height, u, color) {
    ctx.fillStyle = color
    let x = 0;
    for (let unit = 0; unit <= u; unit++) {
      ctx.fillRect(x, height, spacing - 1, spacing)
      x += spacing
    }
  }
}

/*
 * Rendering base.
 *
 * draw draws the canvas and its elements
 *
 * setup is a one time call to select the canvas DOM element
 * and start a loop 30 times / second.
 */
const draw = (canvas, ctx) => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  Clock.draw(canvas, ctx)
}

const setup = () => {
  // get canvas from DOM
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // setup the rendering loop
  window.setInterval(() => {
    draw(canvas, ctx)
  }, 1000/60)

  // listener for mouse click
  canvas.addEventListener('click', evt => {
    handleMouseClick(evt, canvas)
  })
}

setup()

/*
 * Cheat sheet
 *
 * Setup Colors
 * ------------
 * ctx.fillStyle = css color | gradient | pattern
 * ctx.strokeStyle = css color | gradient | pattern
 *
 * Setup Shapes
 * ------------
 * ctx.rect(x, y, width, height)          // can use ctx.fillRect to directly fill a rect
 * ctx.arc(x, y, r, startAngle, endAngle) // 0, Math.PI*2 for full circle
 *
 * Setup text
 * ----------
 * ctx.font = '30px Arial'
 * ctx.testAlign = 'center'
 * ctx.fillText('text', x, y)
 * ctx.strokeText('text', x, y)
 *
 * Draw
 * ----
 * ctx.beginPath()
 * ctx.moveTo(x, y) // move cursor without drawing
 * ctx.lineTo(x, y) // declare a line to
 * ctx.stroke()     // actually draw lines previously declared
 * ctx.fill()       // fill what was previously declared
 *
 */

