import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'media-button',
  templateUrl: './media-button.component.html',
  styleUrls: ['./media-button.component.css']
})
export class MediaButtonComponent implements OnInit {
  @Input("colour") colour?: string;
  @Input("text") text?: string;
  @Input("img") img?: string;
  @Input("link") link?: string;

  goToGitPage() {
    window.open(this.link, "_blank");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
