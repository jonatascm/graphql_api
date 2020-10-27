import {
  Query,
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import Context from "../interfaces/Context";
import Picture from "../entity/Picture";
import User from "../entity/User";
import isAuth from "../middleware/isAuth";
import fileUpload from "../middleware/fileUpload";

@InputType()
class PictureInput {
  @Field()
  path: string;
}

@Resolver()
export class PictureResolver {
  @Query(() => String)
  pictures() {
    console.log('Getting all pictures');
    return Picture.find();
  }

  @Mutation(() => Picture)
  @UseMiddleware(isAuth)
  @UseMiddleware(fileUpload)
  async createPicture(
    @Ctx() { payload }: Context,
    @Arg("data", () => PictureInput) data: PictureInput
  ) {
    const user = await User.findOneOrFail(payload?.userId);
    const picture = await Picture.create({ ...data, user }).save();
    return picture;
  }

  @Mutation(() => Picture)
  async updatePicture(
    @Arg("id", () => Int) id: number,
    @Arg("data", () => PictureInput) data: PictureInput
  ) {
    return await Picture.update({ id }, data);
  }

  @Mutation(() => Boolean)
  async deletePicture(@Arg("id", () => Int) id: number) {
    await Picture.delete({ id });
    return true;
  }
}
