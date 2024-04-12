import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model<User> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    first_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    last_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    patronymic: string;

    @Column({ type: DataType.DATE, allowNull: true })
    birth_date: Date;

    @Column({ type: DataType.BOOLEAN, allowNull: true })
    is_active: boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    photo: string;

    @Column({ type: DataType.STRING, allowNull: true })
    gender: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: true })
    email: string;
}