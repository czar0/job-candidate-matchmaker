import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Octokit } from "@octokit/core";
import { GetAllCandidatesDto } from './dto/get-all-candidates.dto';

@Injectable()
export class CandidatesService {
    private logger = new Logger('CandidatesService');

    async getCandidates(query: GetAllCandidatesDto): Promise<any> {
        this.logger.verbose(`query: ${JSON.stringify(query)}`);

        var queryString: string = "";
        if (!query.query) {
            for (const [key, value] of Object.entries(query)) {
                if (key === 'keywords') queryString += value.split('+').join(' ') + ' ';
                else queryString += value.split('|').map((v: string) => `${key}:${v}`).join(' ') + ' ';
                this.logger.verbose(`${key}:${value}`);
            }
        } else {
            queryString = query.query;
        }
        this.logger.verbose(`queryString: ${queryString}`);

        const octokit = new Octokit();
        var res: any;
        try {
            res = await octokit.request('GET /search/users', {
                q: queryString,
            })
        } catch (err) {
            throw new BadRequestException(`Error querying Github API: ${err}`);
        }

        return res.data.items;
    }
}
