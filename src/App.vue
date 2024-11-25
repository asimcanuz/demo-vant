<template>
  <div id="app">
    <!-- Custom Tabs Container -->
    <custom-tabs :active-tab-index.sync="activePage">
      <!-- Fixed First Tab -->
      <template v-slot:fixed>
        <div
          class="tab-item"
          :class="{ active: activePage === 'discovery' }"
          @click="activePage = 'discovery'"
        >
          Discovery
        </div>
      </template>

      <!-- Scrollable Tabs -->
      <template v-slot:scrollable>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="tab-item"
          :class="{ active: activePage === item }"
          @click="activePage = item"
        >
          {{ item }}
        </div>
      </template>

      <!-- Fixed Section -->
      <template v-slot:fixed-section>
        <div class="feedback-btn">🎤</div>
      </template>
    </custom-tabs>

    <!-- Content Area with Slide Transition -->
    <div class="content-area">
      <transition name="slide" mode="out-in">
        <component :is="currentTabComponent" :key="activePage"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import CustomTabs from "./components/CustomTabs.vue";
import DiscoveryPage from "./components/DiscoveryPage.vue";
import PageFive from "./components/PageFive.vue";
import PageFour from "./components/PageFour.vue";
import PageOne from "./components/PageOne.vue";
import PageThree from "./components/PageThree.vue";
import PageTwo from "./components/PageTwo.vue";

export default {
  name: "App",
  components: {
    CustomTabs,
    DiscoveryPage,
    PageOne,
    PageTwo,
    PageThree,
    PageFour,
    PageFive,
  },
  data() {
    return {
      items: ["PageOne", "PageTwo", "PageThree", "PageFour", "PageFive"],
      activePage: "discovery",
    };
  },
  computed: {
    currentTabComponent() {
      return this.activePage === "discovery"
        ? "DiscoveryPage"
        : this.activePage;
    },
  },
};
</script>

<style>
@import "vant/lib/index.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

.tab-item {
  height: 44px;
  padding: 0 16px;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
}

.tab-item.active {
  color: #1989fa;
  font-weight: 500;
}

.content-area {
  padding: 8px 12px;
  background: #f5f5f5;
  height: calc(100vh - 44px);
}

.feedback-btn {
  height: 44px;
  padding: 0 16px;
  background: #1989fa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
