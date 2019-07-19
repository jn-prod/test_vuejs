<template>
  <div class="row text-center mt-3 mx-3">
    <div
      class="col-sm-4 p-0"
      v-for="tab in tabs"
      v-bind:key="tab"
    >
      <a
        href="#"
        v-bind:class="['tab btn m-0 rounded-0 border-dark ', {'d-block btn-outline-primary border-bottom-0 active': currentTab === tab, 'd-sm-block btn-outline-dark bg-light': currentTab !== tab, 'd-none': displayAllTabs, 'd-block': !displayAllTabs }]"
        v-on:click="handleTabs(tab, $event)"
      >
        {{ tab }}
        <i
          v-bind:class="[{ 'd-inline d-sm-none fa fa-arrow-down ml-3': currentTab === tab, 'd-none d-sm-block btn-outline-dark bg-light border-dark': currentTab !== tab }]"
          aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<script>
import randomIndex from '../lib/randomIndex.js'

export default {
  name: 'TabsHeader',
  props: ['window', 'elephants'],
  data () {
    return {
      tabs: [], // generated while monted with 'defaultTabsQty'
      defaultTabsQty: 3, // use in tabs initialization
      tabsDropDow: false, // use for mobile dropdown format
      currentTab: null // use for set active tab style
    }
  },
  mounted () {
    // generate tabs
    for (var i = 0; i < this.defaultTabsQty; i++) {
      // create tabs config
      this.tabs.push('TAB ' + (i + 1))
    }

    // set default current tab
    this.currentTab = this.tabs[0]
  },
  methods: {
    // listen the tabs clicks event to refersh datas general config
    handleTabs: function (tab, event) {
      if (this.currentTab !== null) {
        if (this.currentTab === tab) {
          event.preventDefault()
          if (this.window.width < 576 && !this.tabsDropDow) {
            this.tabsDropDow = true
          } else {
            this.tabsDropDow = false
          }
        } else {
          this.currentTab = tab
          this.tabsDropDow = false
          this.$parent.randomElephantId = randomIndex(this.elephants.length)
        }
      }
    }
  },
  computed: {
    // get the display option for tabs
    displayAllTabs: function () {
      if (this.window.width > 576 || this.tabsDropDow) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
