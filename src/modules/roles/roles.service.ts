import { RolesRepository } from './roles.repository';

export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async getRoles() {
    return this.rolesRepository.findAllRoles();
  }

  async getPermissions() {
    return this.rolesRepository.findAllPermissions();
  }
}