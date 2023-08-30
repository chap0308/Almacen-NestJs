import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ValidRoles } from '../enums/valid-roles.enum';

@Entity({name: 'users'})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field( () => ID ) 
  id: string;

  // @Column({ unique: true, length: 50 })
  @Column({ unique: true })
  @Field( () => String )
  email: string;

  // @Column({ select: false, type: 'char', length: 60 })
  @Column()
  // @Field(() => String)//*No queremos mostrar esto cuando consulten nuestro ususarios. En apollo (Response)
  password: string;

  // @Column({length: 50})
  @Column()
  @Field( () => String )
  fullname: string;

  // @Column({
  //   type: 'enum',
  //   enum: ValidRoles
  // })
  // @Field( () => ValidRoles )
  // rol: ValidRoles
  @Column()
  @Field( () => String )
  rol: string;

  // @Column({type: 'char', length: 9})
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
