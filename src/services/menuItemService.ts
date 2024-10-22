/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeIcon, InboxStackIcon } from '@heroicons/vue/16/solid';

const iconMap: { [key: string]: any } = {
  Home: HomeIcon,
  Tarefa: InboxStackIcon,
};

const createMenuItem = (name: string, path: string) => ({
  name,
  path,
  icon: iconMap[name], // Usa o mapeamento de ícones
});

export const MenuItemService = [
  createMenuItem('Home', 'home'),
  createMenuItem('Tarefa', '/tarefa'),
];
