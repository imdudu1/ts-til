import { TestingModule, Test } from '@nestjs/testing';
import { MovieItemResponse } from '../dto/movie-item.dto';
import { MoviesRepository } from '../movies.repository';
import { MoviesService } from '../movies.service';
import { mockCreateMovieDto, mockMovie, mockUpdateMovieDto } from './movie';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: MoviesRepository;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MoviesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<MoviesRepository>(MoviesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('created()', () => {
    it('영화 생성', async () => {
      const mockReturn = mockMovie();
      jest.spyOn(repository, 'create').mockResolvedValue(mockReturn);

      const response = await service.create(mockCreateMovieDto());

      expect(response).toStrictEqual(MovieItemResponse.of(mockReturn));
    });
  });

  describe('findAll()', () => {
    it('모든 영화를 조회한다.', async () => {
      const mockReturn = [mockMovie()];
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockReturn);

      const response = await service.findAll();

      expect(response).toStrictEqual(mockReturn.map(MovieItemResponse.of));
    });
  });

  describe('update()', () => {
    it('영화 정보를 갱신한다.', async () => {
      const mockReturn = mockMovie();
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockReturn);
      jest.spyOn(repository, 'update').mockResolvedValue(mockReturn);

      const response = await service.update(1, mockUpdateMovieDto());

      expect(mockReturn.title).toBe('anytitle');
      expect(response).toStrictEqual(MovieItemResponse.of(mockReturn));
    });
  });

  describe('findOne()', () => {
    it('특정 영화를 조회한다.', async () => {
      const mockReturn = mockMovie();
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockReturn);

      const response = await service.findOne(1);

      expect(response).toStrictEqual(MovieItemResponse.of(mockReturn));
    });
  });

  describe('remove', () => {
    it('영화를 삭제한다.', async () => {
      const removeSpy = jest.spyOn(repository, 'remove');

      await service.remove(1);

      expect(removeSpy).toBeCalledWith(1);
    });
  });
});
