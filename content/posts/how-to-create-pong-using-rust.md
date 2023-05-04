+++
title = "How to Create Pong Using Rust"
date = "2023-05-03T17:08:58+07:00"
author = "ManicMarrc"
tags = ["Rust", "Game", "Tutorial"]
keywords = ["Rust", "Game", "Tutorial"]
description = ""
showFullContent = false
readingTime = false
hideComments = false
+++

## Introduction

[Pong](https://en.wikipedia.org/wiki/Pong) is one of the oldest games of all time. Pong is the most popular choice for a beginner game developer to start their game development journey. And in this post, we'll be making it from stratch, specifically using the [Rust](https://www.rust-lang.org/) programming language (no, not the game).

## Required Tools

- [Rust](https://www.rust-lang.org/) (duh)
- [Cargo](https://doc.rust-lang.org/cargo/)

You should also know atleast a little about Rust. If you don't then you should read the [Rust Book](https://doc.rust-lang.org/book/) which is free and online.

## Initializing the project

We're gonna create the project into a folder called `pong-rs` using the command:

```bash
cargo init pong-rs
```

Now, for the game framework, we're gonna use the [Macroquad](https://github.com/not-fl3/macroquad/) crate. Macroquad is my personal favorite for making simple 2D games.   
To use Macroquad, we're gonna add it to our `Cargo.toml` file. For this post we're gonna use version `0.3`.

```toml
[dependencies]
macroquad = "0.3"
```

Now, just build the project:

```bash
cargo build
```

## Creating a window

Open up `src/main.rs` in your favorite IDE and replace everything inside it with:

```rust
use macroquad::prelude::*;

fn window_config() -> Conf {
    Conf {
        window_title: "Pong-rs".to_string(),
        ..Default::default()
    }
}

#[macroquad::main(window_config)]
async fn main() {
    loop {
        clear_background(BLACK);
        next_frame().await;
    }
}
```

Now, run the project and you should get a window!

### Explanation

Just copy and pasting code wouldn't get you far in programming, so lets try to understand it.   
First off,

```rust
use macroquad::prelude::*;
```

Most crates in Rust has a prelude module which includes all the required stuffs to use the crate and this line of code imports everything from it.

```rust
fn window_config() -> Conf {
    Conf {
        window_title: "Pong-rs".to_string(),
        ..Default::default()
    }
}
```

This function returns a config which Macroquad will use when creating a window. You can see more options [here](https://docs.rs/macroquad/0.3.25/macroquad/prelude/struct.Conf.html).

```rust
#[macroquad::main(window_config)]
```

This line of code calls a macro. We don't need to know too much about this macro, just know that it creates a window and initializes the graphics API Macroquad uses. This macro also requires that our `main` function be async.

```rust
async function main() {
    loop {
        ...
    }
}
```

This block of code starts the main game loop. We'll put all the game mechanics like moving the paddle and the ball in the `loop` block.

```rust
clear_background(BLACK);
```

Pretty self-explanatory. Clears the background with the color black.

*Note: We can use `BLACK` directly as we imported it from the `use` statement earlier.*

```rust
next_frame().await;
```

Waits until we can get the next frame we'll draw into.

## Making the paddle

The paddle'll be a struct so that we can use it for both the left and right paddles.

```rust
struct Paddle {
    position: Vec2,
    size: Vec2,
}
```

The position and size member of the struct is a Vec2 or more commonly called a Vector2. The most basic explanaton of a [vector](https://en.wikipedia.org/wiki/Vector_\(mathematics_and_physics\)) is that it's a collection of numbers. A vector can be used for either a coordinate or a direction or anything that needs two numbers.   
For Macroquad, the coordinate system starts from the top-left with coordinate (0, 0) and ends with the bottom-right with coordinate (screen width, screen height).

Lets create all the methods we'll use for this project.

```rust
impl Paddle {
    fn new(position: Vec2, size: Vec2) -> Paddle {
        todo!();
    }

    fn update(&mut self, speed: f32, up_key: KeyCode, down_key: KeyCode) {
        todo!();
    }

    fn draw(&self) {
        todo!();
    }
}
```

### `new`

```rust
fn new(position: Vec2, size: Vec2) -> Paddle {
    Paddle {
        position,
        size,
    }
}
```

### `update`

```rust
fn update(&mut self, speed: f32, up_key: KeyCode, down_key: KeyCode) {
    if is_key_down(up_key) {
        self.position.y -= speed;
    }
    if is_key_down(down_key) {
        self.position.y += speed;
    }
    self.position.y = self.position.y.clamp(0.0, screen_height() - self.size.y);
}
```

#### Explanation

```rust
if is_key_down(up_key) {
    self.position.y -= speed;
}
```

This block of code checks if `up_key` is being held down. If it is, then we move the paddle's position upward by subtracting it's `y` by `speed`. We subtract as Macroquad's y axis is flipped.

```rust
if is_key_down(down_key) {
    self.position.y += speed;
}
```

Same as above but for the down movement.

```rust
self.position.y = self.position.y.clamp(0.0, screen_height() - self.size.y);
```

This line of code limits the paddle's movement. When drawing later on, the rectangle'll start from it's top left, and so we need to limit it's y movement to `0.0` (top) `screen_height() - self.size.y` (bottom) instead of `0.0` and `screen_height()`.

### `draw`

```rust
fn draw(&self) {
    draw_rectangle(self.position.x, self.position.y, self.size.x, self.size.y, WHITE);
}
```

A pretty self-explanatory function. Draws a rectangle at `self.position` with size `self.size`.

## Updating our main function

Lets create the left paddle and right paddle.

```rust
let paddle_size = vec2(20.0, 60.0);
let speed = 10.0;
let mut left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
let mut right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);
```

Don't forget to update and draw them in the game loop!

```rust
left_paddle.update(speed, KeyCode::W, KeyCode::S);
left_paddle.draw();
right_paddle.update(speed, KeyCode::Up, KeyCode::Down);
right_paddle.draw();
```

Now run the project and you should have two paddles movable with the `W`, `S`, `Up`, and `Down` key.

### The code so far

```rust
use macroquad::prelude::*;

fn window_config() -> Conf {
    Conf {
        window_title: "Pong-rs".to_string(),
        ..Default::default()
    }
}

struct Paddle {
    position: Vec2,
    size: Vec2,
}

impl Paddle {
    fn new(position: Vec2, size: Vec2) -> Paddle {
        Paddle {
            position,
            size,
        }
    }

    fn update(&mut self, speed: f32, up_key: KeyCode, down_key: KeyCode) {
        if is_key_down(up_key) {
            self.position.y -= speed;
        }
        if is_key_down(down_key) {
            self.position.y += speed;
        }
        self.position.y = self.position.y.clamp(0.0, screen_height() - self.size.y);
    }

    fn draw(&self) {
        draw_rectangle(self.position.x, self.position.y, self.size.x, self.size.y, WHITE);
    }
}

#[macroquad::main(window_config)]
async fn main() {
    let paddle_size = vec2(20.0, 60.0);
    let speed = 10.0;
    let mut left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
    let mut right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);

    loop {
        clear_background(BLACK);

        left_paddle.update(speed, KeyCode::W, KeyCode::S);
        left_paddle.draw();
        right_paddle.update(speed, KeyCode::Up, KeyCode::Down);
        right_paddle.draw();

        next_frame().await;
    }
}
```

## The ball

Lets also create a struct for the ball.

```rust
struct Ball {
    position: Vec2,
    direction: Vec2,
    size: Vec2,
}
```

Lets also create the needed methods.

```rust
impl Ball {
    fn new(position: Vec2, direction: Vec2, size: Vec2) -> Ball {
        todo!();
    }

    fn update(&mut self, speed: f32, left_paddle: &Paddle, right_paddle: &Paddle) {
        todo!();
    }

    fn colliding(&self, paddle: &Paddle) -> bool {
        todo!();
    }

    fn draw(&self) {
        todo!();
    }
}
```

### `new`

```rust
fn new(position: Vec2, direction: Vec2, size: Vec2) -> Ball {
    Ball {
        position,
        direction,
        size,
    }
}
```

### `update`

```rust
fn update(&mut self, speed: f32, left_paddle: &Paddle, right_paddle: &Paddle) {
    if self.colliding(left_paddle) {
        self.direction.x = 1.0;
    }
    if self.colliding(right_paddle) {
        self.direction.x = -1.0;
    }
    if self.position.y <= 0.0 {
        self.direction.y = 1.0;
    }
    if self.position.y >= screen_height() - self.size.y {
        self.direction.y = -1.0;
    }
    self.position += self.direction * speed;
}
```

A simple function so I'm just gonna gloss over it. Basically, checks if is colliding with a paddle or a wall, and if it is then flip the ball's direction.

### `colliding`

```rust
fn colliding(&self, paddle: &Paddle) -> bool {
    return
        (self.position.x + self.size.x > paddle.position.x && self.position.x < paddle.position.x + paddle.size.x) &&
        (self.position.y + self.size.y > paddle.position.y && self.position.y < paddle.position.y + paddle.size.y);
}
```

### `draw`

```rust
fn draw(&self) {
    draw_rectangle(self.position.x, self.position.y, self.size.x, self.size.y, WHITE);
}
```

## Updating our main function

```rust
use macroquad::rand::gen_range;

let ball_size = vec2(20.0, 20.0);
let mut ball = Ball::new((vec2(screen_width(), screen_height()) - ball_size) / 2.0, vec2(gen_range(0, 2) as f32, gen_range(0, 2) as f32) * 2.0 - 1.0, ball_size);
```

We create the ball with a random direction. Macroquad has a built-in random number generator so we'll use that. We generate a number that is either 0 or 1 (`gen_range` takes an inclusive start and an exclusive end) then multiply it by 2 to get 0 or 2 and then subtract 1 to get either -1 or 1 so that we don't get a 0.

Lets update them in the game loop.

```rust
ball.update(speed / 2.0, &left_paddle, &right_paddle);
ball.draw();
```

We move the ball half as fast as the paddle so that the players actually have a chance of playing.

### The code so far

```rust
use macroquad::prelude::*;

fn window_config() -> Conf {
    Conf {
        window_title: "Pong-rs".to_string(),
        ..Default::default()
    }
}

struct Paddle {
    position: Vec2,
    size: Vec2,
}

impl Paddle {
    fn new(position: Vec2, size: Vec2) -> Paddle {
        Paddle {
            position,
            size,
        }
    }

    fn update(&mut self, speed: f32, up_key: KeyCode, down_key: KeyCode) {
        if is_key_down(up_key) {
            self.position.y -= speed;
        }
        if is_key_down(down_key) {
            self.position.y += speed;
        }
        self.position.y = self.position.y.clamp(0.0, screen_height() - self.size.y);
    }

    fn draw(&self) {
        draw_rectangle(self.position.x, self.position.y, self.size.x, self.size.y, WHITE);
    }
}

struct Ball {
    position: Vec2,
    direction: Vec2,
    size: Vec2,
}

impl Ball {
    fn new(position: Vec2, direction: Vec2, size: Vec2) -> Ball {
        Ball {
            position,
            direction,
            size,
        }
    }
    
    fn update(&mut self, speed: f32, left_paddle: &Paddle, right_paddle: &Paddle) {
        if self.colliding(left_paddle) {
            self.direction.x = 1.0;
        }
        if self.colliding(right_paddle) {
            self.direction.x = -1.0;
        }
        if self.position.y <= 0.0 {
            self.direction.y = 1.0;
        }
        if self.position.y >= screen_height() - self.size.y {
            self.direction.y = -1.0;
        }
        self.position += self.direction * speed;
    }
    
    fn colliding(&self, paddle: &Paddle) -> bool {
        return
            (self.position.x + self.size.x > paddle.position.x && self.position.x < paddle.position.x + paddle.size.x) &&
            (self.position.y + self.size.y > paddle.position.y && self.position.y < paddle.position.y + paddle.size.y);
    }
    
    fn draw(&self) {
        draw_rectangle(self.position.x, self.position.y, self.size.x, self.size.y, WHITE);
    }
}

#[macroquad::main(window_config)]
async fn main() {
    let paddle_size = vec2(20.0, 60.0);
    let speed = 10.0;
    let mut left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
    let mut right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);

    let ball_size = vec2(20.0, 20.0);
    let mut ball = Ball::new((vec2(screen_width(), screen_height()) - ball_size) / 2.0, vec2(gen_range(0, 2) as f32, gen_range(0, 2) as f32) * 2.0 - 1.0, ball_size);

    loop {
        clear_background(BLACK);

        left_paddle.update(speed, KeyCode::W, KeyCode::S);
        left_paddle.draw();
        right_paddle.update(speed, KeyCode::Up, KeyCode::Down);
        right_paddle.draw();

        ball.update(speed / 2.0, &left_paddle, &right_paddle);
        ball.draw();

        next_frame().await;
    }
}
```

## Adding the scores

The last thing we need to finish this project is the scores. Add this code to your main function.

```rust
let mut left_score = 0;
let mut right_score = 0;
```

Now, lets draw them.

```rust
let text_measurement = measure_text(&left_score.to_string(), None, 64, 1.0);
draw_text(&left_score.to_string(), (screen_width() - text_measurement.width) / 2.0 - 100.0, 50.0, 64.0, WHITE);
let text_measurement = measure_text(&right_score.to_string(), None, 64, 1.0);
draw_text(&right_score.to_string(), (screen_width() - text_measurement.width) / 2.0 + 100.0, 50.0, 64.0, WHITE);
```

The [`measure_text`](https://docs.rs/macroquad/0.3.25/macroquad/text/fn.measure_text.html) function returns a [`TextDimensions`](https://docs.rs/macroquad/0.3.25/macroquad/text/struct.TextDimensions.html) which makes it easy to center a text.

Lets update the score if the ball goes outside of the screen.

```rust
if ball.position.x <= 0.0 {
    right_score += 1;
    left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
    right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);
    ball = Ball::new((vec2(screen_width(), screen_height()) - ball_size) / 2.0, vec2(gen_range(0, 2) as f32, gen_range(0, 2) as f32) * 2.0 - 1.0, ball_size);
}
if ball.position.x >= screen_width() - ball.size.x {
    left_score += 1;
    left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
    right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);
    ball = Ball::new((vec2(screen_width(), screen_height()) - ball_size) / 2.0, vec2(gen_range(0, 2) as f32, gen_range(0, 2) as f32) * 2.0 - 1.0, ball_size);
}
```

We check if the ball goes outside of the screen, and if it does, we update the score and reset all the paddles and the ball.

And the project is done!

## The finished code  

```rust
use macroquad::prelude::*;

fn window_config() -> Conf {
    Conf {
        window_title: "Pong-rs".to_string(),
        ..Default::default()
    }
}

struct Paddle {
    position: Vec2,
    size: Vec2,
}

impl Paddle {
    fn new(position: Vec2, size: Vec2) -> Paddle {
        Paddle {
            position,
            size,
        }
    }

    fn update(&mut self, speed: f32, up_key: KeyCode, down_key: KeyCode) {
        if is_key_down(up_key) {
            self.position.y -= speed;
        }
        if is_key_down(down_key) {
            self.position.y += speed;
        }
        self.position.y = self.position.y.clamp(0.0, screen_height() - self.size.y);
    }

    fn draw(&self) {
        draw_rectangle(self.position.x, self.position.y, self.size.x, self.size.y, WHITE);
    }
}

struct Ball {
    position: Vec2,
    direction: Vec2,
    size: Vec2,
}

impl Ball {
    fn new(position: Vec2, direction: Vec2, size: Vec2) -> Ball {
        Ball {
            position,
            direction,
            size,
        }
    }
    
    fn update(&mut self, speed: f32, left_paddle: &Paddle, right_paddle: &Paddle) {
        if self.colliding(left_paddle) {
            self.direction.x = 1.0;
        }
        if self.colliding(right_paddle) {
            self.direction.x = -1.0;
        }
        if self.position.y <= 0.0 {
            self.direction.y = 1.0;
        }
        if self.position.y >= screen_height() - self.size.y {
            self.direction.y = -1.0;
        }
        self.position += self.direction * speed;
    }
    
    fn colliding(&self, paddle: &Paddle) -> bool {
        return
            (self.position.x + self.size.x > paddle.position.x && self.position.x < paddle.position.x + paddle.size.x) &&
            (self.position.y + self.size.y > paddle.position.y && self.position.y < paddle.position.y + paddle.size.y);
    }
    
    fn draw(&self) {
        draw_rectangle(self.position.x, self.position.y, self.size.x, self.size.y, WHITE);
    }
}

#[macroquad::main(window_config)]
async fn main() {
    let paddle_size = vec2(20.0, 60.0);
    let speed = 10.0;
    let mut left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
    let mut right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);

    use macroquad::rand::gen_range;

    let ball_size = vec2(20.0, 20.0);
    let mut ball = Ball::new((vec2(screen_width(), screen_height()) - ball_size) / 2.0, vec2(gen_range(0, 1) as f32, gen_range(0, 1) as f32) * 2.0 - 1.0, ball_size);

    let mut left_score = 0;
    let mut right_score = 0;

    loop {
        clear_background(BLACK);

        left_paddle.update(speed, KeyCode::W, KeyCode::S);
        left_paddle.draw();
        right_paddle.update(speed, KeyCode::Up, KeyCode::Down);
        right_paddle.draw();

        ball.update(speed / 2.0, &left_paddle, &right_paddle);
        ball.draw();

        let text_measurement = measure_text(&left_score.to_string(), None, 64, 1.0);
        draw_text(&left_score.to_string(), (screen_width() - text_measurement.width) / 2.0 - 100.0, 50.0, 64.0, WHITE);
        let text_measurement = measure_text(&right_score.to_string(), None, 64, 1.0);
        draw_text(&right_score.to_string(), (screen_width() - text_measurement.width) / 2.0 + 100.0, 50.0, 64.0, WHITE);

        if ball.position.x <= 0.0 {
            right_score += 1;
            left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
            right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);
            ball = Ball::new((vec2(screen_width(), screen_height()) - ball_size) / 2.0, vec2(gen_range(0, 2) as f32, gen_range(0, 2) as f32) * 2.0 - 1.0, ball_size);
        }
        if ball.position.x >= screen_width() - ball.size.x {
            left_score += 1;
            left_paddle = Paddle::new(vec2(10.0, (screen_height() - paddle_size.y) / 2.0), paddle_size);
            right_paddle = Paddle::new(vec2(screen_width() - 10.0 - paddle_size.x, (screen_height() - paddle_size.y) / 2.0), paddle_size);
            ball = Ball::new((vec2(screen_width(), screen_height()) - ball_size) / 2.0, vec2(gen_range(0, 2) as f32, gen_range(0, 2) as f32) * 2.0 - 1.0, ball_size);
        }

        next_frame().await;
    }
}
```

## Ending off

Congratulations! You've just made Pong from scratch without a game engine in Rust! That wasn't so hard now was it? If you want to delve deeper into making games from scratch you should make another simple game. My recommendations would be [Flappy Bird](https://en.wikipedia.org/wiki/Flappy_Bird), [Breakout](https://en.wikipedia.org/wiki/Breakout_(video_game)), [Space Invaders](https://en.wikipedia.org/wiki/Space_Invaders), and other Atari games since most of those are simple.   
Anyways hope you had fun reading this post and I apologize if I made any mistake. Goodbye!

