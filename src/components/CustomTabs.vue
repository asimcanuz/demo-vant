<template>
  <div class="custom-tabs-container">
    <!-- Fixed First Tab -->
    <div class="fixed-tab" @click="setActiveTab('discovery')">
      <slot name="fixed"></slot>
      <div
        v-if="activeTabIndex === 'discovery'"
        class="active-line"
        :style="lineStyle"
      ></div>
    </div>

    <!-- Scrollable Tabs -->
    <div class="scrollable-tabs">
      <slot name="scrollable"></slot>
      <div
        v-if="activeTabIndex !== 'discovery'"
        class="active-line"
        :style="lineStyle"
      ></div>
    </div>

    <!-- Fixed Section -->
    <div class="fixed-section">
      <slot name="fixed-section"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomTabs",
  props: {
    activeTabIndex: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      linePosition: 0,
      lineWidth: 0,
      scrollTimeout: null,
    };
  },
  computed: {
    lineStyle() {
      return {
        left: `${this.linePosition}px`,
        width: `${this.lineWidth}px`,
      };
    },
  },
  methods: {
    setActiveTab(index) {
      this.$emit("update:activeTabIndex", index);
    },
    debounce(fn, delay) {
      return (...args) => {
        if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => fn.apply(this, args), delay);
      };
    },
    handleScroll() {
      if (this.activeTabIndex !== "discovery") {
        this.updateLinePosition();
      }
    },
    updateLinePosition() {
      this.$nextTick(() => {
        const activeTab = this.$el.querySelector(
          this.activeTabIndex === "discovery"
            ? ".fixed-tab"
            : ".scrollable-tabs .active"
        );

        if (activeTab) {
          if (this.activeTabIndex === "discovery") {
            const { left, width } = activeTab.getBoundingClientRect();
            const containerLeft = this.$el.getBoundingClientRect().left;
            this.linePosition = left - containerLeft;
            this.lineWidth = width;
          } else {
            const { width } = activeTab.getBoundingClientRect();
            this.linePosition = activeTab.offsetLeft;
            this.lineWidth = width;
          }
        }
      });
    },
  },
  watch: {
    activeTabIndex() {
      this.updateLinePosition();
    },
  },
  mounted() {
    this.updateLinePosition();
    window.addEventListener(
      "resize",
      this.debounce(this.updateLinePosition, 150)
    );

    const scrollableContainer = this.$el.querySelector(".scrollable-tabs");
    if (scrollableContainer) {
      scrollableContainer.addEventListener(
        "scroll",
        this.debounce(this.handleScroll, 150)
      );
    }
  },
  beforeDestroy() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    window.removeEventListener("resize", this.updateLinePosition);
    const scrollableContainer = this.$el.querySelector(".scrollable-tabs");
    if (scrollableContainer) {
      scrollableContainer.removeEventListener("scroll", this.handleScroll);
    }
  },
};
</script>

<style>
.custom-tabs-container {
  display: flex;
  width: 100%;
  height: 46px;
  position: relative;
}

.fixed-tab {
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  background: #fff;
}

.fixed-tab::after {
  content: "";
  position: absolute;
  top: 0;
  right: -10px;
  bottom: 0;
  width: 10px;
  background: linear-gradient(to right, #ffffff, #ffffff00);
  pointer-events: none;
}

.scrollable-tabs {
  flex: 1;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
}

.scrollable-tabs::-webkit-scrollbar {
  display: none;
}

.fixed-section {
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  background: #fff;
}

.fixed-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: -10px;
  bottom: 0;
  width: 10px;
  background: linear-gradient(to left, #ffffff, #ffffff00);
  pointer-events: none;
}

.active-line {
  position: absolute;
  bottom: 0;
  height: 2px;
  border-radius: 1px;
  background: #1989fa;
  transition: all 0.3s ease;
  z-index: 3;
}
</style>
