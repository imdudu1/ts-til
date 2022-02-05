import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('영화를 생성한다.', () => {
    const dto: CreateMovieDto = new CreateMovieDto();
    dto.title = 'sample movie test';
    expect(service.create(dto)).toBe(0);
  });
});
