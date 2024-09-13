import mongoose from "mongoose";
import CategoryModel, { Category } from "../../models/categories.model";
import { create, findAll, findOne, remove, update } from "../category.service";

jest.mock("../../models/categories.model");


const mockCategoryModel = CategoryModel as unknown as jest.Mocked<
  typeof CategoryModel
>; 

afterEach(() => {
    mockCategoryModel.find.mockClear();
    mockCategoryModel.create.mockClear();
    mockCategoryModel.findById.mockClear();
    mockCategoryModel.findOneAndUpdate.mockClear();
    mockCategoryModel.findOneAndDelete.mockClear();
  });

  describe("category-service.test.ts", () => {
    // tulis kode - kode pengujian di sini
        test('sample', () => {
            expect(true).toBeTruthy();
        })
    })

    test("create", async () => {
        const mockCategory: Category = {
          _id: new mongoose.Types.ObjectId(),
          name: "Category 1",
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        };
    
        const mockCreate = jest.fn().mockResolvedValue(mockCategory);
    
        mockCategoryModel.create.mockImplementation(mockCreate);
    
        const category = await create(mockCategory);
    
        expect(category?._id).toBe(mockCategory._id);
      });


      test("findAll", async () => {
        const mockCategories: Category[] = [
          {
            _id: new mongoose.Types.ObjectId(),
            name: "Category 1",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
          },
        ];
    
        // const mockFind = jest.fn().mockReturnValue({ 
        //   limit: jest.fn().mockReturnThis(),
        //   skip: jest.fn().mockReturnThis(),
        //   sort: jest.fn().mockReturnThis(),
        //   populate: jest.fn().mockResolvedValue(mockCategories),
        // });
    
        const mockFind = jest.fn().mockResolvedValue(mockCategories);

        mockCategoryModel.find.mockImplementation(mockFind);
    
        const allCategorys = await findAll();
        expect(allCategorys.length).toBe(1);
      });

      test("findOne", async () => {
        const mockCategory: Category = {
          _id: new mongoose.Types.ObjectId(),
          name: "Category 1",
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        };
    
        const mockFindById = jest.fn().mockResolvedValue(mockCategory);
    
        mockCategoryModel.findById.mockImplementation(mockFindById);
    
        const category = await findOne("category-id");
    
        expect(category?.name).toBe(mockCategory.name);
      });


      test("update", async () => {
        const mockId = new mongoose.Types.ObjectId();
        const mockCategory: Category = {
          name: "Category 1",
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        };
    
        const mockFindOneAndUpdate = jest.fn().mockResolvedValue(mockCategory);
    
        mockCategoryModel.findOneAndUpdate.mockImplementation(mockFindOneAndUpdate);
    
        const category = await update(mockId.toString(), mockCategory);
    
        expect(category?.name).toBe(mockCategory.name);
      });

      test("remove", async () => {
        const mockId = new mongoose.Types.ObjectId();
    
        const mockFindOneAndDelete = jest.fn().mockResolvedValue({});
    
        mockCategoryModel.findOneAndDelete.mockImplementation(mockFindOneAndDelete);
    
        const category = await remove(mockId.toString());
    
        expect(category).toEqual({});
      });