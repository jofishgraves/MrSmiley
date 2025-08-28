"use strict"

//Canvas properities
let canvas = new Canvas("holder", 500, 500)
let ctx = canvas.ctx
let animate = false

//world position coordinates
let world_X = 0
let worldRotation = 0

//objects
let mrSmiley = new MrSmiley()
let house = new House(-250,-200)
let school = new School(3070,-200)
let fence = new Fence(-105,-100)
let stars = []
let couple = [new MovingSmiley(800,-10,"cyan",1), new MovingSmiley(850,-10,"pink",0.9), new Heart(825,40,0.5), new Heart(850, 50, 0.4)]
let seesaw = [new SeesawBase(1300,-150), new Seesaw(1350,-100,0), new SeesawSmiley(1295,0,"green", false), new SeesawSmiley(1405,0,"orange", true)]
let swing = [new Swing(1900,40, -90), new SwingSmiley(1900,0,"purple",0), new SwingBase(1900,-150)]
let timer = null

/**
 * Initializes the star randomization
 */
function InitStars() 
{
    let rand_x, rand_y, rand_sca, rand_rot

    for(let i = 0; i < 100; i++)
    {
        //Calculates the randomness of the stars
        rand_x = Math.floor((Math.random() * 3600) - 270)
        rand_y = Math.floor(Math.random() * 495)
        rand_sca = Math.random() * 1
        rand_rot = Math.floor(Math.random() * 360)

        stars.push(new Star(rand_x, rand_y, rand_sca, rand_rot))
    }
}

/**
 * Displays and animates(if on) an object 
 * @param {*} object the object passed through
 */
function Display(object)
{
    if(animate)
    {
        object.Next()
    }

    object.Display(ctx)
}

/**
 * Draws the entire scene in the viewport
 */
function DrawScene()
{
    canvas.Clear()

    DrawBackground(ctx)

    ctx.save()

    //Draw all stars
    for(let i = 0; i < stars.length; i++)
    {
        stars[i].SetPos(world_X,0)
        stars[i].SetScale(0.5)
        stars[i].SetRotate(0)
        Display(stars[i])
    }

    //Drawing fence
    fence.SetPos(world_X,0)
    Display(fence)

    //Drawing couple
    for(let i = 0; i < couple.length; i++)
    {
        couple[i].SetPos(world_X,0)
        couple[i].SetScale()
        Display(couple[i])
    }
    
    //Drawing Seesaw
    for(let i = 0; i < seesaw.length; i++)
    {
        seesaw[i].SetPos(world_X,0)
        seesaw[i].SetRotate(0)
        Display(seesaw[i])
    }

    //Drawing Swing
    for(let i = 0; i < swing.length; i++)
    {
        swing[i].SetPos(world_X,0)
        swing[i].SetRotate(0)
        Display(swing[i])
    }

    //Drawing house
    house.SetPos(world_X,0)
    Display(house)

    ///Drawing school
    school.SetPos(world_X,0)
    Display(school)

    ctx.restore()
    
    //Drawing Mr Smiley
    Display(mrSmiley)
}

/**
 * Gets the key pressed on the canvas
 * @param {*} event the event called
 */
function GetKeyPress(event)
{
    switch(event.key)
    {
        case "s":
            // Move Left
            if(world_X > -3000)
            {
                world_X -= 20
            }
            break
        case "a":
            // Move Right
            if(world_X < 0)
            {
                world_X += 20   
            }
            break
        case "g":
            //toggle animation

            if(!animate)
            {
                animate = true
            }
            else
            {
                animate = false
            }

            console.log(animate)

            break

        case "r":
            PressedReset()
            break
    }
}

/**
 * Responsible for each tick in the interval
 */
function Tick()
{
    DrawScene()
}

//Initialization
canvas.AddListener("keydown", GetKeyPress)
InitStars()
timer = setInterval(Tick,60)