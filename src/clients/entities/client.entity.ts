import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'clients'})
@ObjectType()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID ) 
  id: string;

  @Column()
  @Field( () => String )
  fullname: string;

  @Column({ unique: true })
  @Field( () => String )
  email: string;

  @Column()
  @Field( () => String )
  phone: string;
}
