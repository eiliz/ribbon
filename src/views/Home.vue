<template>
  <div>
    Home
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  created() {
    fetch(
      "https://partnerapi.funda.nl/feeds/Aanbod.svc/json/ac1b0b1572524640a0ecc54de453ea9f/?type=koop&zo=/amsterdam/tuin/video/"
    ).then(res => console.log(res));
  }
};
</script>
