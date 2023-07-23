import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    country: string;
    typeUser: number;
    created_at: Date

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email =userEntity.email;
        this.phone = userEntity.phone;
        this.country = userEntity.country;
        this.typeUser = userEntity.typeUser;
        this.created_at = userEntity.createdAt;
    }
}