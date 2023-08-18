import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID ) 
  id: string;

  @Column({ unique: true })
  @Field( () => String )
  email: string;

  @Column()
  // @Field(() => String)//*No queremos mostrar esto cuando consulten nuestro ususarios. En apollo (Response)
  password: string;

  @Column()
  @Field( () => String )
  fullname: string;

  @Column()
  @Field( () => String )
  rol: string;

  @Column()
  @Field( () => String )
  phone: string;

  @Column({
    type: 'boolean',
    default: true
  })
  @Field( () => Boolean )
  isActive: boolean;

  @ManyToOne( () => User, (user) => user.lastUpdateBy,//? relacion con la misma tabla
  { nullable: true, lazy: true })
  @JoinColumn({ name: 'lastUpdateBy' })
  //*GraphQL
  @Field( () => User, { nullable: true })
  lastUpdateBy?: User;
}
