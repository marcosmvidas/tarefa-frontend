import { ref, computed } from 'vue';
import { authService } from '@/services/authService';

export const useUserRole = () => {
  const roleId = ref(authService.getRoleId());

  const userRole = computed(() => {
    return roleId.value === 1 ? 'Gestor' : 'Usuário';
  });

  return { userRole };
};
