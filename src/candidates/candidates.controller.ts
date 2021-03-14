import { BadRequestException, Controller, Get, Logger, Query } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { GetAllCandidatesDto } from './dto/get-all-candidates.dto';

@Controller('candidates')
export class CandidatesController {
    private Logger  = new Logger('CandidatesController');

    constructor(private readonly candidatesService: CandidatesService) { }
  
    @Get()
    async getCandidates(@Query() query: GetAllCandidatesDto): Promise<any> {
      this.Logger.verbose(`query: ${JSON.stringify(query)}`);
      if (!(query.language || query.location || query.query)) throw new BadRequestException('Location, language or query should not be empty');

      return this.candidatesService.getCandidates(query);
    }
}
