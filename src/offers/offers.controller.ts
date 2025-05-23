import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { UpdateOfferDto } from './dto/update-offer-status.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @Roles('provider')
  create(@Body() dto: Omit<CreateOfferDto, 'providerId'>, @Request() req) {
    return this.offersService.create({
      ...dto,
      providerId: req.user.id,
    });
  }

  @Put(':id')
  @Roles('user')
  update(@Param('id') id: string, @Body() dto: UpdateOfferDto, @Request() req) {
    // Only task owner can accept/reject the offer – validated in service
    return this.offersService.update(+id, dto, req.user.id);
  }

  @Get('task/:taskId')
  @Roles('user')
  getByTask(@Param('taskId') taskId: string, @Request() req) {
    return this.offersService.findByTask(+taskId, req.user.id);
  }

  @Get('provider/me')
  @Roles('provider')
  getByProvider(@Request() req) {
    return this.offersService.findByProvider(req.user.id);
  }
}
