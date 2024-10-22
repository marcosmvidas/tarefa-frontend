/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeIcon, InboxStackIcon, RectangleGroupIcon } from '@heroicons/vue/16/solid';

const iconMap: { [key: string]: any } = {
  Home: HomeIcon,
  Tarefa: InboxStackIcon,
  Dashboard: RectangleGroupIcon,
};

const createMenuItem = (name: string, path: string) => ({
  name,
  path,
  icon: iconMap[name],
});

export const MenuItemService = [
  createMenuItem('Home', 'home'),
  createMenuItem('Dashboard', '/dashboard'),
  createMenuItem('Tarefa', '/tarefa'),
];
