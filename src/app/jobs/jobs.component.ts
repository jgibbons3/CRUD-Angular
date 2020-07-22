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
  display_window: boolean;
  edit_job: number;
  
  constructor(private jobService: JobService) {
    this.display_window = false;
    this.edit_job = null;
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe(job => this.jobs = job) 
  }

  addJob(new_company_name: string): void {
    if (new_company_name) {
      let newJob: Job = {
        compay_name: new_company_name,
      }
      this.jobService.addJob(newJob).subscribe(job => this.jobs = [job, ...this.jobs])
      this.display_window = false;
    }
  }

  createJob(): void {
    this.display_window = true;
  }

  cancelAddJob():void {
    this.display_window = false;
  }

  editJob(job_id: number) {
    this.edit_job = job_id
  }

  cancelEditJob(): void {
    this.edit_job = null
  }

  modifyJob(job_id: number): void {
    console.log("number", job_id)
    this.edit_job = null
  }

  async deleteJob(job_id) {
    await this.jobService.deleteJob(job_id).toPromise()
    this.jobs = this.jobs.filter(job => job.job_id !== job_id)
  }

  ngOnInit() {
    this.getJobs();
  }

}
