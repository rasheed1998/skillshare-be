import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { OffersService } from './offers.service';
import { UpdateOfferDto } from './dto/update-offer-status.dto';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() dto: CreateOfferDto) {
    return this.offersService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOfferDto) {
    return this.offersService.update(+id, dto);
  }

  @Get('task/:taskId')
  getByTask(@Param('taskId') taskId: string) {
    return this.offersService.findByTask(+taskId);
  }

  @Get('provider/:providerId')
  getByProvider(@Param('providerId') providerId: string) {
    return this.offersService.findByProvider(+providerId);
  }
}
