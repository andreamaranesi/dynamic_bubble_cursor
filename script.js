/**
 * @version 1.0
 * @author Andrea Maranesi
 */
(function ($) {
    /**
     * defines the jQuery function name
     * @type {string}
     */
    const name = "drMouseShadow";
    /**
     * defines the borderColor of the bubble cursor
     * @type {string}
     */
    const color = "red";
    /**
     * defines the backgroundColor of the bubble cursor
     * @type {string}
     */
    const backgroundColor = "transparent";

    /**
     * defines the radius of the bubble cursor
     * @type {number}
     */
    const radius = 5;
    /**
     * defines the borderSize of the bubble
     * @type {number}
     */
    const size = 2;
    /**
     * defines the opacity of the bubble
     * @type {number}
     */
    const opacity = 1;
    /**
     * when an element is set as a target, defines how much it should stretch
     * @type {number}
     */
    const elasticFactor = 1.7;
    /**
     * the css selector of the element that should follow the mouse cursor when the user is hover it's parent
     * @type {string}
     */
    const targetElementSelector = "#targetId";

    /**
     * it will contains all the plugin settings
     */
    let settings;

    /**
     * the id of the html element that will be used to create the "Bubble pointer"
     * @type {string}
     */
    const id = "dr_mouse_circle";
    /**
     * if true, it will allows this plugin to stretch a specific element
     * @type {boolean}
     */
    const expand = true;

    let target;
    let offsetLeft, offsetTop;

    function px(double) {
        return double + "px";
    }

    function transform(x, y) {
        return "translateX(" + x + "px) translateY(" + y + "px)";
    }

    /**
     * given a map, iterates it until it finds a match
     * @param target
     * @param map
     * @returns undefined or the value of the index of the map
     */
    function checkElement(target, map) {
        if (Array.isArray(map)) {
            for (const element of map)
                if ($(element).is(target)) return true;

            return undefined;
        }
        for (const [key, value] of Object.entries(map))
            if ($(key).is(target)) return value;

        return map["default"] ?? undefined;
    }

    /**
     *
     *
     * @param x mouse position respect the window
     * @param y mouse position respect the window
     * @param element it's the bubble cursor div
     */
    function elasticBox(x, y, element) {
        if (target !== undefined) {
            let width = parseFloat(target.width());
            let height = parseFloat(target.height());
            let centerX = offsetLeft + width / 2;
            let centerY = offsetTop + height / 2;
            let diffX = x - centerX;
            let diffY = y - centerY;
            let elasticFactor = settings.elasticFactor;
            let endX = Math.abs(diffX * 2) / width;
            let endY = Math.abs(diffY * 2) / height;

            let top = diffY / elasticFactor;

            let left = diffX / elasticFactor;

            target.css({
                transform: transform(left, top)
            });

            let targetElementSelector = settings.targetElementSelector;

            target.find(targetElementSelector).css({
                pointerEvents: "none",
                marginLeft: px(-left),
                marginTop: px(-top)
            });

            let elementWidth = width / 1.5;
            let elementHeight = height / 1.5;

            let elementLeft =
                x -
                elementWidth / 2 -
                (diffX / Math.abs(diffX)) * ((endX * elementWidth) / 2.2);

            let elementTop =
                y -
                elementHeight / 2 -
                (diffY / Math.abs(diffY)) * ((endY * elementHeight) / 2.2);

            element.css({
                width: px(elementWidth),
                height: px(elementHeight),
                transform: transform(elementLeft, elementTop)
            });
        }
    }

    /**
     * defines what happens when the user is hover the interested area
     * @param body
     */
    function onMouseMove(body) {

        $(body).on("mousemove", function (e) {

            let x = e.pageX;
            let y = e.pageY;

            let color = checkElement($(e.target), settings.color);

            let backgroundColor = checkElement($(e.target), settings.backgroundColor);

            let opacity = checkElement($(e.target), settings.opacity);

            let size = checkElement($(e.target), settings.size);

            let radius = checkElement($(e.target), settings.radius);

            let onHover = checkElement($(e.target), settings.onHover);

            let element = $("#" + settings.id);

            if (onHover !== undefined) {
                element.find(onHover).css("opacity", 1);
            } else element.find(":visible").css("opacity", 0);

            let expand = settings.expand;

            let isTargetElement = checkElement($(e.target), settings.targets) === true;

            if (!isTargetElement) {
                if (target !== undefined) {
                    target.css({
                        transform: "none"
                    });
                    target.find(settings.targetElementSelector).css({
                        marginLeft: 0,
                        marginTop: 0
                    });
                    target = undefined;
                }
                expand = false;
            }

            element.css({
                borderWidth: size,
                borderColor: color,
                opacity: opacity,
                background: backgroundColor
            });

            elasticBox(x, y, element);

            if (!expand)
                element.css({
                    borderRadius: "100%",
                    width: px(radius),
                    height: px(radius),
                    transform: transform(x - radius / 2, y - radius / 2)
                });
            else if (target === undefined) {

                target = $(e.target);

                let width = parseFloat(target.width());
                let height = parseFloat(target.height());

                let offset = target.offset();
                offsetLeft = offset.left;
                offsetTop = offset.top;

                let topLeft = target.css("borderTopLeftRadius");
                let topRight = target.css("borderTopRightRadius");
                let bottomRight = target.css("borderBottomRightRadius");
                let bottomLeft = target.css("borderBottomLeftRadius");

                element.css({
                    borderBottomLeftRadius: bottomLeft,
                    borderBottomRightRadius: bottomRight,
                    borderTopLeftRadius: topLeft,
                    borderTopRightRadius: topRight,
                    width: px(width),
                    height: px(height)
                });
            }
        });
    }

    $.fn[name] = function (options) {

        settings = $.extend(
            {
                color: {
                    default: color
                },
                backgroundColor: {
                    default: backgroundColor
                },

                size: {
                    default: size
                },
                radius: {
                    default: radius
                },
                id: id,
                expand: expand,
                opacity: {
                    default: opacity
                },
                onHover: {
                    default: undefined
                },
                targets: ["#menu"],
                elasticFactor: elasticFactor,
                targetElementSelector: targetElementSelector
            },

            options
        );

        onMouseMove(this);

        return this;
    };
})(jQuery);
