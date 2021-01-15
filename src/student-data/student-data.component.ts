import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AdminService } from 'src/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
 
@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit{

  userData:any 

  studentName:string;
  
  pastResults:any[] = []

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
 
  public barChartData: ChartDataSets[] = [
    {data:[],label:''}
  ];

  


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver , private service:AdminService , private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
        
      this.studentName = params.msg
      });

    this.service.getResultByUser(this.studentName).subscribe((data)=>{
      console.log(data)
      this.userData = data
      this.getPastResults()
    })
  }

  getPastResults(){
    
    this.userData.forEach((data:any) => {
     
      data.userResponses.forEach((response:any) => {
        console.log("Responses")
        console.log(data)
        let marks = 0
        response.sections.forEach((section:any) => {
          section.questions.forEach((question:any) => {
            marks += question.marksAwarded 
        });
        });
        console.log(marks , response.totalMarks)

        this.barChartLabels.push(response.testName)
        this.pastResults.push((marks/response.totalMarks)*100)
      });
    });

    this.barChartData.push({
    data : this.pastResults , 
    label:'Past Result %',
    backgroundColor: "#9E120E",
    pointBackgroundColor: "#FF5800",
    pointHoverBackgroundColor: "#FFB414",
    borderColor: "rgba(0,0,0,0)",
    pointBorderColor: "#fff",
    pointHoverBorderColor: "rgba(151,187,205,1)"})
  }
}
