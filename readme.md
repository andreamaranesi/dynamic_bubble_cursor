# DYNAMIC BUBBLE CURSOR - jQuery Plugin

This jQuery Plugin allows you to create a personalized cursor that can change size, color, shape, and **stretch** certain target elements of the dom.



## How to Use It

At <head> level:

```html
<link rel="stylesheet" href="style.css"></link>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="script.js"></script>
```

The **`element`** will be the area in which will be captured mouse events

At <script> level:

```js
$(function () {
    $(element).drMouseShadow();
});
```

At <body> level:

```html
<div id="dr_mouse_circle"></div>
```

 

You can add an **object** to personalize the user experience. The following represents the default settings:

```js
                color: {
                    default: "red"
                },
                backgroundColor: {
                    default: "transparent"
                },
                size: {
                    default: 2
                },
                radius: {
                    default: 5
                },
                id: "dr_mouse_circle",
                expand: true,
                opacity: {
                    default: 1
                },
                onHover: {
                    default: undefined
                },
                targets: ["menu"],
                elasticFactor: 1.7,
                targetElementId: "targetId"
```



| Property        | Description                                                  |
| --------------- | :----------------------------------------------------------- |
| color           | the borderColor of the cursor. You can use as key a **css selector** |
| backgroundColor | the backgroundColor of the cursor. You can use as key a **css selector** |
| size            | the borderSize of the bubble cursor. You can use as key a **css selector** |
| radius          | the radius of the bubble. You can use as key a **css selector** |
| opacity         | the opacity of the bubble on certain elements. You can use as key a **css selector** |
| id              | the id of the html element that will be used as bubble       |
| expand          | if false, it disallows the ability to **stretch** specific elements |
| targets         | the **id** of html elements that will be stretched           |
| elasticFactor   | how much should be stretched the elements inside **`targets`** property |
| targetElementId | inside the stretched element, the **id** of the object that should follow the mouse movement |
| onHover         | The value is the css **selector** of the element that will be used to replace the default bubble cursor. You can use as key a **css selector** |



The`onHover` property:

The value is the **css selector** of the element, placed inside the bubble, that will be used to replace the default bubble cursor. You can use as key a **css selector**.

Example:

At <body> level:

```html
<div id="dr_mouse_circle">
    <i class="fas fa-plus" id="onHover"></i>
</div>
```

At <script> level:

```js
$(function () {
    $(window).drMouseShadow({
        onHover: {
            ".class_name": "#onHover"
        }
    });
});
```



## Example

You can find the complete example in the **demo** folder of the project.



```js
$(function () {
    $(window).drMouseShadow({
        radius: {
            a: 60,
            default: 25
        },
        size: {
            default: 3,
            a: 4
        },
        onHover: {
            ".table .ceil": "#onHover"
        },
        color: {
            section: "red",
            "#menu": "rgb(0,0,0,0.2)",
            div: "black",
            default: "red"
        },
        backgroundColor: {
            section: "transparent",
            div: "transparent",
            default: "transparent"
        },
        opacity: {
            section: 1,
            a: 1,
            default: 1
        }
    });
});
```

