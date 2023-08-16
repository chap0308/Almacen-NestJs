import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, { name:'createCategory' })
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
    ) : Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  // @Query(() => Category, { name: 'category' })
  // async findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Category> {
  //   return this.categoryService.findOne(id);
  // }

  // @Mutation(() => Category)
  // updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
  //   return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  // }

  // @Mutation(() => Category)
  // removeCategory(@Args('id', { type: () => Int }) id: number) {
  //   return this.categoryService.remove(id);
  // }
}
