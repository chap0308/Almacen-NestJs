import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'supplier'})
@ObjectType()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID ) 
  id: string;

  @Column()
  @Field( () => String )
  fullname: string;

  @Column()
  @Field( () => String )
  email: string;

  @Column()
  @Field( () => String )
  phone: string;
}
