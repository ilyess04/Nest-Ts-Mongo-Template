import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export function openApiResponse(...response: ApiResponseOptions[]) {
  return applyDecorators(
    ...response.map((option: ApiResponseOptions) => ApiResponse(option)),
  );
}
