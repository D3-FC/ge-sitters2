import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email: string = ''

  @Column()
  phone: string = ''

  @Column()
  password: string = ''

  @Column()
  city: string = ''

  @Column()
  first_name: string = ''

  @Column()
  last_name: string = ''

  @Column()
  notify_sms: boolean = false

  @Column()
  notify_email: boolean = false

  @Column()
  notify_cabinet: boolean = false

  @Column()
  remember_token: string = ''

  @CreateDateColumn({ type: "timestamp" })
  created_at!: string

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: string
}
