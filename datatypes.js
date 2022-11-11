
class Component {
    Position
    Scale

    constructor() {
        this.Position = new Vector2()
        this.Scale = new Vector2()
    }

    GetPosition() {
        return new Vector2(this.Position.x * XScaleFactor, this.Position.y * YScaleFactor)
    }
    GetWidth() {
        return this.Scale.x * XScaleFactor
    } 

    GetHeight() {
        return this.Scale.y * YScaleFactor
    }
    
    Draw() {}
    Selected() {}
}

class Cup extends Component {
    selected = false
    hasBall = false
    img = new Image()
    #oldPosition = 0
    constructor() {
        super()
    }

    Reset() {
        console.log(this.#oldPosition, this.Position)
        this.Position = this.#oldPosition
    }
    Save() {
        this.#oldPosition = new Vector2(this.Position.x, this.Position.y)
    }
    Selected() {
        console.log((new Date()).getDate())
        playAnimation = true
        if (this.hasBall) {
            const date = new Date(Date.now())
            if (date.getMonth() == "10" && date.getDate() == "12") {
                alert("you found the ball! \n andddd happy birthday lil rawa \n congratz for reaching so far \n you have done more than enough so far and i am so sure you will do even more amazing in future!! \n best of my hope and wishes Hedari~")
            } else {
                alert("you found the ball!!")
            }
        } else {
            alert("it doesn't have the ball :(")
        }
    }

    Draw() {
        ctx.save() 
        ctx.fillStyle = "orange"
        if (this.hasBall) {
            ctx.beginPath()
            const r = 25
            console.log(this.GetWidth() / 2, this.GetWidth())
            ctx.arc((this.GetPosition().x + (Math.floor(this.GetWidth() / 2))),
                    (this.#oldPosition.y * YScaleFactor + this.GetHeight() - r), r, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.fill()
        }
        ctx.restore()
        const position = this.GetPosition()
        const width = this.GetWidth()
        const height = this.GetHeight()
        ctx.drawImage(this.img, position.x, position.y, width, height)
        
    }

}



class Vector2 {
    x
    y
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y 
    }

    Set(x = this.x,  y = this.y) {
        this.x = x
        this.y = y
    }
}
