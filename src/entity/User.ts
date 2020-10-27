import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import Picture from "./Picture";

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

  @OneToMany(() => Picture, (picture) => picture.user, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "user_id" })
  pictures: Picture[];
}
