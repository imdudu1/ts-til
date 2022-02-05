import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from './dto';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('영화를 생성한다.', () => {
    const dto: CreateMovieDto = new CreateMovieDto();
    expect(controller.create(dto)).toBe(0);
  });

  it.todo('영화를 수정한다.');
  it.todo('영화를 삭제한다.');
  it.todo('영화를 조회한다.');
});
