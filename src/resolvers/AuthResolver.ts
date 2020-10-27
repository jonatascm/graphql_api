import {
  Resolver,
  InputType,
  Field,
  Arg,
  Mutation,
  ObjectType,
} from "type-graphql";
import userService from "../services/userService";
import User from "../entity/User";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

@InputType()
class UserInput {
  @Field({ nullable: true })
  name: string;

  @Field()
  login: string;

  @Field()
  password: string;
}

@ObjectType()
class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;
}

@Resolver()
export class AuthResolver {

  @Mutation(() => LoginResponse)
  async login(@Arg("data", () => UserInput) data: UserInput) {
    const user = await userService.getUserByLogin(data.login);

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) return null;

    const accessToken = await sign(
      { userId: user.id },
      process.env.SECRET || "apisecret",
      {
        expiresIn: "7d",
      }
    );
    return { user, accessToken };
  }

  @Mutation(() => Boolean)
  async register(@Arg("data", () => UserInput) data: UserInput) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = User.create(data);
    await user.save();
    return true;
  }
}
