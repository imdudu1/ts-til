import { MoviesController } from '../movies.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { MovieItemResponse } from '../dto/movie-item.dto';
import { mockCreateMovieDto, mockMovie, mockUpdateMovieDto } from './movie';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('created()', () => {
    it('영화 생성', async () => {
      const mockReturn = MovieItemResponse.of(mockMovie());
      jest.spyOn(service, 'create').mockResolvedValue(mockReturn);

      const response = await controller.create(mockCreateMovieDto());

      expect(response).toStrictEqual(mockReturn);
    });
  });

  describe('findAll()', () => {
    it('모든 영화를 조회한다.', async () => {
      const mockReturn = [mockMovie()].map(MovieItemResponse.of);
      jest.spyOn(service, 'findAll').mockResolvedValue(mockReturn);

      const response = await service.findAll();

      expect(response).toStrictEqual(mockReturn);
    });
  });

  describe('update()', () => {
    it('영화 정보를 갱신한다.', async () => {
      const mockReturn = MovieItemResponse.of(mockMovie());
      jest.spyOn(service, 'update').mockResolvedValue(mockReturn);

      const response = await controller.update('1', mockUpdateMovieDto());

      expect(response).toStrictEqual(mockReturn);
    });
  });

  describe('findOne()', () => {
    it('특정 영화를 조회한다.', async () => {
      const mockReturn = MovieItemResponse.of(mockMovie());
      jest.spyOn(service, 'findOne').mockResolvedValue(mockReturn);

      const response = await service.findOne(1);

      expect(response).toStrictEqual(mockReturn);
    });
  });

  describe('remove', () => {
    it('영화를 삭제한다.', async () => {
      const removeSpy = jest.spyOn(service, 'remove');

      await service.remove(1);

      expect(removeSpy).toBeCalledWith(1);
    });
  });
});
