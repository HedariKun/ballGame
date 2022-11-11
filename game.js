const [width, height] = [600, 800]
/** @type {Component[]} */
const components = []
const MousePosition = new Vector2()

/**@type {[HTMLCanvasElement, CanvasRenderingContext2D]} */
let [canvas, ctx] = []
let XScaleFactor = 1
let YScaleFactor = 1
let clicked = false

let playAnimation = false

function main() {
    canvas = document.getElementById("game")
    ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    XScaleFactor = window.innerWidth / width
    YScaleFactor = window.innerHeight / height

    const imageTag = document.getElementById("cup")
    img = new Image()
    img.src = imageTag.src

    for (let i = 0; i < 3; i ++) {
        const cup = new Cup()
        cup.img = img
        cup.Position.Set(200 * i + 30, 275)
        cup.Scale.Set(150, 130)
        cup.id = i
        components.push(cup)
    }
    setBall()
    requestAnimationFrame(update)
}

function setBall() {
    let index = 0
    const rand = Math.random()
    if (rand < 1/3) {
        index = 0
    } else if (rand < 2/3) {
        index = 1
    } else {
        index = 2
    }
    
    let i = 0
    for (const component of components) {
        component.Save()
        if (i == index) {
            component.hasBall = true
        } else {
            component.hasBall = false
        }
        i++
    }
}

let cupID = 0
let oldPosition = new Vector2()
function update() {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for(const component of components) {
        const position = component.GetPosition()
        if (position.x < MousePosition.x && component.GetWidth() + position.x > MousePosition.x &&
            position.y < MousePosition.y && component.GetHeight() + position.y > MousePosition.y) {
                if (clicked && !playAnimation) {
                    component.Save()
                    cupID = component.id
                    oldPosition = new Vector2()
                    oldPosition.x = component.Position.x
                    oldPosition.y = component.Position.y
                    playAnimation = true
                }   
    }
        if(playAnimation && component.id == cupID) {
            const ballCup = components.filter(x => x.hasBall)[0]
            const position = ballCup.Position
            if(position.y > 225) {
                position.y--
            } else {
                setTimeout(() => {
                    for(const c of components) {
                        c.Position = new Vector2(c.Position.x, oldPosition.y)
                    }
                    component.Selected()
                    setBall()
                    playAnimation = false
                    
                })
            }
        }

        component.Draw()
    }
    if (clicked) {
        clicked = false
    }
    requestAnimationFrame(update)
}


window.addEventListener("load", () => {
    main()
})

window.addEventListener("mousemove", (event) => {
    MousePosition.Set(event.clientX, event.clientY)
})

window.addEventListener("mousedown", () => {
    clicked = true
}) 

window.addEventListener("touchstart", (event) => {
    const Touch = event.touches[0]
    MousePosition.Set(Touch.clientX, Touch.clientY)
    clicked = true
})