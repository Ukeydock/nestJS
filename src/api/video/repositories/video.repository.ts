import { InjectRepository } from '@nestjs/typeorm';
import { Video } from '@root/database/entities/video.entity';
import { Repository } from 'typeorm';

import { VideoDetail } from '@root/database/entities/videoDetail.entity';
import { VideoListItemDto } from '../dto/responseVideo.dto';

export class VideoRepository {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    @InjectRepository(VideoDetail)
    private videoDetailRepository: Repository<VideoDetail>,
  ) {}

  async findOneByVideoId(videoId: string) {
    return await this.videoRepository.findOne({ where: { videoId } });
  }

  async findVideoDetailByPlatformAndDefaultLanguage(findVideoDetailDto: {
    platform: string;
    defaultLanguage: string;
  }) {
    return await this.videoDetailRepository.findOne({
      where: {
        platform: findVideoDetailDto.platform,
        defaultLanguage: findVideoDetailDto.defaultLanguage,
      },
    });
  }

  async findBykeyword(findByKeywordDto: { keyword: string }) {
    const query = this.videoRepository
      .createQueryBuilder(`V01`)
      .select([
        `V01.title AS videoTitle`,
        `V01.id AS videoDBId`,
        `V01.thumbnail AS videoThumbnail`,
        `V01.description AS videoDescription`,
        `V01.videoId AS videoId`,
      ])
      .innerJoin(`keywordVideo`, `VK01`, `VK01.videoId = V01.id`)
      .innerJoin(`keyword`, `K01`, `K01.id = VK01.keywordId`)
      .where(`K01.keyword = :keyword`, { keyword: findByKeywordDto.keyword });

    return await query.getRawMany();
  }

  async createVideoDetail(platform: string, defaultLanguage: string) {
    const videoDetaiEntity = this.videoDetailRepository.create({
      platform,
      defaultLanguage,
    });

    return await this.videoDetailRepository.save(videoDetaiEntity);
  }

  async create(videoListItemDto: VideoListItemDto, videoDetailId: number) {
    const videoEntity = this.videoRepository.create({
      title: videoListItemDto.videoTitle,
      description: videoListItemDto.videoDescription,
      thumbnail: videoListItemDto.videoThumbnail,
      createdDate: videoListItemDto.videoPublishedAt,
      videoId: videoListItemDto.videoId,
      videoDetail: { id: videoDetailId },
    });
    return await this.videoRepository.save(videoEntity);
  }
}
