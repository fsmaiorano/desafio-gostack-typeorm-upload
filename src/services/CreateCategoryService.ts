import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute(category: string): Promise<Category> {
    const categoryRepository = getRepository(Category);

    var selectedCategory = await categoryRepository.findOne({ where: { title: category } });

    if (!selectedCategory) {
      selectedCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(selectedCategory);
    }

    return selectedCategory;
  }
}

export default CreateCategoryService;
