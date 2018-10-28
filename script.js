class Clock {
  static draw(canvas, ctx) {
    const spacing = canvas.width / 59;

    ctx.save()
    ctx.translate(0, (canvas.height - spacing) / 2);

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
    for (let unit = 1; unit <= u; unit++) {
      ctx.fillRect(x, height, spacing - 1, spacing)
      x += spacing
    }
  }
}

class Clock2 {
  static draw(canvas, ctx) {
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)

    const hourSpacing = 86400 * canvas.width

    // draw 12 hour marks
    for (let i = 1; i <= 12; i++) {
      ctx.strokeStyle = 'DimGray'
      ctx.beginPath()
      ctx.setLineDash([3, 15])
      ctx.arc(0, 0, i * 3600 / 86400 * canvas.width, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
    }

    const time = new Date()
    const h = time.getHours() % 12 * 3600
    const m = time.getMinutes() * 60
    const s = time.getSeconds()
    const ts = h + m + s

    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.arc(0, 0, ts / 86400 * canvas.width, 0, Math.PI * 2)
    ctx.stroke()

    ctx.restore()
  }
}

class Clock3 {
  static draw(canvas, ctx) {
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)

    const time = new Date()
    const h = time.getHours() % 12 * 3600
    const m = time.getMinutes() * 60
    const s = time.getSeconds()
    const ts = h + m + s

    const arcCircumference = 2 * Math.PI * (canvas.width / 3)
    const dotSpacing = arcCircumference / (24 * 6)
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.setLineDash([1, dotSpacing])
    ctx.arc(0, 0, canvas.height/3, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.strokeStyle = 'blue'
    ctx.rotate((ts / 86400) * (Math.PI * 2))
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -canvas.height/3);
    ctx.stroke();
    ctx.restore()
  }
}

class Clock4 {
  static draw(canvas, ctx) {
    ctx.save()

    const time = new Date()
    const h = ('0'  + time.getHours()).slice(-2)
    const m = ('0' + time.getMinutes()).slice(-2)
    const s = ('0' + time.getSeconds()).slice(-2)
    const hex = h + m + s

    ctx.fillStyle = '#' + hex
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#' + hex.slice(-2) + hex.slice(0, -2)
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('#' + hex, canvas.width/2, canvas.height/2)

    ctx.restore()
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
const draw = (canvas, ctx, canvas2, ctx2, canvas3, ctx3, canvas4, ctx4) => {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx2.fillStyle = 'black'
  ctx2.fillRect(0, 0, canvas2.width, canvas2.height)

  ctx3.fillStyle = 'black'
  ctx3.fillRect(0, 0, canvas3.width, canvas3.height)
  
  Clock.draw(canvas, ctx)
  Clock2.draw(canvas2, ctx2)
  Clock3.draw(canvas3, ctx3)
  Clock4.draw(canvas4, ctx4)
}

const setup = () => {
  // get canvas from DOM
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const canvas2 = document.getElementById('canvas2')
  const ctx2 = canvas2.getContext('2d')

  const canvas3 = document.getElementById('canvas3')
  const ctx3 = canvas3.getContext('2d')

  const canvas4 = document.getElementById('canvas4')
  const ctx4 = canvas4.getContext('2d')

  // setup the rendering loop
  window.setInterval(() => {
    draw(canvas, ctx, canvas2, ctx2, canvas3, ctx3, canvas4, ctx4)
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

