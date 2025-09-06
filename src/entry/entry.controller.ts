import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntryService } from './entry.service';


@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  
}
