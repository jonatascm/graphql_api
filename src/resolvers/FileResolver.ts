import {
  Query,
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
} from "type-graphql";
import Picture from "../entity/Picture";

@Resolver()
export class FileResolver {
  @Query(() => [Picture])
  info() {
    return Picture.find();
  }

  @Mutation(() => [Picture])
  imageUploader(file: Upload) {
    return Picture.find();
  }
}
