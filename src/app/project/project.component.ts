import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input("project") project: any; 
  
  goToGitHubProject() {
    open((this.project.html_url as string), "_blank");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
