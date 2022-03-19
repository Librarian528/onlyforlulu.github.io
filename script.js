
var canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx1 = canvas.getContext("2d")
var particlesArray1 = []
var fontsize = 24
var str = "吕璐璐李布"
ctx1.font = fontsize + "px Arial"

var count = 100

var fb = document.getElementById("fb")
fb.width = window.innerWidth
fb.height = window.innerHeight
var ctx1fb = fb.getContext("2d")
for (var i = 0; i < fb.height; i += 3) {
    ctx1fb.moveTo(0, i)
    ctx1fb.lineTo(canvas.width, i)
    ctx1fb.stroke()
}
class Particle1{
    constructor() {
        this.x = (Math.random() * (canvas.width / 24) | 0) * 24
        this.y = Math.random() * canvas.height
        this.size = fontsize
    }
    update() {
        this.y += this.size
    }
    draw() {
        ctx1.fillStyle = "lightblue"
        ctx1.fillText(str[Math.random() * str.length | 0], this.x, this.y)
    }
}

function init1() {
    for (var i = 0; i < count; i++) {
        particlesArray1.push(new Particle1())
    }
}

function draw1() {
    ctx1.globalAlpha = 0.1
    ctx1.fillStyle = "rgb(0,0,0)"
    ctx1.fillRect(0, 0, canvas.width, canvas.height)
    ctx1.globalAlpha = 1
    for (var i = 0; i < particlesArray1.length; i++) {
        particlesArray1[i].update()
        particlesArray1[i].draw()
        if (particlesArray1[i].y > canvas.height) {
            particlesArray1[i].y = 0
            particlesArray1[i].x = (Math.random() * (canvas.width / 24) | 0) * 24
        }
    }
}


init1()
setInterval(draw1, 100)
var canvas = document.getElementById("canvas1")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")
var strs = ["璐璐", "这里是","网上","你专属的", "坐标哦！","璐璐","璐璐","我们一起","看烟花吧!","璐璐", "我会", "一直","喜欢你！"]
var textcanvas = document.createElement("canvas")
var tctx = textcanvas.getContext("2d")
var pixs = []
var index = 0
var colors = ["rgba(173,216,230,0.7)"]

function textdata(i) {

    var textsize = check(strs[i])
    textcanvas.width = textsize[0]
    textcanvas.height = textsize[1]
    tctx.clearRect(0, 0, textcanvas.width, textcanvas.height)
    tctx.font = "40px Arial"
    tctx.fillStyle = "white"
    tctx.fillText(strs[i], 0, 40)
    return tctx.getImageData(0, 0, textcanvas.width, textcanvas.height)

}

var particalsArray = []
class Partical {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vy = Math.random() - 1.5
        this.vx = 0.5 - Math.random()
        this.g = 0.01
        this.color = colors[Math.random() * colors.length | 0]
        this.wait = 80
    }
    update() {
        if (this.wait < 0) {
            this.x += this.vx * 2
            this.y += this.vy * 2
            this.vy += this.g
        }
        this.wait--
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

function init() {
    pixs = textdata(index % strs.length)
    for (var i = 0; i < pixs.data.length / 4; i++) {
        if (pixs.data[i * 4 + 3] != 0) {
            x = (i % textcanvas.width) * 5 + (canvas.width - textcanvas.width * 5) / 2
            y = (i / textcanvas.width | 0) * 5 + (canvas.height - textcanvas.height * 5) / 2
            particalsArray.push(new Partical(x, y))
        }
    }
    index++
}


function check(str) {
    var span = document.createElement("span")
    span.className = "check"
    span.textContent = str
    document.body.appendChild(span)
    var w = span.clientWidth
    var h = span.clientHeight
    document.body.removeChild(span)
    return [w, h]
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < particalsArray.length; i++) {
        var partical = particalsArray[i]
        partical.update()
        partical.draw()
        if (partical.y > canvas.height) {
            particalsArray.splice(i, 1)
        }
        if (particalsArray.length == 0) {
            init()
        }
    }
}
init()
setInterval(draw, 10);
