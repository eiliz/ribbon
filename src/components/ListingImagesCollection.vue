<script>
// This component is designed to be a data provider to multiple users. It takes
// the media object that's coming from the API and formats the data into a
// reusable collection of items.

// Being a renderless component, it doesn't provide any markup and should be
// used in conjunction with other components that should be the markup
// providers.

// The idea for this pattern arised because I needed the same data source to use in 3 places: for the preview collection that's shown when the page loads, for the overview section that lists all images and for the slider.

export default {
  props: {
    media: {
      required: true
    },
    video: {
      required: false
    },
    title: {
      default: ""
    }
  },
  computed: {
    images() {
      const title = this.title;

      return this.media.map((entry, i) => {
        return {
          index: entry.IndexNumber,
          sm: {
            url: entry.MediaItems[0].Url.replace("http:", "https:"),
            width: entry.MediaItems[0].Width,
            height: entry.MediaItems[0].Height
          },
          md: {
            url: entry.MediaItems[1].Url.replace("http:", "https:"),
            width: entry.MediaItems[1].Width,
            height: entry.MediaItems[1].Height
          },
          lg: {
            url: entry.MediaItems[2].Url.replace("http:", "https:"),
            width: entry.MediaItems[2].Width,
            height: entry.MediaItems[2].Height
          },
          xl: {
            url: entry.MediaItems[3].Url.replace("http:", "https:"),
            width: entry.MediaItems[3].Width,
            height: entry.MediaItems[3].Height
          },
          alt: title ? `Photo ${i + 1} - ${title}` : `Photo ${i}`
        };
      });
    }
  },
  render() {
    return this.$scopedSlots.default({
      collection: this.images,
      video: this.video
    });
  }
};
</script>
