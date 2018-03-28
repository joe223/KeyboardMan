# KeyboardMan

## ⌨️ Register Keyboard shortcuts.


The better way to bind shortcuts.

```javascript
    KeyboardMan.on('up+up+down+down+left+left+right+right+b+a+b+a', function () {
        // get
    })

    KeyboardMan.on('ctrl&(s|d)', function () {
        // [ctrl + s]  or [ctrl + d] to save
    })

    KeyboardMan.on('ctrl&x&c|(ctrl&x+ctrl&c)', function () {
        // Emacs exit
    })

    KeyboardMan.on('shift&;+q', function () {
        // Vim exit
    })

    KeyboardMan.on('cmd&w|ctrl&w', function () {
        // Close Chrome Page
    })
```

## Why KeyboardMan ?

我们希望给你提供最简洁明了的 API，同时也支持用最简短的描述申明复杂的按键监听。


## How to Contribute

非常荣幸你能看见这里。任何 PR 或 issue 都会被认真考虑。