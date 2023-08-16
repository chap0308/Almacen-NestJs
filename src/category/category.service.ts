import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository( Category )
    private readonly categoryRepository: Repository<Category>,

  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoryRepository.create({ ...createCategoryInput })
    return await this.categoryRepository.save( newCategory );
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryInput: UpdateCategoryInput) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
