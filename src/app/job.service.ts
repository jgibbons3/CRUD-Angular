import { Injectable } from '@angular/core';
import { Job } from './jobs/jobs';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>("http://localhost:8000/jobs/")
  }

  deleteJob(job_id: number): Observable<Job> {
    return this.http.delete<Job>(`http://localhost:8000/jobs/${job_id}`)
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>("http://localhost:8000/jobs/", job)
  }

  editJob(job: Job): Observable<Job> {
    return this.http.patch<Job>(`http://localhost:8000/jobs/${job.job_id}/`, job)
  }

  constructor(private http: HttpClient) { }
}
