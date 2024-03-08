import React, { useEffect, useRef } from 'react';

export default function Graph({ data, color}) {
    const canvasRef = useRef()
    const graphsRef = useRef()

    useEffect(()=>{
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio
        const circleArea = graphsRef.current
        canvas.style.width = circleArea.clientWidth + 'px'
        canvas.style.height = circleArea.clientHeight + 'px'
        canvas.width = circleArea.clientWidth * dpr
        canvas.height = circleArea.clientHeight * dpr

        ctx.scale(dpr, dpr)

        class Graph {
            constructor(percent, name, color, prevPercent){
                this.x = circleArea.clientWidth / 2;
                this.y = circleArea.clientHeight / 2;
                this.color = color
                this.percent = percent
                this.name = name || ''
                this.prevPercent = prevPercent
            }

            draw(){
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.arc(this.x, this.y, 140 , Math.PI/180 * (-90 + (360 * (0.01 * this.prevPercent))) , Math.PI / 180 * (-90 + (360 * (0.01 * this.percent)) + (360 * (0.01 * this.prevPercent))));
                ctx.fillStyle = this.color
                ctx.fill()
                ctx.closePath();
                
                if(this.percent > 20){
                    ctx.beginPath();
                    ctx.fillStyle = 'black'
                    ctx.font = "400 13px sans-serif";
                    if(this.percent < 100){
                        ctx.fillText(`${this.name} ${this.percent}%`,
                            (circleArea.clientWidth / 2 - 25 - (this.name.length * 4)) + (140 * Math.sin((Math.PI / 180) * ((360 * (this.percent * 0.01) / 2) + (360 * (this.prevPercent * 0.01))))),
                            (circleArea.clientHeight / 2 + 10) + (-circleArea.clientHeight / 3 * Math.cos((Math.PI / 180) * ((360 * (this.percent * 0.01) / 2) + (360 * (this.prevPercent * 0.01))))),
                            1000
                        );
                    }else{
                        ctx.fillText(`${this.name} ${this.percent}%`,
                            (circleArea.clientWidth / 2 - 25 - (this.name.length * 5)),
                            (circleArea.clientHeight / 2 + 10),
                            1000
                        );
                    }
                    // ctx.fillText("Hello world", 0, 10, 100000);
                    ctx.fill()
                    ctx.closePath();
                }
            }
        } 

        function drawing(){
            // console.log(data);
            let graphs = []
            let prevPercent;
            for(let a = 0; a < data.length; a++){
                prevPercent = a ? prevPercent + parseFloat(data[a - 1].percent) : 0;
                graphs.push(new Graph(data[a].percent, data[a].name, color[a], prevPercent))
            }
            
            ctx.clearRect(0, 0, circleArea.clientWidth, circleArea.clientHeight)
            graphs.forEach((graphList)=>{
                graphList.draw()
            })
        }

        drawing()
    },[data, color])

    return (
        <div className='graph' ref={graphsRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

