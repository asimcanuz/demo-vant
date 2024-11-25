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
      <transition :name="slideDirection">
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
      lastPage: "discovery", // Add this line to track the previous page
    };
  },
  computed: {
    currentTabComponent() {
      return this.activePage === "discovery"
        ? "DiscoveryPage"
        : this.activePage;
    },
    slideDirection() {
      const currentIndex = this.items.indexOf(this.activePage);
      const lastIndex = this.items.indexOf(this.lastPage);

      if (this.activePage === "discovery" || this.lastPage === "discovery") {
        return "slide-left";
      }

      return currentIndex > lastIndex ? "slide-left" : "slide-right";
    },
  },
  watch: {
    activePage(newVal, oldVal) {
      this.lastPage = oldVal;
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
  position: relative;
  overflow: hidden;
  perspective: none; /* Remove perspective */
  transform-style: flat; /* Change to flat */
}

/* Update transition styles */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s ease;
  position: absolute;
  width: calc(100% - 24px);
  top: 8px;
  left: 12px;
  backface-visibility: hidden;
  will-change: transform;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* Remove transition delays and z-index management */
.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  transition-delay: 0s;
  z-index: 1;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
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
