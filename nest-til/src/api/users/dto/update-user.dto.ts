import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHttpReqDto } from './create-user-http.dto';

export class UpdateUserDto extends PartialType(CreateUserHttpReqDto) {}
