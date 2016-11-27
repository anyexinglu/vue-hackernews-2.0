<template>
  <select>
    <slot></slot>
  </select>
</template>

<script>
import $ from 'jquery'
import u from 'underscore'
import 'select2';   // install the select2 jquery plugin

export default {
  name: 'selectEx',
  props: ['options', 'value', 'minimumResultsForSearch', 'defaultOption', 'placeholder'],
  computed: {
    emptyOption() {
      let emptyOption = this.defaultOption;
      switch (typeof emptyOption) {
        case 'undefined':
          emptyOption = [];
          break;
        case 'string':
          emptyOption = [{
            id: '-1',
            text: this.defaultOption,
            disabled: true
          }];
          break;
        case 'object':
          if (!Array.isArray(emptyOption)) {
            emptyOption = [emptyOption]
          }
          break;
        default:
          break;
      }
      return emptyOption;
    },
    computedPlaceholder() {
      let placeholder = this.placeholder;
      if (!placeholder && this.emptyOption && this.emptyOption.length) {
        placeholder = this.emptyOption[0].text
      }
      return placeholder || {};
    }
  },
  mounted () {
    require('./selectEx.css');

    let vm = this;
    let args = {};
    let data = this.options;
    if (this.emptyOption.length) {
      data = u.union([], this.emptyOption, this.options);
      args = u.extend(args, {
        placeholder: this.computedPlaceholder
      });
    }
    $(this.$el)
      .val(this.value)
      // init select2
      .select2(u.extend(args, {
        data: data,
        minimumResultsForSearch: this.minimumResultsForSearch || 0
      }))
      // emit event on change.
      .on('change', function () {
        vm.$emit('input', this.value)
      })
  },
  watch: {
    value (value) {
      if (value !== this.value) {
        $(this.$el).select2('val', value)
      }
    },
    options (options) {
      // update options
      let originOptions = $(this.$el).data('select2').options.options;
      $(this.$el).empty().select2(u.extend(originOptions, {
        data: u.union([], this.emptyOption, options)
      }));
    }
  },
  destroyed () {
    $(this.$el).off().select2('destroy')
  }
}
</script>

<style lang="stylus">
</style>
