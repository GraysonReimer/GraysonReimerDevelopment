import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'animated-background',
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.css']
})

export class AnimatedBackgroundComponent implements OnInit {

  initialPointCount = 60;
  pointRadius = 2;
  connectionLifeSpan = 100;
  maxConnections = 20;
  connChance = 20;
  connIntensity = 0.0004; //The multiplier of the hyperbolic equation to calculate connection opacity over time.
  pointMoveChance = 100;
  pointMoveIntensity = 2;

  points: Point[] = [];
  connections: Connection[] = [];
  public context!: CanvasRenderingContext2D | null;
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngAfterViewInit() : void {
    setTimeout(() => {
      this.resizeCanvas();
      this.context = this.canvas.nativeElement.getContext('2d');
      this.addRandomPoints();
      this.renderPoints();
      window.setInterval(() => {
        this.runAnimationCycle();
      }, 100);
    }, 200);
  }

  ngOnInit(): void {
  }

  resizeCanvas() {
    this.canvas.nativeElement.height = window.outerHeight;
    this.canvas.nativeElement.width = window.outerWidth;
  }

  getRandomInt(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  getRandomPoint() : Point {
    let x = this.getRandomInt(0, this.context?.canvas.width as number);
    let y = this.getRandomInt(0, this.context?.canvas.height as number);
    return { x: x, y: y };
  }

  addRandomPoints() {
    for (let i = 0; i < this.initialPointCount; i++)
    {
      this.points.push(this.getRandomPoint());
    }
  }

  runAnimationCycle() {
    for (let i = 0; i < this.connections.length; i++)
    {
      let conn = this.connections[i];
      conn.age++;
      if (conn.age == this.connectionLifeSpan)
        this.connections.splice(i, 1);
    }

    if (this.connections.length < this.maxConnections && this.getRandomInt(0, 100) <= this.connChance)
    {
      this.addRandomConnection()
    }

    this.movePointsAtRandom();

    this.context!.clearRect(0, 0, this.context!.canvas.width, this.context!.canvas.height);
    this.renderConnections();
    this.renderPoints();
  }

  movePointsAtRandom() 
  {
    for (let i = 0; i < this.points.length; i++)
    {
      if (this.getRandomInt(0, 100) > this.pointMoveChance)
        continue;

      this.points[i].x = this.capValue(0, this.context!.canvas.width, this.points[i].x+this.getRandomInt(-this.pointMoveIntensity, this.pointMoveIntensity));
      this.points[i].y = this.capValue(0, this.context!.canvas.height, this.points[i].y+this.getRandomInt(-this.pointMoveIntensity, this.pointMoveIntensity));
    }
  }

  capValue(min: number, max: number, val: number): number {
    if (val < min)
      val = min;

    if (val > max)
      val = max;

    return val;
  }

  addRandomConnection()
  {
    let p1Ind = Math.round(this.getRandomInt(0, this.points.length - 1));
    let p1 = this.points[p1Ind];

    let newArr = this.points.slice();
    newArr.splice(p1Ind, 1);
    let p2Ind = Math.round(this.getRandomInt(0, newArr.length - 1)); 
    let p2 = newArr[p2Ind]

    this.connections.push({ p1: p1, p2: p2, age: 0 });
  }

  renderPoints() {
    for (let i = 0; i < this.points.length; i++)
    {
      let point = this.points[i];

      this.context!.fillStyle = "#59ecff";
      this.context!.shadowColor = "#59ecff";
      this.context!.shadowBlur = 10;
      this.context!.shadowOffsetX = 0;
      this.context!.shadowOffsetY = 0;
      this.context!.beginPath();
      this.context!.arc(point.x, point.y, this.pointRadius, 0, Math.PI*2);
      this.context!.fill();
    }
  }

  renderConnections() {
    for (let i = 0; i < this.connections.length; i++)
    {
      let conn = this.connections[i];

      //s is a hyperbolic equation to calculate connection opacity over it's lifespan.
      let s = -this.connIntensity*(conn.age)*(conn.age - this.connectionLifeSpan);
      let lineColour = "rgba(89, 236, 255, " + s as string + ")";
      let glowColour = "#59ecff";
      let glowStrength = s * 30;

      this.context!.strokeStyle = lineColour;
      this.context!.shadowColor = glowColour;
      this.context!.shadowBlur = glowStrength;
      this.context!.beginPath();
      this.context!.moveTo(conn.p1.x, conn.p1.y);
      this.context!.lineTo(conn.p2.x, conn.p2.y);
      this.context!.stroke();
    }
  }
}

interface Point {
  x: number;
  y: number;
}

interface Connection {
  p1: Point;
  p2: Point;
  age: number;
}