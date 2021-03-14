import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class GetAllCandidatesDto {
    @IsString()
    @IsOptional()
    keywords?: string;
    
    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    language?: string;

    @IsString()
    @IsOptional()
    sort?: string;

    @IsString()
    @IsOptional()
    query?: string;
}