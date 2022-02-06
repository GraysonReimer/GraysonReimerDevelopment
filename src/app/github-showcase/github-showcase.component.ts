import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'app/services/git-hub.service';

@Component({
  selector: 'github-showcase',
  templateUrl: './github-showcase.component.html',
  styleUrls: ['./github-showcase.component.css']
})
export class GithubShowcaseComponent implements OnInit {
  public projects: any[] = [];
  public gitSuccess = true;

  constructor(private service: GitHubService) { }

  ngOnInit(): void {
    this.service.getProjects().subscribe(results => {
      this.projects = (results as any[]).reverse().slice(0, 4);
      console.log(results);
    }, error => {
      this.gitSuccess = false;
    });
  }

}
