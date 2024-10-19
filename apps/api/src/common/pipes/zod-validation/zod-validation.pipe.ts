import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType, treeifyError } from 'zod/v4';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(treeifyError(result.error));
    }
    return result.data;
  }
}
