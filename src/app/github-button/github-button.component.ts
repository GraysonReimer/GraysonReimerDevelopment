import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'github-button',
  templateUrl: './github-button.component.html',
  styleUrls: ['./github-button.component.css']
})
export class GithubButtonComponent implements OnInit {
  
  goToGitPage() {
    window.open("https://github.com/GraysonReimer", "_blank");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
