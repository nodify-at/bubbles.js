function ProgressFactory() {
    return {
        build: build
    };

    function build(container, color, animation, progress) {
        animation = animation || 'linear';

        var bar = new ProgressBar.Circle(container, {
            color       : color,
            trailWidth  : 5,
            duration    : 500,
            easing      : animation,
            strokeWidth : 5,

            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
            }
        });
        bar.animate(progress, {
            from: {color: color },
            to  : {color: color }
        });
        return bar;
    }
}
