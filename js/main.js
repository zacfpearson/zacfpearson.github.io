window.onload = function() {
    (function headerCanvas() {
        var black = '#212121',
            red = '#B71C1C',
            darkgray = '#9E9E9E',
            lightgray = '#F5F5F5',
            canvas = document.querySelector('#headerCanvas'),
            ctx = canvas.getContext('2d');

        //style
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineWidth = 0.1;

        //config
        var totalDots = 450,
            dotDistance = 60,
            mouseRadius = 100,
            minDotRadius = 0.1,
            maxDotRadius = 0.3,
            arrayDots = [],
            dotSpeed = 1000/20;

        var mousePosition = {
            x: 30 * canvas.width / 100,
            y: 30 * canvas.height / 100
        };

        function Dot() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = -0.5 + Math.random();
            this.vy = -0.5 + Math.random();
            this.radius = Math.random() * (maxDotRadius - minDotRadius) + minDotRadius;
        }

        Dot.prototype = {
            create: function() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            },

            animate: function() {
                for(i = 0; i < totalDots; i++) {

                    var dot = arrayDots[i];

                    if(dot.y < 0 || dot.y > canvas.height) {
                        dot.vx = dot.vx;
                        dot.vy = - dot.vy;
                    }
                    else if(dot.x < 0 || dot.x > canvas.width) {
                        dot.vx = - dot.vx;
                        dot.vy = dot.vy;
                    }
                    dot.x += dot.vx;
                    dot.y += dot.vy;
                }
            },

            line: function() {
                for(var i = 0; i < totalDots; i++) {
                    for(var j = 0; j < totalDots; j++) {
                        var i_dot = arrayDots[i];
                        var j_dot = arrayDots[j];

                        if((i_dot.x - j_dot.x) < dotDistance && (i_dot.y - j_dot.y) < dotDistance && (i_dot.x - j_dot.x) > - dotDistance && (i_dot.y - j_dot.y) > - dotDistance) {
                            if((i_dot.x - mousePosition.x) < mouseRadius && (i_dot.y - mousePosition.y) < mouseRadius && (i_dot.x - mousePosition.x) > - mouseRadius && (i_dot.y - mousePosition.y) > - mouseRadius){
                                //red in radius under mouse
                                ctx.beginPath();
                                ctx.strokeStyle = red;
                                ctx.arc(i_dot.x, i_dot.y, i_dot.radius, 0, Math.PI * 2, false);
                                ctx.moveTo(i_dot.x, i_dot.y);
                                ctx.lineTo(j_dot.x, j_dot.y);
                                ctx.stroke();
                                ctx.closePath();
                            }
                            else {
                                //gray with all dots within dot distance radius
                                ctx.beginPath();
                                ctx.strokeStyle = darkgray;
                                ctx.arc(i_dot.x, i_dot.y, i_dot.radius, 0, Math.PI * 2, false);
                                ctx.moveTo(i_dot.x, i_dot.y);
                                ctx.lineTo(j_dot.x, j_dot.y);
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                    }
                }
            }
        };

        window.onmousemove = function(parameter) {
            mousePosition.x = parameter.pageX;
            mousePosition.y = parameter.pageY;
        };

        mousePosition.x = window.innerWidth / 2;
        mousePosition.y = window.innerHeight / 2;

        setInterval(function createDots() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = lightgray;
            ctx.fill();
            for(i = 0; i < totalDots; i++){
                arrayDots.push(new Dot());
                var dot = arrayDots[i];

                dot.create();
            }
            dot.animate();
            dot.line();
        }, dotSpeed);
    })();
};
