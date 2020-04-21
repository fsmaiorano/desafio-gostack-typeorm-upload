import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute(category_id: string): Promise<Category> {
    const categoryRepository = getRepository(Category);

    var selectedCategory = await categoryRepository.findOne({ where: { title: category_id } });

    if (!selectedCategory) {
      selectedCategory = categoryRepository.create({ title: category_id });
      await categoryRepository.save(selectedCategory);
    }

    return selectedCategory;
  }
}

export default CreateCategoryService;
