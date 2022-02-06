import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie, Tag } from '../entities';
import { MoviesRepository } from '../movies.repository';
import { mockCreateMovieDto, mockMovie } from './movie';

describe('MoviesRepository', () => {
  let repository: MoviesRepository;
  let movieOrmMock: Repository<Movie>;
  let tagOrmMock: Repository<Tag>;

  beforeEach(async () => {
    const mockMovieOrmRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const mockTagOrmRepository = {
      save: jest.fn(),
      create: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        MoviesRepository,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieOrmRepository,
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagOrmRepository,
        },
      ],
    }).compile();

    repository = moduleRef.get<MoviesRepository>(MoviesRepository);
    movieOrmMock = moduleRef.get(getRepositoryToken(Movie));
    tagOrmMock = moduleRef.get(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(movieOrmMock).toBeDefined();
    expect(tagOrmMock).toBeDefined();
  });

  describe('create()', () => {
    it('새 영화를 저장한다.', async () => {
      jest.spyOn(movieOrmMock, 'save').mockResolvedValue(mockMovie());

      const response = await repository.create(mockCreateMovieDto());

      expect(response.title).toBe('anytitle');
    });
  });

  describe('findAll()', () => {
    it('모든 영화 정보를 조회한다.', async () => {
      const mockReturn = [mockMovie()];

      jest.spyOn(movieOrmMock, 'find').mockResolvedValue(mockReturn);

      const response = await repository.findAll();

      expect(response).toEqual(mockReturn);
    });
  });

  describe('findOne()', () => {
    it('영화를 조회한다.', async () => {
      const mockReturn = mockMovie();

      jest.spyOn(movieOrmMock, 'findOne').mockResolvedValue(mockReturn);

      await expect(repository.findOne(1)).resolves.toEqual(mockReturn);
    });
  });

  describe('update()', () => {
    it('영화를 갱신한다.', async () => {
      const saveSpy = jest.spyOn(movieOrmMock, 'save');

      await repository.update(mockMovie());

      expect(saveSpy).toBeCalled();
    });
  });

  describe('remove()', () => {
    it('영화를 삭제한다.', async () => {
      const deleteSpy = jest.spyOn(movieOrmMock, 'delete');

      const id = 1;

      await repository.remove(id);

      expect(deleteSpy).toBeCalledWith(id);
    });
  });
});
