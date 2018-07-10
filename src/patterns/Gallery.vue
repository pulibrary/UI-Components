<template>
  <draggable class="gallery" v-model="items" tag="div" @click.native="deselect($event)">
    <card v-for="(item, index) in items"
      :id="item.id"
      :key="item.id"
      class="galleryCard"
      size="medium"
      :selected="isSelected(item)"
      :disabled="item.disabled"
      :edited="hasChanged(item.id)"
      @card-click="select($event)">
      <media-image :src="item.mediaUrl" height="medium"></media-image>
      <heading level="h2">{{ item.title }}</heading>
      <text-style variation="default">{{ item.caption }}</text-style>
    </card>
  </draggable>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import draggable from "vuedraggable"
/*
 * Gallery is a grid of images with captions.
 */
export default {
  name: "Gallery",
  status: "review",
  release: "1.0.0",
  type: "Pattern",
  components: {
    draggable,
  },
  computed: {
    items: {
      get() {
        return this.gallery.items
      },
      set(value) {
        this.$store.commit("SORT_ITEMS", value)
      },
    },
    ...mapState({
      gallery: state => state.gallery,
    }),
  },
  props: {
    /**
     * Gallery items to be displayed in the gallery.
     */
    galleryItems: {
      required: true,
      type: Array,
    },
  },
  methods: {
    deselect: function(event) {
      if (event.target.className === "gallery") {
        console.log(event.target.className)
        this.selectNone()
      }
    },
    selectNone: function() {
      this.$store.commit("SELECT", [])
    },
    getItemById: function(id) {
      var elementPos = this.getItemIndexById(id)
      return this.items[elementPos]
    },
    getItemIndexById: function(id) {
      return this.items
        .map(function(item) {
          return item.id
        })
        .indexOf(id)
    },
    hasChanged: function(id) {
      return this.gallery.changeList.indexOf(id) > -1
    },
    isSelected: function(item) {
      return this.gallery.selected.indexOf(item) > -1
    },
    select: function(event) {
      let selected = []
      if (event.metaKey) {
        selected = this.gallery.selected
        selected.push(this.getItemById(event.target.id))
        this.$store.commit("SELECT", selected)
      } else {
        if (this.gallery.selected.length === 1 && event.shiftKey) {
          var first = this.getItemIndexById(this.gallery.selected[0].id)
          var second = this.getItemIndexById(event.target.id)
          var min = Math.min(first, second)
          var max = Math.max(first, second)
          for (var i = min; i <= max; i++) {
            selected.push(this.items[i])
          }
          this.$store.commit("SELECT", selected)
        } else {
          this.$store.commit("SELECT", [this.getItemById(event.target.id)])
        }
      }
    },
  },
  mounted() {
    if (!this.galleryItems) {
      this.$store.commit("CHANGE_RESOURCE_LOAD_STATE", "LOADING")
    }
  },
}
</script>
<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: auto;
  height: calc(100% - 40px);
  border-radius: 4px;
  margin-bottom: 40px;
  clear: both;

  .card {
    margin: 1rem;
  }
}
</style>
<docs>
```js
    <gallery :galleryItems='[
      {"id":"8ffd7a03-ec0e-46c1-a347-e4b19cb7839f","title":"example.tif","caption":"FileSet : 8ffd7a03-ec0e-46c1-a347-e4b19cb7839f","mediaUrl":"https://picsum.photos/600/300/?random"},
      {"id":"8f0a0908-317f-414e-a78a-c38a4a3b28e3","title":"example.tif","caption":"FileSet : 8f0a0908-317f-414e-a78a-c38a4a3b28e3","mediaUrl":"https://picsum.photos/600/300/?random"},
      {"id":"ea01019e-f644-4416-b99c-1b44bf49d060","title":"example.tif","caption":"FileSet : ea01019e-f644-4416-b99c-1b44bf49d060","mediaUrl":"https://picsum.photos/600/300/?random"}
      ]'></gallery>
```
</docs>