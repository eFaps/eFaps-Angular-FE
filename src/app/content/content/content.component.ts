import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit{
  oid: string | undefined;

  constructor( private route: ActivatedRoute, private contentService: ContentService) {
    
  }
  ngOnInit(): void {
   this.route.params.subscribe((params) => {
    this.oid = params['oid'];
    this.contentService.getContent(this.oid!!).subscribe({
      next: (val) => {
        console.log(val)
      },
    });
  });
  }
}