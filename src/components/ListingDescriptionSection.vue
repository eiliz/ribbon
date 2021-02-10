<script>
export default {
  props: {
    data: {
      required: true
    }
  },
  render(h) {
    const entries = this.data.Kenmerken.map(entry => [
      h(
        "dt",
        {
          class:
            "sm:col-span-1 text-gray-500 border-b border-gray-200 py-2 md:py-3"
        },
        entry.Naam
      ),
      h("dd", {
        class:
          "sm:col-span-1 lg:col-span-2 font-medium border-b border-gray-200 py-2 md:py-3",
        domProps: {
          innerHTML: entry.Waarde
        }
      })
    ]);
    return h(
      "dl",
      {
        class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 lg:mb-14"
      },
      entries
    );
  }
};
</script>
