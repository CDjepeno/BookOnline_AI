import {
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DisaprouveBookUseCase } from 'src/application/usecases/book/disaprouveBook/approuveBook.usecase';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyEnum } from 'src/infras/usecase-proxy/usecase-proxy-config';

@ApiTags('Book')
@Controller('disaprouve')
export class DisaprouveBookController {
  constructor(
    @Inject(UsecaseProxyEnum.DISAPROUVE_BOOK_USECASE_PROXY)
    private readonly disaprouveBookUsecaseProxy: UseCaseProxy<DisaprouveBookUseCase>,
  ) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Disaprouve Book',
  })
  async approuveBook(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ msg: string }> {
    return this.disaprouveBookUsecaseProxy.getInstance().execute(id);
  }
}
