import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SquishyProject } from './squishy-project';

@Injectable()
export class ProjectsExamplesService {

    private static URL: string = './assets/examples.json'

    constructor(private readonly http: HttpClient) {

    }

    private async fetch(): Promise<SquishyProject[]> {
        const projects: SquishyProject[] = await this.http.get<SquishyProject[]>(ProjectsExamplesService.URL, {
            responseType: 'json'
        }).toPromise()
        return projects
    }

    async getExamples(): Promise<SquishyProject[]> {
        const projects: SquishyProject[] = await this.fetch()
        return projects
    }

}