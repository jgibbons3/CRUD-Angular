import { Component, OnInit } from '@angular/core';
import { Job } from './jobs';
import { JobService } from '../job.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];

  constructor(private jobService: JobService) { }

  getJobs(): void {
    this.jobService.getJobs().subscribe(job => this.jobs = job) 
  }

  async deleteJob(job_id) {
    await this.jobService.deleteJob(job_id).toPromise()
    this.jobs = this.jobs.filter(job => job.job_id !== job_id)
  }

  ngOnInit() {
    this.getJobs();
  }

}
