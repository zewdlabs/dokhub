import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MinioService } from './minio.service';

describe('MinioService', () => {
  let minioService: MinioService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinioService,
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockReturnValueOnce('test-endpoint')
              .mockReturnValueOnce('9000')
              .mockReturnValueOnce('false')
              .mockReturnValueOnce('test-access-key')
              .mockReturnValueOnce('test-secret-key')
              .mockReturnValueOnce('test-bucket-name'),
          },
        },
      ],
    }).compile();

    minioService = module.get<MinioService>(MinioService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(minioService).toBeDefined();
  });

  it('should create bucket if not exists', async () => {
    const bucketExistsMock = jest.fn().mockResolvedValueOnce(false);
    const makeBucketMock = jest.fn().mockResolvedValueOnce(undefined);
    jest
      .spyOn(minioService['minioClient'], 'bucketExists')
      .mockImplementationOnce(bucketExistsMock);
    jest
      .spyOn(minioService['minioClient'], 'makeBucket')
      .mockImplementationOnce(makeBucketMock);

    await minioService.createBucketIfNotExists();

    expect(bucketExistsMock).toHaveBeenCalledWith('test-bucket-name');
    expect(makeBucketMock).toHaveBeenCalledWith(
      'test-bucket-name',
      'eu-west-1',
    );
  });
});
