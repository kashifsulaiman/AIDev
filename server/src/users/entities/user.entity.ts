import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // @Expose()
  // getPhone() {
  //   return this.phone ? this.phone : undefined; // Only return phone if it's not null
  // }
}