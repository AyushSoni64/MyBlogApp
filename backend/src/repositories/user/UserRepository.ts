import { Model, Document, FilterQuery, QueryOptions } from "mongoose";
import { User, IUser } from "./UserModel";

class UserRepository {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  public async countUsers(query = {}): Promise<number> {
    try {
      return await User.countDocuments(query);
    } catch (error) {
      console.error("UserRepository countUsers =>", error);
      throw error;
    }
  }

  public async getAllUsers(
    query?: FilterQuery<IUser>,
    projection?: any,
    options?: QueryOptions
  ) {
    try {
      return await this.userModel.find(query, projection, options);
    } catch (error) {
      console.error("UserRepository getAllUsers =>", error);
      throw error;
    }
  }

  public async findOneUser(query: FilterQuery<IUser>, projection?: any) {
    try {
      return await this.userModel.findOne(query, projection);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository findOneUser =>", error);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      console.error("UserRepository getUserByEmail =>", error);
      throw error;
    }
  }

  public async getUserById(userId: string) {
    try {
      return await this.userModel.findById(userId);
    } catch (error) {
      console.error("UserRepository getUserById =>", error);
      throw error;
    }
  }

  public async registerUser(newUser: IUser) {
    try {
      return await this.userModel.create(newUser);
    } catch (error) {
      console.error("UserRepository registerUser =>", error);
      throw error;
    }
  }

  public async updateUser(userId: string, updatedUserData: Partial<IUser>) {
    try {
      return await this.userModel.findByIdAndUpdate(userId, updatedUserData, {
        new: true,
      });
    } catch (error) {
      console.error("UserRepository updateUser =>", error);
      throw error;
    }
  }

  public async deleteUser(userId: string) {
    try {
      return await this.userModel.findByIdAndDelete(userId);
    } catch (error) {
      console.error("UserRepository deleteUser =>", error);
      throw error;
    }
  }

  public async authenticateUser(
    email: string,
    password: string
  ): Promise<IUser | null> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user || user.password !== password) {
        return null;
      }
      return user;
    } catch (error) {
      console.error("UserRepository authenticateUser =>", error);
      throw error;
    }
  }
}

export const userRepository = new UserRepository(User);
