import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccountModel } from "@/modules/account/domain/models";

enum ROLES {
  user = "USER",
  company = "COMPANY",
}

enum STATUS {
  active = "ACTIVE",
  inactive = "INACTIVE",
}

@Entity("account")
export class PostgresAccoutnEntity implements AccountModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: ROLES, default: ROLES.user })
  role: string;

  @Column({ type: "enum", enum: STATUS, default: STATUS.inactive })
  status: string;

  @Column()
  access_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
