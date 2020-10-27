import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import User from "./User";

@ObjectType()
@Entity("pictures")
export default class Picture extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  path: string;

  @ManyToOne(() => User, (user) => user.pictures)
  @JoinColumn({ name: "user_id" })
  user: User;
}
