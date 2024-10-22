<template>
  <aside :class="`${sideBar ? 'sideBar' : ''}`">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo" />
    </div>

    <div class="menu-header">
      <h3>Menu</h3>
      <div class="menu-toggle-wrap">
        <button class="menu-toggle -mt-9" @click="toggleSideBar">
          <ChevronDoubleRightIcon v-if="!sideBar" class="h-6" />
          <ChevronDoubleLeftIcon v-else class="h-6" />
        </button>
      </div>
    </div>

    <div class="menu">
      <router-link
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="button"
      >
        <span class="material-icons">
          <component :is="item.icon" class="size-6" />
        </span>
        <span class="text">{{ item.name }}</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-icons">
          <WrenchScrewdriverIcon class="size-6" />
        </span>
        <span class="text">Configurações</span>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MenuItemService } from './../services/menuItemService';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/vue/16/solid';

export default defineComponent({
  name: 'SideBarComponent',

  data() {
    return {
      sideBar: true,
      menuItems: MenuItemService,
    };
  },

  methods: {
    toggleSideBar() {
      this.sideBar = !this.sideBar;
    },
  },

  components: {
    WrenchScrewdriverIcon,
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
  },
});
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icons {
        size: 6px;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-in-out;
  }

  h3 {
    color: var(--gray);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      background-color: var(--dark);
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--light);
        border-right: 5px solid var(--light);

        .material-icons,
        .text {
          color: var(--dark-alt);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.sideBar {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>

