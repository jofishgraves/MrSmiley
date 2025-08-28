"use strict"
/*
 * A class to define the 2D canvas
 */
class Canvas
{
    //Properites
    #context
    #width
    #canvas
    #height

    /*
     * The constructor for the canvas
     */
    constructor(canvasId, w, h)
    {

        this.#width = w
        this.#height = h

        //Canvas properities
        this.#canvas = document.createElement("canvas")
        this.#canvas.height = h
        this.#canvas.width = w
        this.#canvas.style = "border: 1px solid black;"

        //Is needed to allow key press events
        this.#canvas.tabIndex = 0;

        let location = document.getElementById(canvasId)
        location.appendChild(this.#canvas)
        
        this.#context = this.#canvas.getContext("2d")
    }

    //Methods
    Clear()
    {
        this.#context.clearRect(0, 0, this.#width, this.#height)
    }

    /*
    * Adds an event listener to the canvas element
    */
    AddListener(event, call)
    {
        this.#canvas.addEventListener(event, call)
    }

    ///Get and set values
    get Width()
    {
        return this.#width
    }

    set Width(value)
    {
        this.#width = value
    }

    get Height()
    {
        return this.#height
    }

    set Height(value)
    {
        this.#height = value
    }

    get ctx()
    {
        return this.#context
    }

}

/*
* a class that holds the logic for any dynamic object
*/
class DynamicObject
{
    //constructor
    constructor(cx, cy, color)
    {
    }

    //Methods
    SetPos(x,y)
    {
    }

    SetScale(scale)
    { 
    }

    SetRotate(theta)
    {
    }

    Reset()
    {
    }

    Next()
    {
    }

    Display(ctx)
    {
    }

    Reset()
    {
    }
}

/*
* A class to define MrSmiley
*/
class MrSmiley extends DynamicObject
{
    //Methods
    /**
     * Displays the sprite on the screen
     * @param {*} ctx the canvas context
     */
    Display(ctx)
    {
            //draw face
            ctx.strokeStyle = "rgb(0,0,0)"
            ctx.fillStyle = "yellow"
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.arc(250, 320, 30, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
    
            ctx.strokeStyle = "rgb(0,0,0)"
            ctx.fillStyle = "black"
            ctx.beginPath()
            ctx.arc(260, 325, 10, 0, Math.PI)
            ctx.fill()
            ctx.stroke()
    
            ctx.strokeStyle = "rgb(0,0,0)"
            ctx.fillStyle = "rgb(0,0,0)"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(235, 308, 5, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
    
            ctx.strokeStyle = "rgb(0,0,0)"
            ctx.fillStyle = "rgb(0,0,0)"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(265, 313, 5, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
    
            //draw body
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(250,350)
            ctx.lineTo(250,430)
            ctx.stroke()
    
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(230,370)
            ctx.lineTo(270,370)
            ctx.stroke()
    
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(250,430)
            ctx.lineTo(230,450)
            ctx.stroke()
            
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(250,430)
            ctx.lineTo(270,450)
            ctx.stroke()
    }
}

/**
 * A class that is used to define smiles moving in square
 */
class MovingSmiley extends DynamicObject
{
    #xpos
    #ypos
    #color
    #scale
    #moveBackwards
    #endpoint
    #startpoint
    #moveY
    #moveUp
    #initX
    #initY

    /**
     * Constructor for the Moving Smiley class
     * @param {*} cx the canvas x position
     * @param {*} cy the canvas y position
     * @param {*} color The color of the character's face
     * @param {*} sca the scale of the character
     */
    constructor(cx,cy,color,sca)
    {
        super(cx,cy,color)
        this.#xpos = cx
        this.#ypos = cy
        this.#color = color
        this.#scale = sca
        this.#moveBackwards = false
        this.#moveY = false
        this.#startpoint = cx
        this.#endpoint = cx + 200
        this.#moveUp = 0
        this.#initX = cx
        this.#initY = cy
    }

    //Methods
    /**
     * Resets the position of the moving smiley
     */
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
        this.#moveBackwards = false
        this.#moveY = false
        this.#moveUp = 0
        this.#startpoint = this.#initX
        this.#endpoint = this.#initX + 200
    }

    /**
     * Goes to the next animation frame
     */
    Next()
    {
        if(!(this.#moveY))
        {
            if(this.#moveBackwards)
            {
                this.#xpos--
            }
            else
            {
                this.#xpos++
            }

            if(this.#xpos >= this.#endpoint)
            {
                this.#moveBackwards = true
                this.#moveY = true
            }
            else if(this.#xpos <= this.#startpoint)
            {
                this.#moveBackwards = false
                this.#moveY = true
            }

        }
        else
        {
            /*
            * Vertical Movement logic
            * 0 = undecided movement
            * 1 = moving up
            * 2 = moving down
            */
            if(this.#ypos == -50 || this.#moveUp == 1)
            {
                this.#moveUp = 1
                this.#ypos++

                if(this.#ypos == -10)
                {
                    this.#moveY = false
                    this.#moveUp = 0
                }
            }
            else if(this.#ypos == -10 || this.#moveUp == 2)
            {
                this.#moveUp = 2
                this.#ypos--

                if(this.#ypos == -50)
                {
                    this.#moveY = false
                    this.#moveUp = 0
                }
            }
        }
    }

    /**
     * Sets the scale of the character
     */
    SetScale()
    {
        ctx.scale(this.#scale, this.#scale)
    }

    /**
     * Sets the position of the smiley
     * @param {*} x x position
     * @param {*} y y position
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the smiley
     * @param {*} ctx the canvas context
     */
    Display(ctx)
    {
        //draw face
        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = this.#color
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(0, 0, 30, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(5, -10, 10, Math.PI, 0)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(10, 5, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(-10, 5, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        //draw body
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-30)
        ctx.lineTo(0,-100)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(-20,-50)
        ctx.lineTo(20,-50)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-100)
        ctx.lineTo(20,-120)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-100)
        ctx.lineTo(-20,-120)
        ctx.stroke()
    }

    //Get and set values
    get xpos()
    {
        return this.#xpos
    }

    get ypos()
    {
        return this.#ypos
    }

    get moveBackwards()
    {
        return this.#moveBackwards
    }

    get moveY()
    {
        return this.#moveY
    }
}

/**
 * A class for the heart object
 */
class Heart extends DynamicObject
{
    #xpos
    #ypos
    #scale
    #scaleUp
    #initScale
    #startY
    #initX
    #initY

    /**
     * The constructor for the heart
     * @param {*} cx canvas x position
     * @param {*} cy canvas y position
     * @param {*} sca starting scale
     */
    constructor(cx,cy,sca)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#scale = sca
        this.#scaleUp = false
        this.#initScale = sca
        this.#startY = cy + 10
        this.#initX = cx
        this.#initY = cy
    }
    
    //Methods

    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
        this.#scale = this.#initScale
        this.#startY = this.#initY + 10
        this.#scaleUp = false
    }

    /**
     * Plays the next frame of the animation
     */
    Next()
    {
        if(!couple[0].moveY)
        {
            if(couple[0].moveBackwards)
            {
                this.#xpos--
            }
            else
            {
                this.#xpos++
            }
        }
           
        this.#ypos = couple[0].ypos + this.#startY

        if(this.#scale <= 0.1)
        {
            this.#scaleUp = true
        }
        else if(this.#scale >= this.#initScale)
        {
            this.#scaleUp = false
        }

        if(this.#scaleUp)
        {
            this.#scale += 0.03
        }
        else
        {
            this.#scale -= 0.03
        }
    }
    
    /**
     * Sets the position of the heart
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Sets the scale of the heart
     */
    SetScale()
    {
        ctx.scale(this.#scale, this.#scale)
    }

    /**
     * Displays the heart
     * @param {*} ctx the canvas context
     */
    Display(ctx)
    {
        ctx.strokeStyle = "red"
        ctx.fillStyle = "red"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(-10,0,12,0,Math.PI * 2)
        ctx.arc(10,0,12,0,Math.PI * 2)
        ctx.fill()
        ctx.moveTo(22,-4)
        ctx.lineTo(0,-30)
        ctx.lineTo(-22,-4)
        ctx.lineTo(22,-5)
        ctx.fill()
        ctx.stroke()
    }

}

/**
 * A smiley object that is made only for the seesaw object
 */
class SeesawSmiley extends DynamicObject
{
    #xpos
    #ypos
    #color
    #scale
    #invertY
    #initX
    #initY

    /**
     * The constructor the seesaw smiley
     * @param {*} cx canvas x coordinate
     * @param {*} cy canvas y coordinate
     * @param {*} color color of the face
     * @param {*} iy If Y needs to be inverted (Important for which end of the seesaw this smiley is on)
     */
    constructor(cx,cy,color,iy)
    {
        super(cx,cy,color)
        this.#xpos = cx
        this.#ypos = cy
        this.#color = color
        this.#invertY = iy
        this.#initX = cx
        this.#initY = cy
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
    }

    /**
     * Gets the next frame of the smiley
     */
    Next()
    {
        if(seesaw[1].rotateUP)
        {
            if(this.#invertY)
            {
                this.#ypos++
                this.#xpos += 0.3
            }
            else
            {
                this.#ypos--
                this.#xpos -= 0.3
            }
            
        }
        else
        {
            if(this.#invertY)
            {
                this.#ypos--
                this.#xpos -= 0.3
            }
            else
            {
                this.#ypos++
                this.#xpos += 0.3
            }
        }
    }

    /**
     * Gets the scale of the smiley
     */
    SetScale()
    {
        ctx.scale(this.#scale, this.#scale)
    }

    /**
     * Gets the position of the smiley
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the smiley
     * @param {*} ctx canvas context
     */
    Display(ctx)
    {
        //draw face
        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = this.#color
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(0, 0, 30, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(5, -10, 10, Math.PI, 0)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(10, 5, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(-10, 5, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        //draw body
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-30)
        ctx.lineTo(0,-100)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(-20,-50)
        ctx.lineTo(20,-50)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-100)
        ctx.lineTo(20,-120)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-100)
        ctx.lineTo(-20,-120)
        ctx.stroke()
        
    }
}

/**
 * A class that is made for a smiley only to be used on the swing
 */
class SwingSmiley extends DynamicObject
{
    #xpos
    #ypos
    #color
    #scale
    #theta
    #initX
    #initY

    /**
     * Constructor for the swing smiley
     * @param {*} cx canvas x coordinate
     * @param {*} cy canvas y coordinate
     * @param {*} color face color
     * @param {*} r rotation
     */
    constructor(cx,cy,color,r)
    {
        super(cx,cy,color)
        this.#xpos = cx
        this.#ypos = cy
        this.#color = color
        this.#theta = r
        this.#initX = cx
        this.#initY = cy
    }
    
    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
        this.#theta = 0
    }
    /**
     * Gets the next animation frame
     */
    Next()
    {
        //Character rotation(to inmitate the swinging effect)
        if(swing[0].rotateUP)
        {
            this.#theta -= 1
        }
        else
        {
            this.#theta += 1
        }

        //Calculates the polar coordinate of the swing
        this.#xpos = swing[0].xpos + 150 * Math.cos(swing[0].theta * Math.PI/180)
        this.#ypos = (swing[0].ypos + 100) + 150 * Math.sin(swing[0].theta * Math.PI/180)
    }

    /**
     * Sets the rotation of the swing
     */
    SetRotate(theta)
    {
        ctx.rotate(this.#theta * Math.PI/180)
    }

    /**
     * Sets the scale of the smiley
     */
    SetScale()
    {
        ctx.scale(this.#scale, this.#scale)
    }

    /**
     * Sets the position of the smiley
     * @param {*} x x coordinate 
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the smiley
     * @param {*} ctx 
     */
    Display(ctx)
    {
        //draw face
        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = this.#color
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(0, 0, 30, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(5, -10, 10, Math.PI, 0)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(10, 5, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "rgb(0,0,0)"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(-10, 5, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        //draw body
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-30)
        ctx.lineTo(0,-100)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(-20,-50)
        ctx.lineTo(20,-50)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-100)
        ctx.lineTo(20,-120)
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,-100)
        ctx.lineTo(-20,-120)
        ctx.stroke()
        
    }
}

/**
 * A class made for the house object
 */
class House extends DynamicObject
{
    #xpos
    #ypos
    #initX
    #initY

    /**
     * The constructor for the house
     * @param {*} cx canvas x coordinate
     * @param {*} cy canvas y coordinate
     */
    constructor(cx, cy)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#initX = cx
        this.#initY = cy
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
    }

    /**
     * Sets the position for the house
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the house
     * @param {*} ctx 
     */
    Display(ctx)
    {
        ctx.strokeStyle = "black"
        ctx.fillStyle = "green"
        ctx.lineWidth = 2
        ctx.moveTo(0,250)
        ctx.lineTo(200,250)
        ctx.lineTo(0,350)
        ctx.lineTo(0,250)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.fillStyle = "red"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(0,250)
        ctx.lineTo(150,250)
        ctx.lineTo(150,0)
        ctx.lineTo(0,0)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.fillStyle = "cyan"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(15,80)
        ctx.lineTo(15,150)
        ctx.lineTo(95,150)
        ctx.lineTo(95,80)
        ctx.lineTo(15,80)
        ctx.fill()
        ctx.stroke()

    }
}

/**
 * A class that represents the school
 */
class School extends DynamicObject
{
    #xpos
    #ypos
    #initX
    #initY

    /**
     * A constructor for the house
     * @param {*} cx canvas x position
     * @param {*} cy canvas y position
     */
    constructor(cx, cy)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#initX = cx
        this.#initY = cy
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
    }

    /**
     * Sets the position of the house
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the house
     * @param {*} ctx canvas context
     */
    Display(ctx)
    {
        ctx.strokeStyle = "black"
        ctx.fillStyle = "blue"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(0,250)
        ctx.lineTo(200,250)
        ctx.lineTo(200,0)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.fillStyle = "cyan"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(15,80)
        ctx.lineTo(15,150)
        ctx.lineTo(95,150)
        ctx.lineTo(95,80)
        ctx.lineTo(15,80)
        ctx.fill()
        ctx.stroke()
    }
}

/**
 * A class that represent the fence
 */
class Fence extends DynamicObject
{
    #xpos
    #ypos
    #initX
    #initY

    /**
     * The constructor for the fence
     * @param {*} cx canvas x position
     * @param {*} cy canvas y position
     */
    constructor(cx, cy)
    {
        super(cx, cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#initX = cx
        this.#initY = cy
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
    }

    /**
     * Sets the position of the fence
     * @param {*} x 
     * @param {*} y 
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the fence
     * @param {*} ctx canvas context
     */
    Display(ctx)
    {
        //Made a for loop to make one long fence so that there is no need to make multiple instances of the fence
        //Each fence is distanced by 100 pixels
        let startPos = 0

        for(let i = 0; i < 32; i++)
        {
            ctx.strokeStyle = "black"
            ctx.fillStyle = "brown"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(0+startPos,0)
            ctx.lineTo(0+startPos,80)
            ctx.lineTo(20+startPos,80)
            ctx.lineTo(20+startPos,0)
            ctx.lineTo(0+startPos, 0)
            ctx.fill()
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(20+startPos,15)
            ctx.lineTo(100+startPos,15)
            ctx.lineTo(100+startPos,30)
            ctx.lineTo(20+startPos,30)
            ctx.fill()
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(20+startPos,45)
            ctx.lineTo(100+startPos,45)
            ctx.lineTo(100+startPos,60)
            ctx.lineTo(20+startPos,60)
            ctx.fill()
            ctx.stroke()

            startPos += 100
        }
    }
}

/**
 * A class that handles the stars in the sky
 */
class Star extends DynamicObject
{
    #xpos
    #ypos
    #scale
    #initScale
    #scaleUp
    #theta
    #initX
    #initY
    #startSca
    #initTheta

    /**
     * A constructor for the star
     * @param {*} cx canvas x position 
     * @param {*} cy canvas y position
     * @param {*} sca starting scale
     * @param {*} r starting rotation
     */
    constructor(cx,cy,sca, r)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#initScale = 1
        this.#scale = sca
        this.#scaleUp = false
        this.#theta = r
        this.#initX = cx
        this.#initY = cy
        this.#startSca = sca
        this.#initTheta = r
    }

    //Methods

    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
        this.#scale = this.#startSca
        this.#theta = this.#initTheta
        this.#scaleUp = false
    }

    /**
     * Gets the next frame for the star
     */
    Next()
    {
        if(this.#scale <= 0)
        {
            this.#scaleUp = true
        }
        else if(this.#scale >= this.#initScale)
        {   
            this.#scaleUp = false
        }

        if(this.#scaleUp)
        {
            this.#scale += 0.1
        }
        else
        {
            this.#scale -= 0.1
        }

        this.#theta += 2
    }

    /**
     * Sets the rotation of the star
     */
    SetRotate(theta)
    {
        ctx.rotate(this.#theta * Math.PI/180)
    }

    /**
     * Sets the position of the star
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Sets the scale of the star
     * @param {*} scale world scale
     */
    SetScale(scale)
    {
        ctx.scale(this.#scale + scale, this.#scale + scale)
    }

    /**
     * Displays the star
     * @param {*} ctx canvas context
     */
    Display(ctx)
    {
        let r = 10
        let x, y, t

        let a = 2*Math.PI/5
        let b = Math.PI/2
    
        let sides = [0,2,4,1,3]
    
        t = 0
        
        ctx.strokeStyle = "yellow"
        ctx.lineWidth = 2
        ctx.beginPath()
        let sx = r*Math.cos(b)
        let sy = r*Math.sin(a)
    
        ctx.moveTo(sx, sy)
    
        for(let i = 1; i <= 5; i++)
        {
            x = r*Math.cos(sides[i] * a + b)
            y = r*Math.sin(sides[i] * a + b)
    
            ctx.lineTo(x, y)
        }
    
        ctx.lineTo(sx,sy)
    
        ctx.stroke()
    }
}

/**
 * A class for the base of the seesaw
 */
class SeesawBase extends DynamicObject
{  
    #xpos
    #ypos
    #initX
    #initY
    
    /**
     * A constructor for the seesaw base
     * @param {*} cx canvas x position 
     * @param {*} cy canvas y position
     */
    constructor(cx,cy)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#initX = cx
        this.#initY = cy
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
    }

    /**
     * Sets the position of the seesaw base
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the seesaw base
     * @param {*} ctx canvas context
     */
    Display(ctx)
    {
        ctx.strokeStyle = "black"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(100,0)
        ctx.lineTo(50,50)
        ctx.lineTo(0,0)
        ctx.fill()
        ctx.stroke()
    }
}

/**
 * A class that defines the seesaw
 */
class Seesaw extends DynamicObject
{
    #xpos
    #ypos
    #theta
    #rotateUp
    #initX
    #initY
    #initTheta

    /**
     * A constructor for the seesaw
     * @param {*} cx canvas x position
     * @param {*} cy canvas y position
     * @param {*} r starting rotation
     */
    constructor(cx,cy,r)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#theta = r
        this.#rotateUp = false
        this.#initX = cx
        this.#initY = cy
        this.#initTheta = r
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
        this.#theta = this.#initTheta
        this.#rotateUp = false
    }

    /**
     * Gets the next frame of the seesaw
     */
    Next()
    {
        if(Math.abs(this.#theta) == 15) //Will rotate in the other direction if 15 degrees
        {
            if(this.#rotateUp)
            {
                this.#rotateUp = false
            }
            else
            {
                this.#rotateUp = true
            }
        }

        //Handles the rotation
        if(this.#rotateUp)
        {
            this.#theta++
        }
        else
        {
            this.#theta--
        }
    }

    /**
     * Sets the rotation of the seesaw
     */
    SetRotate(theta)
    {
        ctx.rotate(this.#theta * Math.PI/180)
    }

    /**
     * Sets the position of the seesaw
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the seesaw
     * @param {*} ctx canvas context
     */
    Display(ctx)
    {
        ctx.strokeStyle = "black"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(-75,0)
        ctx.lineTo(75,0)
        ctx.stroke()
    }

    //Get and set values
    get rotateUP()
    {
        return this.#rotateUp
    }
}

/**
 * A class that handles the base of the swing
 */
class SwingBase extends DynamicObject
{
    #xpos
    #ypos
    #initX
    #initY

    /**
     * The constructor for the swing base
     * @param {*} cx canvas x position
     * @param {*} cy canvas y position
     */
    constructor(cx,cy)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#initX = cx
        this.#initY = cy
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
    }

    /**
     * Sets the position of the swing base
     * @param {*} x x position
     * @param {*} y y position
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Displays the swing base
     * @param {*} ctx canvas context
     */
    Display(ctx)
    {
        ctx.strokeStyle = "black"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(0,200)
        ctx.lineTo(100,0)
        ctx.moveTo(0,200)
        ctx.lineTo(-100,0)
        ctx.fill()
        ctx.stroke()
    }
}

/**
 * A class that handles the swing
 */
class Swing extends DynamicObject
{
    #xpos
    #ypos
    #theta
    #rotateUp
    #initX
    #initY
    #initTheta

    /**
     * Constructor for the swing
     * @param {*} cx canvas x position
     * @param {*} cy canvas y position
     * @param {*} r starting rotation
     */
    constructor(cx,cy,r)
    {
        super(cx,cy)
        this.#xpos = cx
        this.#ypos = cy
        this.#theta = r
        this.#rotateUp = false
        this.#initX = cx
        this.#initY = cy
        this.#initTheta = r
    }

    //Methods
    Reset()
    {
        this.#xpos = this.#initX
        this.#ypos = this.#initY
        this.#theta = this.#initTheta
        this.#rotateUp = false
    }

    /**
     * Gets the next animation frame
     */
    Next()
    {
        if(Math.abs(this.#theta) >= 140 || Math.abs(this.#theta) <= 40) //rotates based on a constrained range
        {
            if(this.#rotateUp)
             {
                this.#rotateUp = false
            }
            else
            {
                this.#rotateUp = true
            }
        }
    
        if(this.#rotateUp)
        {
            this.#theta += 10
        }
        else
        {
            this.#theta -= 10
        }
    }

    /**
     * Sets the position of the swing
     * @param {*} x x coordinate
     * @param {*} y y coordinate
     */
    SetPos(x,y)
    {
        ctx.setTransform(1,0,0,-1,0,canvas.Height)
        ctx.translate(canvas.Width/2, canvas.Height/2)

        ctx.translate(this.#xpos+x, this.#ypos+y)
    }

    /**
     * Sets the rotation of the swing
     */
    SetRotate(theta)
    {
        ctx.rotate(this.#theta * Math.PI/180)
    }

    /**
     * Displays the swing
     * @param {*} ctx canvas context 
     */
    Display(ctx)
    {
        ctx.strokeStyle = "black"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(150,0)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "black"
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(150,20)
        ctx.lineTo(150,-20)
        ctx.fill()
        ctx.stroke()
    }

    //Get and set values
    get rotateUP()
    {
        return this.#rotateUp
    }

    get theta()
    {
        return this.#theta
    }

    get xpos()
    {
        return this.#xpos
    }

    get ypos()
    {
        return this.#ypos
    }
}

//Static Objects
/**
 * Draws the background of the world
 * @param {*} ctx canvas context
 */
function DrawBackground(ctx)
{
    //Draws sky
    ctx.lineWidth = 500
    ctx.beginPath();
    ctx.strokeStyle = "rgb(40,49,64)";
    ctx.moveTo(0,250);
    ctx.lineTo(500,250);
    ctx.stroke();

    //Draws ground
    ctx.lineWidth = 250
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,255,0)";
    ctx.moveTo(0,450);
    ctx.lineTo(500,450);
    ctx.stroke();
}

/**
 * Resets all object positions
 */
function PressedReset()
{
    world_X = 0
    worldRotation = 0

    house.Reset()
    school.Reset()
    fence.Reset()

    for(let i = 0; i < stars.length; i++)
    {
        stars[i].Reset()
    }

    for(let i = 0; i < couple.length; i++)
    {
        couple[i].Reset()
    }

    for(let i = 0; i < seesaw.length; i++)
    {
        seesaw[i].Reset()
    }

    for(let i = 0; i < swing.length; i++)
    {
        swing[i].Reset()
    }
}
