import { Controller, Get } from '@nestjs/common';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('/_findTotalWoman')
  async findTotalWoman(): Promise<any> {
    const persons = await this.personsService.findTotalWoman();
    return persons;
  }

  @Get('/_findPersonAboveAge20')
  async findPersonAboveAge20(): Promise<any> {
    const persons = await this.personsService.findPersonAboveAge20();
    return persons;
  }

  @Get('/_findManAboveAge20')
  async findManAboveAge20(): Promise<any> {
    const persons = await this.personsService.findManAboveAge20();
    return persons;
  }

  @Get('/_findPersonAboveAge20AndBalance')
  async findPersonAboveAge20AndBalance(): Promise<any> {
    const persons = await this.personsService.findPersonAboveAge20AndBalance();
    return persons;
  }

  @Get('/_calculateAverageAge')
  async calculateAverageAge(): Promise<any> {
    const persons = await this.personsService.calculateAverageAge();
    return persons;
  }

  @Get('/_findPersonAroundParis')
  async findPersonAroundParis(): Promise<any> {
    const persons = await this.personsService.findPersonAroundParis();
    return persons;
  }

  @Get('/_calculateTotalPersonPerGenre')
  async calculateTotalPersonPerGenre(): Promise<any> {
    const persons = await this.personsService.calculateTotalPersonPerGenre();
    return persons;
  }

  @Get('/_calculateTotalPersonPerGenreAndEyeColor')
  async calculateTotalPersonPerGenreAndEyeColor(): Promise<any> {
    const persons = await this.personsService.calculateTotalPersonPerGenreAndEyeColor();
    return persons;
  }

  @Get('/_calculateTotalPersonPerGenreAndRegisteredYear')
  async calculateTotalPersonPerGenreAndYear(): Promise<any> {
    const persons = await this.personsService.calculateTotalPersonPerGenreAndYear();
    return persons;
  }
}
