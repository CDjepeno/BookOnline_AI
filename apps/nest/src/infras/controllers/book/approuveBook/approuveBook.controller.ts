import {
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApprouveBookUseCase } from 'src/application/usecases/book/approuveBook/approuveBook.usecase';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyEnum } from 'src/infras/usecase-proxy/usecase-proxy-config';

@ApiTags('Book')
@Controller('approuve')
export class ApprouveBookController {
  constructor(
    @Inject(UsecaseProxyEnum.APPROUVE_BOOK_USECASE_PROXY)
    private readonly approuveBookUsecaseProxy: UseCaseProxy<ApprouveBookUseCase>,
  ) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Approuve Book',
  })
  async approuveBook(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ msg: string }> {
    return this.approuveBookUsecaseProxy.getInstance().execute(id);
  }
}
