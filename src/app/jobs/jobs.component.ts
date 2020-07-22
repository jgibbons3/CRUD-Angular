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
  edit_job: Job;
  oldValue: string;
  
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

  createJob() {
    this.display_window = true;
  }

  cancelAddJob() {
    this.display_window = false;
  }

  editJob(job: Job) {
    this.edit_job = job
    this.oldValue = job.compay_name
  }

  cancelEditJob() {
    this.edit_job.compay_name = this.oldValue
    this.edit_job = null
  }

  modifyJob(job: Job, compName: string): void {
    let newJob: Job = {
      job_id: job.job_id,
      compay_name: compName,
    }
    this.jobService.editJob(newJob).subscribe(job => console.log("hola desde edit", job))
    this.edit_job = null
  }

  async deleteJob(job: Job) {
    await this.jobService.deleteJob(job.job_id).toPromise()
    this.jobs = this.jobs.filter(job => job.job_id !== job.job_id)
  }

  ngOnInit() {
    this.getJobs();
  }

}
