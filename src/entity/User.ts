import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@Entity("users")
@ObjectType("users")
export default class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  login: string;

  @Field()
  @Column()
  password: string;
}
